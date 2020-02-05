import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './appointment-widget.es6-475057a24f3a3fba2a046d17ecfedb45.js';
import './forms.es6-b471db36b899d086b3b2d1651d0af73c.js';
import './in-viewport.es6-46373fca6273eaaff5ee5a19e4f7af58.js';

/**
 * @module Form
 */
Moff.modules.create('FormTheme1', function() {
    'use strict';

    const MODULE = this;

    const SEL = {
        multistep: '.js-multi-step-form-step',
        appointment: '.js-appointment-date',
        validationError: '.js-validation-error',
        successMsg: '.js-success-message',
        successForm: '.js-success-form',
        fieldState: '.js-field-state',
        fieldCity: '.js-field-city',
        fieldZip: '.js-field-zipcode',
        fieldAddress: '.js-field-streetaddress',
        vehicleSelector: '.js-vehicle-selector',
    };

    /**
     * @const {DataLayer} DATA_LAYER - Data Layer module
     */
    const DATA_LAYER = Moff.modules.get('DataLayer');

    /**
     * @property {Object} _activatedFields - Store of activated fields
     * @private
     */
    const _activatedFields = {};

    /**
     * @property {Object} _errorFields - Store of error fields
     * @private
     */
    const _errorFields = {};

    /**
     * @property {Boolean} _isFormFocusTriggered - flag to prevent multiple form focus trigger
     * @private
     */
    let _isFormFocusTriggered = false;

    let _modulePopup,
        _moduleInViewport,
        _$scope,
        _timeout,
        _form,
        _$form,
        _hasAppointmentField;

    this.init = function() {
        _$scope = $(MODULE.scope);
        _form = Moff.modules.get('Form');
        _$form = _$scope.find('form');
        _hasAppointmentField = !!_$scope.find(SEL.appointment).length;
        _modulePopup = Moff.detect.isInIframe ? _modulePopup = window.top.Moff.modules.get('Popup') : _modulePopup = Moff.modules.get('Popup');
        _moduleInViewport = Moff.modules.get('InViewport');

        Moff.event.on('popup.close', () => {
            clearTimeout(_timeout);
        });

        _handleEvents();
        _handleRTIEvents();
        _initAppointmentWidget();
        _handleVehicleInfo();
        _initAddressAutocomplete();
    };

    this.reInit = function() {
        _form.reInit(_$scope);
        _$form = _$scope.find('form');
        _initAppointmentWidget();
        _initAddressAutocomplete();
        _handleVehicleInfo();
    };

    function _handleVehicleInfo() {
        _$scope.find(SEL.vehicleSelector).on('input change', event => {
            const $vehicleInfo = $(event.currentTarget);
            const vehicleInfoName = $vehicleInfo.data('name');
            const postData = _$form.serializeArray().filter(field => field.name.indexOf(vehicleInfoName) !== -1);

            MODULE.ajaxRequest({
                action: 'vehicleInfoRender',
                pushState: false,
                postData,
                data: [{
                    name: 'name',
                    value: vehicleInfoName,
                }],
                preloader: {
                    show() {
                        Moff.ajaxSystem.showPreloader($vehicleInfo);
                    },
                    hide() {
                        Moff.ajaxSystem.hidePreloader($vehicleInfo);
                    },
                },
                success(html) {
                    $vehicleInfo.html($(html).find(SEL.vehicleSelector).children());
                },
            });
        });
    }

    function _handleRTIEvents() {
        const formData = _$form.data();
        const digitalGarage = Moff.modules.get('DigitalGarageTheme1');
        const isRTIForm = ['contact-us', 'eprice-unlock', 'special-offers'].indexOf(formData.formType) !== -1;
        const isRTISite = !!digitalGarage;
        const formScope = MODULE.scope;

        if (!isRTISite || !isRTIForm) {
            return;
        }

        Moff.ajaxSystem.showPreloader(formScope);

        digitalGarage.onLoaded(() => {
            Moff.ajaxSystem.hidePreloader(formScope);
        });
    }

    function _handleEvents() {
        _initAnalyticsHandlers();

        _$scope.on('submit', 'form', function(event) {
            const postData = $(this).serializeArray();
            const ajaxParams = {
                action: 'submit',
                event: _getFormEventWithNamespace('submit'),
                postData,
                pushState: false,
                success(data) {
                    if (data.html) {
                        _appendHtml(data.html);
                        _closeSuccessForm();
                        _initAnalyticsHandlers(true);
                    } else {
                        _showSuccessPage(data.url);
                    }

                    _triggerEvent('success');
                },
                error() {
                    _triggerEvent('dsa.formError');
                    _triggerEvent('error');
                },
            };

            if (Moff.detect.isInIframe) {
                ajaxParams.data = [{
                    name: MODULE.data.previousPageUrl,
                    value: window.top.location.href,
                }, ];
            }

            MODULE.ajaxRequest(ajaxParams);
            event.preventDefault();
        });

        if (Moff.detect.isInIframe) {
            _modulePopup.beforeClose(() => {
                _sendBeacon();
            });
        }

        Moff.event.on('form.error', $form => {
            const formId = $form.data('form-id');

            if (formId) {
                _triggerEvent('dsa.formError', $form);
            }
        });

        Moff.event.on('form.fieldError', $element => {
            const name = $element.attr('name');
            const $form = $element.closest('form');

            if (!_errorFields[name]) {
                _errorFields[name] = true;
                _triggerEvent('dsa.formFieldError', $form);
            }
        });

        if (+MODULE.config.partialLeadSubmission) {
            window.addEventListener('beforeunload', () => {
                _sendBeacon();
                _triggerMultiStepAnalytics();
            });
        }
    }

    /**
     * Analytics handlers
     * @private
     */
    function _initAnalyticsHandlers(afterAjax = false) {
        if (!afterAjax) {
            _moduleInViewport.once({
                $elements: _$form,
                inCallback() {
                    // SetTimeout because our Analytics initialize too late, and yes, we should change it
                    setTimeout(() => _triggerEvent('dsa.formShown'), 0);
                },
            });
        }

        _$scope.find(':submit').on('click', function() {
            const $submitButton = $(this);
            const eventData = {
                links: [],
                data: {
                    LinkObject: {
                        text: $submitButton.text().trim(),
                        action: 'Submit',
                        trigger: 'aa-link',
                        type: 'Button',
                    },
                },
            };

            _triggerEvent('dsa.submitClick', _$form, eventData);
        });

        MODULE.$find(':input:not(:submit)').on('focus', function() {
            const $field = $(this);
            const eventData = {
                links: [],
                data: {
                    LinkObject: {
                        text: $field.attr('placeholder') || $field.parent().text().trim(),
                        type: 'Input',
                    },
                },
            };

            if (!_isFormFocusTriggered) {
                _isFormFocusTriggered = true;
                _triggerEvent('dsa.formFocusOnce', _$form, eventData);
            } else {
                const name = $field.attr('name');

                if (!_activatedFields[name]) {
                    _activatedFields[name] = true;
                    _triggerEvent('dsa.formFocus', _$form, eventData);
                }
            }
        });
    }

    /**
     * Triggers analytics event
     *
     * @method _triggerMultiStepAnalytics
     * @private
     */
    function _triggerMultiStepAnalytics() {
        const formObject = Moff.modules.get('DataLayer').findData(`FormObject_${_$form.data().formId}`);

        if (!formObject.Steps) {
            return;
        }

        formObject.Steps.forEach(step => {
            step.fields.forEach(field => {
                _$form.find(`[name^="${field.name}"]`).each((i, fieldNode) => {
                    const $fieldNode = $(fieldNode);
                    const isRadioOrCheckbox = $fieldNode.is(':checkbox') || $fieldNode.is(':radio');
                    const fieldValue = $fieldNode.val();

                    if ((isRadioOrCheckbox && $fieldNode.is(':checked')) || (!isRadioOrCheckbox && fieldValue)) {
                        field.isFilled = true; // eslint-disable-line no-param-reassign
                    }
                });
            });
        });

        Moff.event.trigger('dsa.pageUnload', {
            data: {
                FormObject: formObject,
            },
        });
    }

    /**
     * Sends blob data
     *
     * @method _sendBeacon
     * @private
     */
    function _sendBeacon() {
        if (!navigator.sendBeacon) {
            return;
        }

        const $form = MODULE.$find('form');
        const blob = new Blob([$form.serialize()], {
            type: 'application/x-www-form-urlencoded',
        });
        const url = Moff.ajaxSystem.createURL({
            action: 'incompleteFormSubmit',
            moduleId: MODULE.id
        });

        navigator.sendBeacon(url, blob);
    }

    function _appendHtml(html) {
        const animateSpeed = 300;
        const hideSuccessMessageTimeout = 5000;

        let moduleTop,
            scrollTop;

        _$scope.html(html);
        MODULE.reInit();
        _$scope.find(`${SEL.validationError} :input:first`).focus();

        const successMessage = _$scope.find(SEL.successMsg);

        if (successMessage.length) {
            moduleTop = _$scope.offset().top;
            scrollTop = window.pageYOffset;

            if (scrollTop - moduleTop > 0) {
                $('html, body').animate({
                    scrollTop: moduleTop
                }, animateSpeed);
            }

            setTimeout(() => {
                successMessage.addClass('__hide');
                _$scope.find(SEL.successForm).addClass('__show');
            }, hideSuccessMessageTimeout);
        }
    }

    function _showSuccessPage(pageUrl) {
        const params = {
            src: pageUrl
        };

        if (/xs|sm/.test(Moff.getMode())) {
            params.isMobile = true;
        } else {
            params.callback = () => {
                _form.clearForm(_$scope);
                _closeSuccessForm();
            };
        }

        _modulePopup.openIframePopup(params);
    }

    function _closeSuccessForm() {
        if (!_$scope.find(SEL.validationError).length && $.magnificPopup) {
            _timeout = setTimeout(_modulePopup.closePopup, 3000);
        }
    }

    function _initAppointmentWidget() {
        if (!_hasAppointmentField) {
            return;
        }

        Moff.modules.initClass('AppointmentWidget', {
            config: {
                module: MODULE,
            },
        });
    }

    function _initAddressAutocomplete() {
        /* eslint-disable camelcase */
        const $fieldAddress = MODULE.$find(SEL.fieldAddress);
        const fields = {
            administrative_area_level_1: {
                element: MODULE.$find(SEL.fieldState),
                variant: 'long_name',
            },
            locality: {
                element: MODULE.$find(SEL.fieldCity),
                variant: 'long_name',
            },
            postal_code: {
                element: MODULE.$find(SEL.fieldZip),
                variant: 'short_name',
            },
        };

        if (!$fieldAddress.length) {
            return;
        }

        _moduleInViewport.once({
            $elements: $fieldAddress,
            inCallback() {
                Moff.loadAssets({
                    js: [window.lazyJavasciptDependencies.googleMapApi]
                }, () => {
                    /* eslint-enable camelcase */
                    const address = new google.maps.places.Autocomplete(MODULE.$find(SEL.fieldAddress)[0], {
                        types: ['geocode'],
                    });

                    MODULE.$find(SEL.fieldAddress).on('keydown', event => {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                        }
                    });

                    $.each(fields, key => {
                        if (!fields[key].element.length) {
                            delete(fields[key]);
                        }
                    });

                    address.addListener('place_changed', () => {
                        const place = address.getPlace();
                        /* eslint-disable camelcase */
                        const streetAddressComponents = {
                            street_number: {
                                variant: 'long_name',
                                additional: '',
                            },
                            route: {
                                variant: 'long_name',
                                additional: ' ',
                            },
                            locality: {
                                variant: 'long_name',
                                additional: ', ',
                            },
                            administrative_area_level_1: {
                                variant: 'short_name',
                                additional: ', ',
                            },
                        };

                        let streetAddress = '';

                        place.address_components.forEach(component => {
                            const field = fields[component.types[0]];
                            const streetAddressComponent = streetAddressComponents[component.types[0]];

                            if (field) {
                                field.element.val(component[field.variant]);
                            } else if (streetAddressComponent) {
                                streetAddress += (streetAddress ? streetAddressComponent.additional : '') + component[streetAddressComponent.variant];
                            }
                        });

                        MODULE.$find(SEL.fieldAddress).val(streetAddress);
                        /* eslint-enable camelcase */
                    });
                });
            },
        });
    }

    /**
     * Triggering Moff event with collected form data. If event doesn't have namespace we add it as formType ('form-type.eventname')
     * @param {String} event
     * @private
     */
    function _triggerEvent(event, $form = _$form, analyticsData = {
        links: [],
        data: {}
    }) {
        const isAnalyticsEvent = /^dsa\./.test(event);
        const locationSearchData = Moff.utils.getLocationSearchData();
        const formData = $form.data();
        const primaryVehicleId = DATA_LAYER.findData('PrimaryVehicleId');
        const primaryOfferId = DATA_LAYER.findData('PrimaryOfferId');
        const primaryOfferSource = DATA_LAYER.findData('PrimaryOfferSource');
        const filterObject = DATA_LAYER.findData('FilterObject');
        const modelObject = DATA_LAYER.findData('ModelObject');
        const eventWithNamespace = event.indexOf('.') === -1 ?
            _getFormEventWithNamespace(event) :
            event;
        const data = isAnalyticsEvent ?
            analyticsData :
            $.extend({}, locationSearchData, formData);

        if (isAnalyticsEvent) {
            data.links.push(`FormObject_${formData.formId}`);
            data.links.push('Source');

            if (primaryVehicleId) {
                data.links.push(`VehicleObject_${primaryVehicleId}`);
            }

            if (modelObject) {
                data.data.ModelObject = modelObject;
            }

            if (primaryOfferId && primaryOfferSource) {
                data.links.push(`${Moff.utils.ucfirst(primaryOfferSource)}OfferObject_${primaryOfferId}`);
            }

            if (filterObject) {
                data.links.push('FilterObject');
                data.data.FilterModelsObject = filterObject;
            }
        }

        if (Moff.detect.isInIframe && !isAnalyticsEvent) {
            window.parent.Moff.event.trigger(eventWithNamespace, data);
        }

        Moff.event.trigger(eventWithNamespace, data);
    }

    function _getFormEventWithNamespace(eventName) {
        const formData = _$form.data();

        return `${formData.formType}-form.${eventName}`;
    }
});
Moff.modules.initByConfig('FormTheme1');