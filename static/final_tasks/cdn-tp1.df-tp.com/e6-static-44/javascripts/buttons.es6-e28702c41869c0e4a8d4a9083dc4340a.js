Moff.modules.create('Buttons', function() {
    'use strict';

    const MODULE = this;
    const SEL = {
        saveButtons: '.js-buttons-save',
        shareButtons: '.js-buttons-share',
        hyundaiWindowStickerButtons: '.js-buttons-hyundaiwindowsticker',
        facebookShareButton: '.js-action-buttons-facebook-link',
        twitterShareButton: '.js-action-buttons-twitter-link',
        googleShareButton: '.js-action-buttons-google-link',
        printButtons: '.js-buttons-print',
        canadaButtons: '.js-buttons-canadabuildprice',
        fcaWindowStickerButtons: '.js-buttons-fcawindowsticker',
        epriceButtons: '.js-buttons-eprice',
        inventoryButtons: '.js-buttons-inventory',
        customButtons: '.js-buttons-custom',
        precisePriceButtons: '.js-buttons-preciseprice',
        precisePriceTradeButtons: '.js-buttons-precisepricetrade',
        precisePriceTestDriveButtons: '.js-buttons-precisepricetestdrive',
        paymentEstimator: '.js-buttons-paymentestimator',
        buttonsGroup: '.js-buttons-group',
        buttonsDropdownLink: '.js-buttons-dropdown-link',
        buttonsDropdown: '.js-buttons-dropdown',
        actionButtonsTextLink: '.js-action-buttons-text-link',
        actionButtonsEmailLink: '.js-action-buttons-email-link',
        actionButtonsFormSwitcher: '.js-action-buttons-share-form-switcher',
        actionButtonsShareFormStart: '.js-action-buttons-share-form-start',
        getOfferButton: '.js-buttons-getoffer',
        validationError: '.js-validation-error',
        standardWidgetButtons: '.js-button',
    };

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = async function() {
        await new Promise(resolve => setTimeout(resolve, 0));
        _changeButtonGroupOrientation(Moff.getMode());
        Moff.onViewChange(_changeButtonGroupOrientation);
        _fitDropdown();

        _handleShareButtons();
        await new Promise(resolve => setTimeout(resolve, 0));
        _handleSaveButtons();
        await new Promise(resolve => setTimeout(resolve, 0));
        _handlePrintButtons();
        _handlePrecisePriceButtons();
        _handlePaymentEstimatorButtons();
        await new Promise(resolve => setTimeout(resolve, 0));
        _handleButtonsClicks();
        await new Promise(resolve => setTimeout(resolve, 0));
        _assignForInventoryUpdate();
        _getEpriceHandler();
    };

    /**
     * Handle click on buttons
     *
     * @method _handleButtonsClicks
     * @private
     */
    function _handleButtonsClicks() {
        MODULE.$find(SEL.standardWidgetButtons).on('click.buttons', function() {
            const eventData = _getButtonData($(this));

            Moff.event.trigger('dsa.ctaButton', eventData);
            Moff.event.trigger('dsa.ctaClick', eventData);
        });


        MODULE.$find(`${SEL.epriceButtons},${SEL.inventoryButtons},${SEL.fcaWindowStickerButtons}`).on('click.buttons', function() {
            const eventData = _getButtonData($(this));

            Moff.event.trigger('dsa.ctaClick', eventData);
        });

        MODULE.$find(SEL.saveButtons).on('click.buttons', function() {
            const eventData = _getButtonData($(this));

            Moff.event.trigger('dsa.saveVehicleButton', eventData);
            Moff.event.trigger('dsa.ctaButton', eventData);
            Moff.event.trigger('dsa.ctaClick', eventData);
        });

        MODULE.$find(SEL.printButtons).on('click.buttons', function() {
            const eventData = _getButtonData($(this));

            Moff.event.trigger('dsa.vehiclePrintButton', eventData);
            Moff.event.trigger('dsa.ctaButton', eventData);
            Moff.event.trigger('dsa.ctaClick', eventData);
        });

        MODULE.$find(SEL.shareButtons).on('click.buttons', function() {
            const button = $(this);
            const eventData = _getButtonData(button);

            if (button.hasClass(SEL.twitterShareButton.slice(1))) {
                Moff.event.trigger('dsa.socialTweet', eventData);
            }

            Moff.event.trigger('dsa.socialShare', eventData);
            Moff.event.trigger('dsa.ctaButton', eventData);
            Moff.event.trigger('dsa.ctaClick', eventData);
        });

        MODULE.$find(SEL.customButtons).on('click.buttons', function() {
            const $btn = $(this);
            const eventData = _getButtonData($(this));
            const isNewTabTarget = $btn.attr('target') === '_blank';
            const isInteractivePopup = ($btn.hasClass('js-internal-popup') || $btn.hasClass('js-external-popup')) &&
                /md|lg/.test(Moff.getMode());

            if (isInteractivePopup || isNewTabTarget) {
                Moff.event.trigger('dsa.ctaButton', eventData);
                Moff.event.trigger('dsa.ctaClick', eventData);
            }
        });

        MODULE.$find(SEL.canadaButtons).on('click.buttons', () => {
            window.localStorage.setItem('canadaBPSource', Moff.modules.get('DataLayer').findData('PageObject').Type);
        });

        MODULE.$find(SEL.hyundaiWindowStickerButtons).on('click.buttons', function() {
            Moff.event.trigger('dsa.downloadFile', {
                data: {
                    FileObject: {
                        url: $(this).attr('href'),
                        name: 'windowsticker.pdf',
                    },
                },
            });
        });

        MODULE.$find(SEL.getOfferButton).on('click.buttons', function() {
            const eventData = _getButtonData($(this));

            Moff.event.trigger('dsa.getOfferClick', eventData);
            Moff.event.trigger('dsa.ctaClick', eventData);
        });

        MODULE.$find(`${SEL.customButton}, ${SEL.epriceButton}, ${SEL.paymentestimatorButton}`).on('click', function() {
            const $button = $(this);
            const eventData = _getButtonData($button);

            $.extend(true, eventData.data, {
                LinkObject: {
                    href: $button.attr('href'),
                    url: $button[0].href,
                    text: $button.text().trim(),
                    trigger: 'aa-link',
                    type: 'Button',
                },
            });
            Moff.event.trigger('dsa.priceDetails', eventData);
        });
    }

    /**
     * Set callback for inventory search results update
     *
     * @method _assignForInventoryUpdate
     * @private
     */
    function _assignForInventoryUpdate() {
        MODULE.ajaxRegister({
            successCallbacks: [{
                    on: [
                        'inventory.filtering',
                        'inventory.search',
                        'inventory.sorting',
                        'inventory.paging',
                    ],
                    callback() {
                        _detachEventHandlers();
                        _handleButtonsClicks();
                        _handleShareButtons();
                        _handlePrintButtons();
                        _handlePrecisePriceButtons();
                    },
                },
                {
                    on: [
                        'gallery.zoom',
                    ],
                    callback() {
                        setTimeout(() => {
                            _detachEventHandlers();
                            _updateSaveButtons(_getSavedVehicles());
                            _changeButtonGroupOrientation(Moff.getMode());
                            Moff.modules.get('Popup').reInit($(MODULE.scope));
                            _handleButtonsClicks();
                            _handleShareButtons();
                            _handlePrintButtons();
                            _handlePrecisePriceButtons();
                        }, 0); // because of callback order with pushState: false
                    },
                },
            ],
        });
    }

    /**
     * Remove all event handlers depended on inventory updates
     *
     * @method _detachEventHandlers
     * @private
     */
    function _detachEventHandlers() {
        const $popupButtons = MODULE.$find(`${SEL.actionButtonsTextLink}, ${SEL.actionButtonsEmailLink}`);

        Moff.modules.get('Popup').destroyPopup($popupButtons);
        MODULE.$find(`${SEL.saveButtons}, ${SEL.printButtons}, ${SEL.shareButtons}, ${SEL.customButtons}, ${SEL.precisePriceButtons}, ${SEL.canadaButtons}`).off('click.buttons');
    }

    /**
     * Returns UI object for button
     *
     * @method _getButtonData
     * @param {jQuery} $button - handled button jQuery object
     * @returns {Object}
     * @private
     * */
    function _getButtonData($button) {
        const UIObject = {
            Name: $button.text().trim(),
            DefaultState: 'default',
            PreviousState: 'default',
            NewState: 'clicked',
        };
        const vuid = $button.data('vuid') || Moff.modules.get('DataLayer').findData('PrimaryVehicleId');
        const {
            offerId,
            offerSource
        } = $button.data();
        const data = {
            data: {
                UIObject
            },
            links: [],
        };
        const linkText = $button.hasClass(SEL.standardWidgetButtons.slice(1)) ? $button.attr('href') : $button.text().trim();

        let socialType = '';

        if (vuid) {
            data.links.push(`VehicleObject_${vuid}`);
        }

        if (offerId && offerSource) {
            data.links.push(`${Moff.utils.ucfirst(offerSource)}OfferObject_${offerId}`);
        }

        $.extend(true, data.data, {
            LinkObject: {
                text: linkText,
                href: $button.attr('href'),
            },
            ButtonType: $button.data('button-type'),
        });

        if ($button.hasClass(SEL.facebookShareButton.slice(1))) {
            socialType = 'facebook';
        } else if ($button.hasClass(SEL.twitterShareButton.slice(1))) {
            socialType = 'twitter';
        } else if ($button.hasClass(SEL.googleShareButton.slice(1))) {
            socialType = 'google';
        }

        if (socialType) {
            $.extend(true, data.data, {
                SocialType: socialType
            });
        }

        return data;
    }

    function _changeButtonGroupOrientation(mode) {
        const $group = $(SEL.buttonsGroup);

        $.each($group, function() {
            const $buttonsGroup = $(this);
            const groupLayout = $buttonsGroup.data('layout');

            if (mode === 'xs') {
                $buttonsGroup
                    .addClass('btn-group-vertical')
                    .removeClass('btn-group btn-group-justified btn-group-horizontal');
            } else {
                $buttonsGroup
                    .removeClass('btn-group-vertical')
                    .addClass(`btn-group-${groupLayout}`)
                    .addClass(groupLayout !== 'vertical' ? 'btn-group' : '');
            }
        });
    }

    function _fitDropdown() {
        MODULE.$find(SEL.buttonsDropdownLink).on('show.bs.dropdown', function() {
            const link = $(this);
            const dropdown = link.find(SEL.buttonsDropdown);

            dropdown.css('left', Math.min(0, $(window).width() - dropdown.outerWidth() - link.offset().left));
        });
    }

    function _handleShareButtons() {
        const popupBtns = MODULE.$find(`${SEL.actionButtonsTextLink}, ${SEL.actionButtonsEmailLink}`);

        if (popupBtns.length) {
            Moff.modules.getBy('class', 'Popup')[0].initAjaxPopup(popupBtns, {
                maxWidth: 600,
                dataUrl: 'href',
                responseProcessing(response, element) {
                    return response[element.data('module-id')];
                },
                callbacks: {
                    afterAjax() {
                        const {
                            content
                        } = this;
                        const {
                            moduleId
                        } = this.data;
                        const vuid = this.element.data('vuid');
                        const dealerId = this.element.data('dealerid');

                        Moff.modules.getBy('class', 'Form')[0].reInit(content);
                        Moff.event.trigger('dsa.pageView');
                        content.on('submit', 'form', function(event) {
                            const formType = $(this).data('name');
                            const postData = $(this).serializeArray();

                            postData.push({
                                name: '_vuid',
                                value: vuid
                            }, {
                                name: '_dealerId',
                                value: dealerId
                            });

                            Moff.ajaxSystem.request({
                                moduleId,
                                action: 'shareForm',
                                postData,
                                pushState: false,
                                preloader: {
                                    show() {
                                        Moff.ajaxSystem.showPreloader(content.find('form'));
                                    },
                                    hide() {
                                        Moff.ajaxSystem.hidePreloader(content.find('form'));
                                    },
                                },
                                success(html) {
                                    let timeout;
                                    const forms = $(html).find('form');

                                    if (forms.length) {
                                        $.each(forms, function() {
                                            content.find(`form[data-name="${$(this).attr('data-name')}"]`).replaceWith($(this));
                                        });
                                    } else {
                                        content.html(html);
                                    }

                                    Moff.modules.get('Form').reInit(content);
                                    $(`${SEL.validationError} :input:first`).focus();

                                    if (!$(SEL.validationError).length && $.magnificPopup.instance.content) {
                                        timeout = setTimeout(Moff.modules.getBy('class', 'Popup')[0].closePopup, 3000);
                                        Moff.event.on('popup.close', () => {
                                            clearTimeout(timeout);
                                        });
                                        _handleShareFormEvent(formType, 'dsa.shareFormSubmit', vuid);
                                    }
                                },
                            });

                            event.preventDefault();
                        });
                    },
                },
            });
        }

        $('body').on('click.buttons', SEL.actionButtonsFormSwitcher, function(event) {
            const $formWrapper = $(`.js-action-buttons-share-form-${$(this).attr('href').slice(1)}`);

            $(SEL.actionButtonsShareFormStart).addClass('hide');
            $formWrapper.removeClass('hide');
            _handleShareFormEvent($formWrapper.find('form').data('name'), 'dsa.shareFormOpen');

            event.preventDefault();
        });
    }

    function _handleShareFormEvent(formType, eventName, vuid) {
        const formTypeMap = {
            'text-self': 'send-to-mobile',
            'text-friend': 'send-to-mobile-friend',
            'email-friend': 'email-to-friend',
            'email-self': 'email-to-self',
        };
        const eventObject = {
            data: {
                FormObject: {},
            },
        };

        if (vuid) {
            eventObject.links = [`VehicleObject_${vuid}`];
        }

        if (formTypeMap[formType]) {
            eventObject.data.FormObject.Type = formTypeMap[formType];
            Moff.event.trigger(eventName, eventObject);
        }
    }

    function _handleSaveButtons() {
        _updateSaveButtons(_getSavedVehicles());

        $(MODULE.scope).on('click.buttons', SEL.saveButtons, function(event) {
            const btn = $(this);
            const vuid = btn.data('vuid');
            const vuids = _getSavedVehicles();

            if (!btn.hasClass('__saved')) {
                vuids.push(vuid);
                Moff.cookie.set('saved_vehicles', JSON.stringify(vuids), {
                    expires: 7 * 24 * 60 * 60,
                    path: '/',
                });
                Moff.event.trigger('saved-vehicles.add', {
                    vuids
                });
                Moff.event.trigger('dsa.saveVehicle', {
                    links: [`VehicleObject_${vuid}`],
                });
            } else {
                vuids.splice(vuids.indexOf(vuid), 1);
                Moff.cookie.set('saved_vehicles', JSON.stringify(vuids), {
                    expires: 7 * 24 * 60 * 60,
                    path: '/',
                });
                Moff.event.trigger('saved-vehicles.remove', {
                    vuids
                });
                Moff.event.trigger('dsa.removeSavedVehicle', {
                    links: [`VehicleObject_${vuid}`],
                });
            }

            event.preventDefault();
        });

        Moff.event.on('saved-vehicles.add', event => _updateSaveButtons(event.vuids));
        Moff.event.on('saved-vehicles.remove', event => _updateSaveButtons(event.vuids));
    }

    function _getSavedVehicles() {
        const vuids = Moff.cookie.get('saved_vehicles');

        return vuids ? JSON.parse(vuids) : [];
    }

    function _updateSaveButtons(vuids = []) {
        const btns = MODULE.$find(SEL.saveButtons);

        btns
            .html(btns.first().data('save-text'))
            .removeClass('__saved');

        vuids.forEach(vuid => {
            const btn = MODULE.$find(`${SEL.saveButtons}[data-vuid=${vuid}]`);

            btn
                .html(btn.data('saved-text'))
                .addClass('__saved');
        });
    }

    function _handlePrintButtons() {
        MODULE.$find(SEL.printButtons).on('click.buttons', event => {
            window.print();

            event.preventDefault();
        });
    }

    function _handlePrecisePriceButtons() {
        MODULE.$find(`${SEL.precisePriceButtons}, ${SEL.precisePriceTradeButtons}, ${SEL.precisePriceTestDriveButtons}`).on('click.buttons', function(event) {
            const $btn = $(this);
            const eventData = _getButtonData($btn);

            Moff.event.trigger('precisePrice.openPopup', {
                vin: $btn.data('vin'),
                vdpUrl: $btn.data('vdp-url'),
                entryPoint: $btn.data('entry-point'),
            });

            Moff.event.trigger('dsa.openPrecisePrice', eventData);

            event.preventDefault();
        });
    }

    function _handlePaymentEstimatorButtons() {
        MODULE.$find(SEL.paymentEstimator).on('click.buttons', function(event) {
            if (Moff.modules.get('DataLayer').findData('PageObject').Type === 'vehicle-details-page') {
                const SCROLL_SPEED = 2.5;
                const $paymentEstimator = $($(this).attr('href'));

                Moff.utils.scrollToElement($paymentEstimator, SCROLL_SPEED);

                event.preventDefault();
            }
        });
    }

    /**
     * Send AJAX request after EPrice Unlock form success submit
     * @private
     */
    function _getEpriceHandler() {
        Moff.event.on('eprice-unlock-form.success', () => {
            const RTIPriceModule = Moff.modules.get('VehiclePriceTheme2');
            const DGModule = Moff.modules.get('DigitalGarageTheme1');

            // Wait to success unlock if Toyota RTI is enabled
            if (RTIPriceModule && DGModule) {
                RTIPriceModule.unlockToyotaEpriceOnLeadSend();

                return;
            }

            Moff.ajaxSystem.request({
                event: 'eprice-unlock.update',
                preloader: {
                    show() {},
                    hide() {},
                },
                pushState: false,
                success() {
                    _changeButtonGroupOrientation(Moff.getMode());
                },
            });
        });
    }
});
Moff.modules.initClass('Buttons', {
    scopeSelector: 'body',
});