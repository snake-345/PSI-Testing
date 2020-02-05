/**
 * @module Form
 */
Moff.modules.create('Form', function() {
    'use strict';

    /**
     * Link to form module
     * @private
     */
    const _form = this;

    let _parsley,
        _scope;

    /**
     * Form initialization
     * @method init
     */
    this.init = function() {
        // Promise.all([
        // 	import('../../javascripts/parsley.es6.js'),
        // 	import('../../javascripts/bootstrap-slider.es6.js'),
        // 	import('../../vendor/jquery-date-range-picker/src/jquery.daterangepicker.js'),
        // 	import('../../vendor/inputmask/dist/jquery.inputmask.bundle.js'),
        // ]).then(() => {
        _scope = $(this.scope);
        _parsley = {};

        window.Parsley.addValidator('phone', value => value.trim() === '' || /^(\+1.)?\(?\d{3}\)?[ -]?\d{3}-?\d{4}$/.test(value.trim()), 32);

        window.Parsley.addValidator('ssn', value => value.trim() === '' || /^\d{3}-\d{2}-\d{4}$/.test(value.trim()), 32);

        window.Parsley.addValidator('zipcodeus', value => value.trim() === '' || /^\d{5}$/.test(value.trim()), 32);

        window.Parsley.addValidator('zipcodecanada', value => value.trim() === '' || /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/.test(value.trim()), 32);

        window.Parsley.addValidator('withoutnumbers', value => value.trim() === '' || /^[^\d]*$/.test(value.trim()), 32);

        this.activateCollections();
        collectionHandlers();
        handleCheckboxList();
        this.initMultiStep();
        this.initMask();
        initParsley();

        if ($('body').data('recaptchaLoaded')) {
            initCaptcha();
        } else {
            Moff.event.on('recaptcha.load', initCaptcha);
        }

        _form.afterCssLoaded(() => {
            // Needs for initialized with our translates
            setTimeout(() => this.initDatepickers(), 0);
            this.initRangeSlider();
        });
        this.initTooltips();
        // });
    };

    /**
     * Initialization dynamically added forms
     * @method validate
     * @param {Object} [scope=_scope] - module scope
     */
    this.reInit = function(scope = _scope) {
        _parsley = {};
        this.activateCollections(scope);
        handleCheckboxList(scope);
        this.initMultiStep(scope);
        this.initMask(scope);
        initCaptcha(scope);
        initParsley(scope);
        this.initDatepickers();
        this.initRangeSlider(scope);
        this.initTooltips(scope);
    };

    /**
     * Activates controls related to collections of fields
     * @method activateCollections
     * @param {Object} scope - jQuery object
     */
    this.activateCollections = function(scope = _scope) {
        const collections = scope.find(_form.config.selectors.collection);

        $.each(collections, function() {
            const isEmpty = !$(this).find(_form.config.selectors.collectionInner).children().length;

            if (isEmpty) {
                addCollectionItem($(this));
            }
        });
    };

    function collectionHandlers() {
        const collectionScope = `${_form.config.selectors.form} ${_form.config.selectors.collection}`;

        _scope.on('click', `${collectionScope} ${_form.config.selectors.collectionAddBtn}`, function(event) {
            const collection = $(this).closest(_form.config.selectors.collection);

            addCollectionItem(collection);

            event.preventDefault();
        });

        _scope.on('click', `${collectionScope} ${_form.config.selectors.collectionRemoveBtn}`, function(event) {
            const item = $(this).closest(_form.config.selectors.collectionItem);

            removeCollectionItem(item);

            event.preventDefault();
        });
    }

    /**
     * Adds new item in collection and activates sub collections in new item
     * @function addCollectionItem
     * @param {Object} collection - jQuery object contains collection
     */
    function addCollectionItem(collection) {
        const inner = collection.find(_form.config.selectors.collectionInner);
        const itemId = inner.children().length + 1;
        const prototype = inner.data('prototype');
        const newItem = $(prototype.replace(/__name__/g, itemId));

        _form.activateCollections(newItem);

        inner.append(newItem);
        toggleRemoveBtn(collection);
    }

    /**
     * Removes item from collection
     * @function removeCollectionItem
     * @param {Object} item - jQuery object contains item which should be removed
     */
    function removeCollectionItem(item) {
        const collection = item.closest(_form.config.selectors.collection);

        item.remove();
        toggleRemoveBtn(collection);
    }

    /**
     * Hides "remove button" if collection contains only one item, else show it
     * @function toggleRemoveBtn
     * @param {Object} collection - jQuery object contains collection
     */
    function toggleRemoveBtn(collection) {
        const inner = collection.find(_form.config.selectors.collectionInner);
        const isItemOnlyOne = inner.children().length === 1;

        inner.children(':first').find(`${_form.config.selectors.collectionRemoveBtn}:last`).toggleClass('hide', isItemOnlyOne);
    }

    /**
     * Move checkboxlist data attributes for Parsley validation
     * @function handleCheckboxList
     * @param {Object} [scope=_scope] - module scope
     */
    function handleCheckboxList(scope = _scope) {
        const {
            config
        } = _form;

        let container,
            list,
            input,
            name,
            value;

        $.each(scope.find(config.checkboxlist.selector), function() {
            list = $(this);
            input = list.find(':input:first');

            $.each(config.checkboxlist.attributes, function() {
                value = this;
                name = `${config.dataAttribute}-${value}`;

                if (list.attr(name) !== undefined) {
                    input.attr(name, list.attr(name));
                    list.removeAttr(name);
                }
            });
            container = `#${list.attr('id')}`;
            input.attr(`${config.dataAttribute}-class-handler`, container);
            input.attr(`${config.dataAttribute}-errors-container`, container);
        });
    }

    function initCaptcha(scope = _scope) {
        $.each(scope.find('.g-recaptcha'), function() {
            const widget = window.grecaptcha.render(this, {
                sitekey: this.dataset.sitekey,
            });
            const el = $(this);

            el.closest('form').on('submit', event => {
                const tooltipPlace = el.find('.g-recaptcha-response').prev();

                if (!window.grecaptcha.getResponse(widget)) {
                    tooltipPlace.tooltip({
                        title: window.Parsley._validatorRegistry.catalog.en.required,
                        trigger: 'manual',
                    });
                    tooltipPlace.tooltip('show');
                    setTimeout(() => {
                        tooltipPlace.tooltip('hide');
                    }, 2000);
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    tooltipPlace.tooltip('hide');
                }
            });
        });
    }

    /**
     * Run Parsley.js plugin
     * @function initParsley
     * @param {Object} [scope=_scope] - module scope
     */
    function initParsley(scope = _scope) {
        setTimeout(() => {
            if (typeof $.fn.parsley !== 'undefined') {
                $.each(scope.find(_form.config.selectors.form), async function() {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    const form = $(this);

                    _parsley[form.attr('name')] = $(this).parsley();
                    await new Promise(resolve => setTimeout(resolve, 0));

                    const parsley = _parsley[form.attr('name')];
                    const timeoutIds = {};

                    parsley.on('field:validated', function() {
                        const element = this.$element;
                        const message = this.getErrorsMessages();

                        if (this.validationResult === true) {
                            removeValidationError(element.closest('.js-form-group'));
                        } else {
                            addValidationError(element.closest('.js-form-group'), message);
                        }

                        return false;
                    });

                    form.find(':input:not([type=checkbox]):not([type=radio]), .js-form-group input[type="checkbox"]:first, .js-form-group input[type="radio"]:first')
                        .on('focus', function() {
                            const errorIcon = $(this).closest('.js-form-group').find('.error-icon');

                            if (errorIcon.length) {
                                clearTimeout(timeoutIds[$(this).attr('name')]);

                                if (!errorIcon.attr('aria-describedby')) {
                                    errorIcon.tooltip('show');
                                }
                            }
                        })
                        .on('blur', function() {
                            const errorIcon = $(this).closest('.js-form-group').find('.error-icon');

                            if (errorIcon.length) {
                                timeoutIds[$(this).attr('name')] = setTimeout(() => {
                                    errorIcon.tooltip('hide');
                                }, 150);
                            }
                        });

                    await new Promise(resolve => setTimeout(resolve, 0));
                    if (form.find('.js-validation-error').length) {
                        const errorFields = form.find('.js-validation-error :input');

                        $.each(errorFields, async function() {
                            const instanceField = $(this).data('Parsley');

                            if (instanceField) {
                                instanceField.validate();
                                await new Promise(resolve => setTimeout(resolve, 0));
                            }
                        });
                    }
                });

                window.Parsley.on('form:error', function() {
                    Moff.event.trigger('form.error', this.$element);
                });

                window.Parsley.on('field:error', function() {
                    Moff.event.trigger('form.fieldError', this.$element);
                });
            }
        });
    }

    function addValidationError(parent, message) {
        const element = parent.find(':input:not([type=checkbox]):not([type=radio])').first();

        let errorIcon = parent.find('.error-icon');

        let additionalClass,
            targetForIcon;

        if (parent.find('.js-label-text').length) {
            targetForIcon = parent.find('.js-label-text');
            additionalClass = '__validation-error-near-label';
        } else if (parent.find('.custom-select').length) {
            targetForIcon = parent.find('.custom-select');
            additionalClass = '__validation-error-near-custom-select';
        } else {
            targetForIcon = element;
            additionalClass = '__validation-error-near-input';
        }

        if (errorIcon.length) {
            if (errorIcon.attr('data-original-title') !== message[0]) {
                errorIcon
                    .attr('data-original-title', message[0])
                    .tooltip('show');
            }
        } else {
            errorIcon = $(`<span class="error-icon df-icon df-icon-exclamation-triangle __df-icon-square" data-toggle="tooltip" data-container="body" title="${message[0]}"></span>`);
            targetForIcon.before(errorIcon);

            _form.initTooltips(parent);
        }

        parent
            .addClass('__validation-error js-validation-error')
            .addClass(additionalClass);
    }

    function removeValidationError(parent) {
        const element = parent.find(':input:not([type=checkbox]):not([type=radio])');

        if (parent.hasClass('__validation-error')) {
            parent
                .removeClass('__validation-error')
                .removeClass('js-validation-error')
                .removeClass('__validation-error-near-label')
                .removeClass('__validation-error-near-custom-select')
                .removeClass('__validation-error-near-input')
                .find('.error-icon')
                .tooltip('destroy')
                .remove();
            element
                .removeClass('parsley-error')
                .off('.showTooltip');
        }
    }

    this.initMultiStep = function(scope = _scope) {
        $.each(scope.find(_form.config.selectors.form), function() {
            const form = $(this);

            form.find('.js-previous-step').on('click', () => getStepLink(form, getStepIndex(getCurrentStep(form)) - 1).trigger('click'));

            form.find('.js-next-step').on('click', () => nextStepHandler(form));

            form.find('.js-multi-step-form-link').on('click', function() {
                if ($(this).parent().hasClass('disabled')) {
                    return false;
                }

                return true;
            });

            form.on('submit', event => {
                const isMultiStep = !!form.find(':focus').closest(_form.config.selectors.multiStep).length;
                const isLastStep = form.find('.js-multi-step-form-step.active').is('.js-multi-step-form-step:last');

                if (isMultiStep) {
                    if (isLastStep) {
                        return nextStepHandler(form);
                    }

                    event.stopImmediatePropagation();
                    nextStepHandler(form);
                    form.find('.js-multi-step-form-step.active :input:not([type=hidden]):first').focus();

                    return false;
                }

                return true;
            });
        });
    };

    function nextStepHandler(form) {
        let current = getCurrentStep(form);

        if (_parsley[form.attr('name')].validate(current) === false) {
            return false;
        }

        const nextStep = getStepLink(form, getStepIndex(current) + 1);

        current = getStepLink(form, getStepIndex(current));
        nextStep.closest('.js-multi-step-form-link-wrapper')
            .removeClass('disabled');
        current.closest('.js-multi-step-form-link-wrapper')
            .removeClass('__invalid')
            .addClass('__valid');
        nextStep.trigger('click');

        return true;
    }

    function getCurrentStep(scope) {
        return scope.find('.js-multi-step-form-step.active').attr('id');
    }

    function getStepIndex(stepId) {
        return parseInt(stepId.split('-')[1], 10);
    }

    function getStepLink(scope, stepId) {
        return scope.find(`.js-multi-step-form-link[aria-controls="step-${stepId}"]`);
    }

    this.initMask = function(scope = _scope) {
        setTimeout(() => {
            const inputs = scope.find(_form.config.selectors.inputmask);

            inputs.inputmask({
                showMaskOnHover: false,
            });
        });
    };

    this.initDatepickers = function(scope = _scope) {
        const datepickers = scope.find(_form.config.selectors.datepicker);

        $.each(datepickers, function() {
            const datepicker = $(this);
            const valueInput = datepicker.siblings('.js-datepicker');
            const format = datepicker.data('format');
            const startDate = datepicker.attr('min') ? moment(datepicker.attr('min')).format(format) : false;
            const endDate = datepicker.attr('max') ? moment(datepicker.attr('max')).format(format) : false;

            if (!Moff.detect.isMobile) {
                valueInput.attr('type', 'hidden');

                datepicker.dateRangePicker({
                    singleDate: true,
                    singleMonth: true,
                    showShortcuts: false,
                    showTopbar: false,
                    startOfWeek: 'monday',
                    language: 'en',
                    format,
                    startDate,
                    endDate,
                    monthSelect: true,
                    yearSelect: [moment().get('year') - 100, moment().get('year') + 1],
                });

                datepicker
                    .on('datepicker-first-date-selected', (event, obj) => {
                        valueInput.val(moment(obj.date1).format('YYYY-MM-DD'));
                    })
                    .on('datepicker-change', () => {
                        datepicker.parsley().validate();
                    })
                    .on('change', function() {
                        valueInput.val(moment($(this).val()).format('YYYY-MM-DD'));
                    });
            } else {
                valueInput.on('change', function() {
                    const value = $(this).val();

                    if (value) {
                        datepicker.val(moment($(this).val()).format(format));
                    } else {
                        datepicker.val('');
                    }

                    if (Moff.detect.OS.iOS) {
                        datepicker.focus().blur(); // It fix placeholder in ios which doesn't want disappear
                        valueInput.focus();
                    }

                    datepicker.trigger('keyup');
                    $(this).trigger('keyup');
                });
            }
        });
    };

    this.initRangeSlider = function(scope = _scope) {
        Moff.modules.get('InViewport').once({ // we should do it in modules
            $elements: $('.js-range-slider-wrapper'),
            inCallback() {
                $.each(scope.find(_form.config.selectors.range), async function() {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    const el = $(this);
                    const minLabel = el.closest('.js-range-slider-wrapper').find('.js-range-slider-min');
                    const maxLabel = el.closest('.js-range-slider-wrapper').find('.js-range-slider-max');
                    const data = el.data();
                    const ticks = data.sliderTicks;
                    const tickLabels = data.sliderTicksLabels;
                    const format = {
                        template: data.sliderFormat !== '' ? data.sliderFormat : '{n}',
                        decimals: data.sliderFormatDecimals !== '' ? data.sliderFormatDecimals : undefined,
                        decPoint: data.sliderFormatDecPoint !== '' ? data.sliderFormatDecPoint : undefined,
                        thousandsSep: data.sliderFormatThousandsSep !== '' ? data.sliderFormatThousandsSep : undefined,
                    };
                    const options = {
                        formatter(values) {
                            let rangeValues = values;

                            if (!$.isArray(rangeValues)) {
                                rangeValues = [rangeValues];
                            }

                            rangeValues = $.map(rangeValues, value => format.template.replace('{n}', (
                                format.decimals !== undefined || format.decPoint || format.thousandsSep ?
                                _form.numberFormat(value, format.decimals, format.decPoint, format.thousandsSep) :
                                value
                            )));

                            return rangeValues.join(' - ');
                        },
                    };

                    el.removeAttr('data-slider-ticks-labels');
                    await new Promise(resolve => setTimeout(resolve, 0));
                    el.slider(options);
                    await new Promise(resolve => setTimeout(resolve, 0));

                    const slider = $(el.slider('getElement'));

                    if (el.data('slider-size')) {
                        slider.addClass(`__${el.data('slider-size')}`);
                    }

                    if (el.data('slider-mode') === 'current-values-as-labels') {
                        el.on('slide slideStop', event => {
                            const {
                                value
                            } = event;

                            if ($.isArray(value)) {
                                minLabel
                                    .data('number', value[0])
                                    .text(options.formatter ? options.formatter(value[0]) : value[0]);
                                maxLabel
                                    .data('number', value[1])
                                    .text(options.formatter ? options.formatter(value[1]) : value[1]);
                            }
                        });
                    }

                    await new Promise(resolve => setTimeout(resolve, 0));
                    if (el.data('slider-tooltip') !== 'hide') {
                        el.data('tooltipContext', getTooltipContext(el));

                        el.on('slide slideStop', () => {
                            recalculateTooltipPosition($(el.slider('getElement')), el.data('tooltipContext'));
                        });
                        await new Promise(resolve => setTimeout(resolve, 0));
                        recalculateTooltipPosition($(el.slider('getElement')), el.data('tooltipContext'));
                    }

                    await new Promise(resolve => setTimeout(resolve, 0));
                    el.on('slide slideStop', function() {
                        clearValueInRangeSlider($(this));
                    });
                    clearValueInRangeSlider(el);

                    if (ticks) {
                        await new Promise(resolve => setTimeout(resolve, 0));
                        ticksEnhancements(slider, ticks, !el.slider('getValue').length);
                    }

                    if (tickLabels) {
                        await new Promise(resolve => setTimeout(resolve, 0));
                        renderTicksLabels(slider, tickLabels);
                    }
                });
            },
        });
    };

    function getTooltipContext(el) {
        const parent = el.parent();

        if (parent.css('overflow') !== 'visible' || parent.is('body')) {
            return parent;
        }

        return getTooltipContext(parent);
    }

    function recalculateTooltipPosition(slider, context) {
        $.each(slider.find('.tooltip'), function() {
            const tooltip = $(this);
            const contextLeft = context.offset().left;
            const contextRight = contextLeft + context.outerWidth();
            const tooltipLeft = tooltip.offset().left;
            const tooltipRight = tooltipLeft + tooltip.outerWidth();

            tooltip.find('.tooltip-inner').css({
                position: 'relative',
                left: Math.round(Math.max(0, contextLeft - tooltipLeft) + Math.min(0, contextRight - tooltipRight)),
            });
        });
    }

    function clearValueInRangeSlider(sliders) {
        $.each(sliders, function() {
            const slider = $(this);

            if (slider.data('slider-default-value')) {
                const defaultValue = slider.data('slider-default-value').split(',');
                const value = slider.slider('getValue');

                if (
                    (Array.isArray(value) &&
                        slider.slider('getAttribute', defaultValue[0]) === value[0] &&
                        slider.slider('getAttribute', defaultValue[1]) === value[1]) ||
                    (!Array.isArray(value) && slider.slider('getAttribute', defaultValue[0]) === value)
                ) {
                    slider.val('');
                }
            }
        });
    }

    function ticksEnhancements(slider, ticks, isOneHandle) {
        const additionalMargin = 100 / ticks.length / 2;

        slider.css({
            'margin-left': `${additionalMargin}%`,
            'margin-right': `${additionalMargin}%`,
        });

        slider
            .closest('.js-range-slider-wrapper')
            .prepend(`<div class="pseudo-slider-track __left${isOneHandle ? ' __selected' : ''}"></div><div class="pseudo-slider-track __right"></div>`);
    }

    function renderTicksLabels(slider, labels) {
        const {
            length
        } = labels;

        let i = 0;

        let label;

        for (; i < length; i++) {
            label = $(`<div class="slider-custom-tick-label">${labels[i]}</div>`);
            slider.append(label);
        }

        $(window).on('resize', () => {
            setTicksLabelsPosition(slider);
        });
        setTicksLabelsPosition(slider);
    }

    function setTicksLabelsPosition(slider) {
        const ticks = slider.find('.slider-tick');
        const labels = slider.find('.slider-custom-tick-label');
        const {
            length
        } = ticks;
        const sliderWidth = slider.width();
        const labelWidth = sliderWidth / length;

        let labelMaxHeight = 0;

        let i = 0;

        let label;

        for (; i < length; i++) {
            label = labels.eq(i);

            label.css({
                left: ticks.eq(i).position().left - labelWidth / 2,
                width: labelWidth,
            });

            labelMaxHeight = Math.max(labelMaxHeight, label.outerHeight());
        }

        slider.css('padding-bottom', labelMaxHeight + 5);
    }

    this.initTooltips = function(scope = _scope) {
        const tooltips = scope.find(_form.config.selectors.tooltips);

        if (!tooltips.length) {
            return false;
        }

        setTimeout(() => {
            $.each(tooltips, function() {
                const $tooltip = $(this);
                const $stickyContainer = $tooltip.closest('.js-sticky-container');

                $tooltip.tooltip({
                    container: $stickyContainer.length ? $stickyContainer : scope,
                });
            });
        }, 0);

        return true;
    };

    this.clearForm = function(form) {
        const $multiStepLinks = form.find('.js-multi-step-form-link');
        const $multiStepLinksWrappers = form.find('.js-multi-step-form-link-wrapper');

        form.find(':input:not([type=hidden])').val('');

        // Clear multistep form
        if ($multiStepLinks.length) {
            $multiStepLinksWrappers.removeClass('__valid');
            $multiStepLinks.first().trigger('click');
            $multiStepLinksWrappers.not(':first').addClass('disabled');
        }
    };
});

// Initialize Form module
Moff.modules.initClass('Form', {
    scopeSelector: 'body',
    config: {
        selectors: {
            form: 'form',
            collection: '.js-collection',
            collectionAddBtn: '.js-collection-add-item',
            collectionRemoveBtn: '.js-collection-remove-item',
            collectionItem: '.js-form-group',
            collectionInner: '[data-prototype]:first',
            range: '.js-range-slider',
            datepicker: '.js-datepicker-text',
            tooltips: '[data-toggle=tooltip]',
            multiStep: '.js-multi-step-form',
            inputmask: '.js-inputmask',
        },
        checkboxlist: {
            selector: '.js-checkboxlist',
            attributes: ['required', 'mincheck', 'maxcheck'],
        },
        dataAttribute: 'data-parsley',
    },
});