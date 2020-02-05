// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/vendor/magnific-popup/dist/jquery.magnific-popup.js';
// import '../../../../../../../assets/components/popup/popup.es6.js';

/**
 * @module ThirdPartyScripts
 */
Moff.modules.create('ThirdPartyScriptsTheme1', function() {
    'use strict';

    const MODULE = this;
    const SEL = {
        driveItNowButton: 'div[id^="din_"]',
        popupContent: '.js-popup-content',
        popupLayout: '.js-pp-layout',
        mfpWrap: '.mfp-wrap',
        mfpBg: '.mfp-bg',
    };
    const MOD = {
        driveItNowButtonInited: 'din_inited',
    };

    let _modulePopup,
        _$document,
        _$body;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        _$document = $(document);
        _$body = $('body');
        _modulePopup = Moff.modules.get('Popup');

        if (MODULE.data.scripts && MODULE.data.scripts.hasOwnProperty('driveItNow')) {
            _initDriveItNow();
        }

        if (MODULE.data.scripts && MODULE.data.scripts.hasOwnProperty('precisePrice')) {
            _handlePrecisePrice();
        }
    };

    function _initDriveItNow() {
        $(SEL.driveItNowButton).addClass(MOD.driveItNowButtonInited);

        MODULE.ajaxAddSuccessCallback([
            'inventory.filtering',
            'inventory.search',
            'inventory.sorting',
            'inventory.paging',
        ], () => setTimeout(driveItNowAfterAjax, 0));
    }

    function driveItNowAfterAjax() {
        const $newButtons = $(`${SEL.driveItNowButton}:not(.${MOD.driveItNowButtonInited})`);
        const currCount = window.arr_count - $newButtons.length;

        $.each($newButtons, (i, btn) => $(btn).addClass(MOD.driveItNowButtonInited).attr('id', `din_${currCount + i}`));
        window.load_din_buttons();
    }

    function _handlePrecisePrice() {
        Moff.event.on('precisePrice.openPopup', data => _openPrecisePrice(data));

        _$document
            .on('ppReady', event => _initPrecisePrice(event.originalEvent.detail))
            .on('ppClose', _closePrecisePrice)
            .on('ppStepChange', event => _changeStepOfPrecisePrice(event.originalEvent.detail.hash));

        Moff.event.on('popup.close', () => {
            history.replaceState({}, '', ' ');
        });

        $(window).on('resize', _updatePopupLayoutHeight);
    }

    function _initPrecisePrice(parameters) {
        if (parameters && parameters.vehicleVin && parameters.step && parameters.writeupId) {
            const {
                vehicleVin
            } = parameters;
            const vdpUrl = _$document.find(`[data-vin="${vehicleVin}"]`).data('vdp-url');

            _openPrecisePrice({
                vin: vehicleVin,
                vdpUrl,
                step: parameters.step,
                writeupId: parameters.writeupId
            });
        }
    }

    function _updatePopupLayoutHeight() {
        const $popupLayout = _$document.find(SEL.popupLayout);

        if (Moff.detect.isMobile || /xs|sm/.test(Moff.getMode())) {
            $popupLayout
                .css({
                    height: '100%'
                })
                .closest(SEL.mfpWrap).css({
                    height: '100%'
                });
        } else {
            $popupLayout.css({
                height: 'auto'
            });
        }
    }

    /**
     * Open Precise Price
     * @method openPrecisePrice
     * @param {Object} configs - object which contains options to handle Precise Price
     * @param {String} configs.vehicleVin - vehicle vin
     * @param {String} configs.vin - vehicle detail page
     * @param {String} configs.step -  witch step of Precise Price should be opened
     * @param {String} configs.entryPoint -  witch entryPoint of Precise Price should be opened
     * @param {Number | String} configs.writeupId -  saved state in precise price
     * @param {Number | String} configs.downPayment -  down payment
     * @private
     */
    function _openPrecisePrice(configs = {}) {
        const iframeConfigs = {
            vehicleVin: configs.vin,
            vdpUrl: configs.vdpUrl,
        };

        if (configs.downPayment) {
            iframeConfigs.paymentTerms = {
                down: configs.downPayment
            };
        }

        if (configs.step) {
            iframeConfigs.step = configs.step;
        }

        if (configs.entryPoint) {
            iframeConfigs.entryPoint = configs.entryPoint;
        }

        if (configs.writeupId) {
            iframeConfigs.writeupId = configs.writeupId;
        }

        const precisePriceIframe = window.precisePrice.getIframe(iframeConfigs);

        _modulePopup.openInlinePopup({
            content: precisePriceIframe,
            callbacks: {
                afterOpen() {
                    const MAX_ZINDEX = 2147483647;
                    const $popupLayout = this.layout;
                    const $iframePrecisePrice = $popupLayout.find('iframe').css({
                        position: 'relative',
                        background: '#fff'
                    }).detach();

                    $popupLayout
                        .append($iframePrecisePrice)
                        .addClass(SEL.popupLayout.slice(1));
                    this.contentContainer.remove();

                    _updatePopupLayoutHeight();

                    // All of third party and live chats shows above the Precise Price. Users can’t work if any extra blocks fill the workspace.
                    const $mfpWrap = $popupLayout.closest(SEL.mfpWrap).css({
                        'z-index': MAX_ZINDEX
                    }).detach();
                    const $mfpBg = _$body.find(SEL.mfpBg).css({
                        'z-index': MAX_ZINDEX
                    }).detach();

                    _$body
                        .append($mfpBg)
                        .append($mfpWrap);
                },
                beforeClose() {
                    $.magnificPopup.instance.st.removalDelay = 1000;

                    if (typeof window.precisePrice.beforeIframeRemove === 'function') {
                        window.precisePrice.beforeIframeRemove();
                    }

                    _$body.find(SEL.mfpBg).css({
                        'z-index': ''
                    });
                },
            },
        });
    }

    function _closePrecisePrice() {
        _modulePopup.closePopup();
    }

    function _changeStepOfPrecisePrice(hash) {
        window.location.hash = hash;
    }
});
Moff.modules.initByConfig('ThirdPartyScriptsTheme1');