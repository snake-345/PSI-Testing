/**
 * @module Popup
 */
Moff.modules.create('Popup', function() {
    'use strict';

    /**
     * Link to popup module
     * @private
     */
    const MODULE = this;
    const SEL = {
        internalPopup: '.js-internal-popup',
        externalPopup: '.js-external-popup',
        mfpContent: '.mfp-content',
        popupClose: '.js-popup-close',
        popupContent: '.js-popup-content',
        popupLayout: '.js-popup-layout',
    };
    const DEFAULT_MAGNIFIC_OPTIONS = {
        mainClass: '__full-screen __fade-effect overlay-bg',
        removalDelay: 160,
        fixedContentPos: true,
        showCloseBtn: false,
    };
    const MOD = {
        popupIsOpened: 'popup-is-opened',
    };

    let _$scope,
        _$body;

    /**
     * Popups initialization
     * @method init
     */
    this.init = function() {
        _$scope = $(this.scope);
        _$body = $('body');
        this.initDefaultPopups();
        checkHash(window.location.hash);
        closeHandlers();
    };

    /**
     * Init default popups
     * @param {jQuery} scope
     * @method initDefaultPopups
     */
    this.initDefaultPopups = function(scope = _$scope) {
        MODULE.initIframePopup(scope.find(SEL.internalPopup));
        MODULE.initInlinePopup(scope.find(SEL.externalPopup), {
            content() {
                return `<iframe src="${this.element.attr('href')}" height="400" width="100%" frameborder="0"></iframe>`;
            },
        });
    };

    /**
     * Popups reInitialization
     * @method reInit
     * @param {object} scope - jquery object in which init popups
     */
    this.reInit = function(scope = _$scope) {
        this.initDefaultPopups(scope);
    };

    this.initIframePopup = function(elements) {
        let startTarget,
            startCoords,
            startTime,
            startTap,
            isTap;

        elements
            .on('touchstart', event => {
                startCoords = event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
                startTarget = event.target;
                startTime = new Date();
                startTap = true;
            })
            .on('touchend', event => {
                const coords = event.originalEvent.targetTouches ? event.originalEvent.changedTouches[0] : event;

                if (startTap &&
                    startTarget === event.target &&
                    Math.abs(startCoords.pageX - coords.pageX) < 5 &&
                    Math.abs(startCoords.pageY - coords.pageY) < 5 &&
                    new Date().getTime() - startTime.getTime() < 2000) {
                    isTap = true;
                }

                startTap = false;
            })
            .on('click', event => {
                const element = $(event.currentTarget);
                const src = element.attr('href');
                const id = element.data('popup-id');

                this.openIframePopup({
                    src,
                    id,
                    isMobile: isTap && /xs|sm/.test(Moff.getMode())
                });
                event.preventDefault();
            });
    };

    this.openIframePopup = function({
        src,
        id = null,
        callback = function() {},
        isMobile = false
    }) {
        if (Moff.detect.isInIframe) {
            window.top.Moff.modules.getByName('Popup')[0].openIframePopup({
                src,
                id,
                callback,
                isMobile
            });

            return;
        }

        if (isMobile) {
            window.location.href = src;

            return;
        }

        Moff.event.trigger('fly-out-panel.force-hide');
        this.closePopup();
        setTimeout(() => {
            $.magnificPopup.open($.extend({
                type: 'iframe',
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allowtransparency></iframe>' +
                        '</div>',
                },
                items: {
                    src,
                    type: 'iframe',
                },
                callbacks: {
                    open() {
                        if (!id) {
                            return;
                        }

                        if (window.history) {
                            window.history.pushState(null, null, `#${id}`);
                        } else {
                            window.location.hash = id;
                        }

                        blockScrollingPageIfMobile();
                    },
                    beforeAppend() {
                        const popup = this;

                        this.content.find('iframe').on('load', function() {
                            popup.content.find('iframe').contents().find('body').addClass('__popup-iframe');
                            this.style.visibility = 'visible';
                            $(popup.preloader).hide();
                            callback();
                        });
                    },
                    close() {
                        this._lastFocusedEl = null; // prevent set focus to last element, because we don't wanna it
                    },
                    afterClose() {
                        if (!id) {
                            return;
                        }

                        if (window.history) {
                            window.history.pushState(null, null, '#');
                        } else {
                            window.location.hash = '';
                        }
                    },
                },
            }, DEFAULT_MAGNIFIC_OPTIONS));
        }, DEFAULT_MAGNIFIC_OPTIONS.removalDelay || 0);
    };

    this.initInlinePopup = function(elements = {}, options = {}) {
        const defaultOptions = {
            content: '',
            maxWidth: 800,
            waiting(loaded) { // eslint-disable-line no-shadow
                loaded();
            },
            callbacks: {
                beforeAppend() {},
                afterOpen() {},
                afterClose() {},
                beforeClose() {},
            },
        };

        const extendedOptions = $.extend(true, {}, defaultOptions, options);

        $.each(elements, function() {
            const element = $(this);

            let {
                content
            } = extendedOptions;

            if (typeof content === 'function') {
                content = content.call({
                    element,
                    data: element.data(),
                });
            }

            element.magnificPopup($.extend({
                type: 'inline',
                inline: {
                    markup: generateLayout(extendedOptions.maxWidth),
                },
                items: {
                    content,
                },
                callbacks: {
                    beforeAppend() {
                        const dataForCallbacks = {
                            element,
                            data: element.data(),
                            layout: this.content,
                            content: this.content.find(SEL.mfpContent),
                            contentContainer: this.content.find(SEL.popupContent),
                        };

                        extendedOptions.callbacks.beforeAppend.call(dataForCallbacks);
                        this.content.css('visibility', 'hidden');
                        extendedOptions.waiting.call(dataForCallbacks, $.proxy(loaded, this));
                    },
                    open() {
                        extendedOptions.callbacks.afterOpen.call({
                            element,
                            data: element.data(),
                            layout: this.content,
                            content: this.content.find(SEL.mfpContent),
                            contentContainer: this.content.find(SEL.popupContent),
                        });

                        blockScrollingPageIfMobile();
                    },
                    close() {
                        this._lastFocusedEl = null; // prevent set focus to last element, because we don't wanna it
                        extendedOptions.callbacks.afterClose();
                    },
                    beforeClose() {
                        extendedOptions.callbacks.beforeClose();
                    },
                },
            }, DEFAULT_MAGNIFIC_OPTIONS));
        });
    };

    /**
     * Open Inline Popup
     * @method openInlinePopup
     * @param {Object} opts - object which contains options for popup
     * @param {*} opts.content - popup content
     * @param {Number} opts.maxWidth - max width of popup content wrapper
     * @param {Function} opts.waiting - function for waiting content, after load content, this function will call loaded function
     * @param {Object} opts.callbacks - popup callbacks object
     */
    this.openInlinePopup = function(opts = {}) {
        const defaultOptions = {
            content: '',
            maxWidth: 800,
            waiting(loaded) { // eslint-disable-line no-shadow
                loaded();
            },
            callbacks: {
                beforeAppend() {},
                afterOpen() {},
                afterClose() {},
                beforeClose() {},
            },
        };
        const {
            content
        } = opts;
        const options = $.extend(true, {}, defaultOptions, opts);
        const removalDelay = $.magnificPopup.instance.isOpen ? $.magnificPopup.instance.st.removalDelay : 0;

        this.closePopup();
        setTimeout(() => {
            $.magnificPopup.open($.extend({
                type: 'inline',
                inline: {
                    markup: generateLayout(options.maxWidth),
                },
                items: {
                    content,
                },
                callbacks: {
                    beforeAppend() {
                        const dataForCallbacks = {
                            layout: this.content,
                            content: this.content.find(SEL.mfpContent),
                            contentContainer: this.content.find(SEL.popupContent),
                        };

                        options.callbacks.beforeAppend.call(dataForCallbacks);
                        this.content.css('visibility', 'hidden');
                        options.waiting.call(dataForCallbacks, $.proxy(loaded, this));
                    },
                    open() {
                        options.callbacks.afterOpen.call({
                            layout: this.content,
                            content: this.content.find(SEL.mfpContent),
                            contentContainer: this.content.find(SEL.popupContent),
                        });

                        blockScrollingPageIfMobile();
                    },
                    beforeClose() {
                        options.callbacks.beforeClose();
                    },
                    close() {
                        this._lastFocusedEl = null; // prevent set focus to last element, because we don't wanna it
                        options.callbacks.afterClose();
                    },
                },
            }, DEFAULT_MAGNIFIC_OPTIONS));
        }, removalDelay);
    };

    this.initAjaxPopup = function(elements, options = {}) {
        const defaultOptions = {
            responseProcessing(response) {
                return response;
            },
            url: false,
            dataUrl: false,
            maxWidth: 800,
            callbacks: {
                beforeAppend() {},
                afterOpen() {},
                afterAjax() {},
            },
        };
        const extendedOptions = $.extend(true, {}, defaultOptions, options);

        let url = {};

        if (typeof extendedOptions.url === 'string') {
            url = {
                items: {
                    src: extendedOptions.url,
                },
            };
        }

        elements.on('click.magnificPopup', event => {
            const element = jQuery.extend({}, $(event.currentTarget));
            const removalDelay = $.magnificPopup.instance.isOpen ? $.magnificPopup.instance.st.removalDelay : 0;

            if (extendedOptions.dataUrl && element.data(extendedOptions.dataUrl)) {
                url = {
                    items: {
                        src: element.data(extendedOptions.dataUrl),
                    },
                };
            }

            MODULE.closePopup();
            setTimeout(() => {
                $.magnificPopup.open($.extend({
                    type: 'ajax',
                    callbacks: {
                        parseAjax(response) {
                            const layout = $(generateLayout(extendedOptions.maxWidth));
                            const responseHtml = extendedOptions.responseProcessing(response.data, element);

                            layout.find(SEL.mfpContent).append(responseHtml);
                            response.data = layout; // eslint-disable-line no-param-reassign
                        },
                        beforeAppend() {
                            extendedOptions.callbacks.beforeAppend.call({
                                element,
                                data: element.data(),
                                content: this.contentContainer.find(SEL.mfpContent),
                            });
                        },
                        open() {
                            extendedOptions.callbacks.afterOpen.call({
                                element,
                                data: element.data(),
                                content: this.contentContainer.find(SEL.mfpContent),
                            });

                            blockScrollingPageIfMobile();
                        },
                        ajaxContentAdded() {
                            loaded.call(this);
                            extendedOptions.callbacks.afterAjax.call({
                                element,
                                data: element.data(),
                                content: this.contentContainer.find(SEL.mfpContent),
                            });
                        },
                    },
                }, DEFAULT_MAGNIFIC_OPTIONS, url));
            }, removalDelay);
            event.preventDefault();
        });
    };

    this.destroyPopup = function($elements) {
        $elements
            .off('click.magnificPopup')
            .removeData('magnificPopup');
    };


    function loaded() {
        this.preloader.hide();
        this.content.css('visibility', 'visible');
    }

    function generateLayout(maxWidth = 800) {
        return `
			<div class="popup ${SEL.popupLayout.slice(1)}">
				<div class="popup_overlay ${SEL.popupClose.slice(1)}"></div>
				<div class="popup_content ${SEL.popupContent.slice(1)}" style="max-width: ${maxWidth > 0 ? `${maxWidth}px` : '100%'};">
					<div class="mfp-content"></div>
					<div class="popup_close ${SEL.popupClose.slice(1)}">×</div>
				</div>
			</div>
		`;
    }

    /**
     * Close popup handlers
     * @function closeHandlers
     */
    function closeHandlers() {
        $(document)
            .on('click', SEL.popupClose, event => {
                const dataLayer = Moff.modules.get('DataLayer');
                const $target = $(event.target);

                if ($target.hasClass('js-popup-close-in-popup-layout') && window.top === window.self) {
                    if (document.referrer) {
                        window.location.replace(document.referrer);
                    } else {
                        window.history.back();
                    }
                } else {
                    if ($target.length) {
                        const primaryVehicleId = dataLayer.findData('PrimaryVehicleId');
                        const eventData = {
                            data: {
                                PageObject: dataLayer.findData('PageObject'),
                                LinkObject: {
                                    text: $target.text(),
                                    title: 'close',
                                    trigger: 'aa-link',
                                    type: 'Button',
                                },
                            },
                        };

                        if (primaryVehicleId) {
                            eventData.links = [`VehicleObject_${primaryVehicleId}`];
                        }

                        Moff.event.trigger('dsa.closePopup', eventData);
                    }

                    MODULE.closePopup();
                }
            })
            .on('keyup', event => {
                if (event.keyCode === Moff.keys.escape) {
                    MODULE.closePopup();
                }
            });
    }

    /**
     * Closes popup
     */
    this.closePopup = function() {
        const scope = Moff.detect.isInIframe && typeof window.parent.$.magnificPopup.close !== 'undefined' ?
            window.parent :
            window;

        if (!scope.$.magnificPopup.instance.content) {
            return;
        }

        scope.$.magnificPopup.close();
        scope.Moff.event.trigger('popup.close');

        if (Moff.detect.isMobile) {
            _$body.removeClass(MOD.popupIsOpened);
        }
    };

    /**
     * Run after close callback
     *
     * @method afterClose
     * @param {Function} callback
     */
    this.afterClose = function(callback) {
        if (Moff.detect.isInIframe) {
            window.top.$.magnificPopup.instance.st.callbacks.afterClose = callback;
        } else if (typeof $.magnificPopup.instance.st !== 'undefined') {
            $.magnificPopup.instance.st.callbacks.afterClose = callback;
        }
    };

    /**
     * Run before close callback
     *
     * @method beforeClose
     * @param {Function} callback
     */
    this.beforeClose = function(callback) {
        if (Moff.detect.isInIframe) {
            window.top.$.magnificPopup.instance.st.callbacks.beforeClose = callback;
        } else if (typeof $.magnificPopup.instance.st !== 'undefined') {
            $.magnificPopup.instance.st.callbacks.beforeClose = callback;
        }
    };

    /**
     * Check hash in current url and open popup with this popup id
     * @param {String} hash
     * @function checkHash
     */
    function checkHash(rawHash) {
        if (rawHash) {
            const hash = rawHash.replace(/#/gi, '');

            $(`[data-popup-id="${hash}"]`).trigger('click');
        }
    }

    function blockScrollingPageIfMobile() {
        if (Moff.detect.isMobile) {
            _$body.addClass(MOD.popupIsOpened);
        }
    }
});

// Initialize Popup module
Moff.modules.initClass('Popup', {
    scopeSelector: 'body',
});