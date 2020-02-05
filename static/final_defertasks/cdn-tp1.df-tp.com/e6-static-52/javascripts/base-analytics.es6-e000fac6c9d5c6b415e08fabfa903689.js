// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
/**
 * This is main analytics module. The purpose of the module is to standardize analytics system.
 * @module Analytics
 */
// lint js_unique_name_placeholder disable
Moff.modules.create('BaseAnalyticsTheme1', function() {
    'use strict';

    /**
     * @property {{}} eventMap - map of provider events
     */
    this.eventsMap = {};

    /**
     * @property {Null|Object} converter - Analytics converter
     */
    this.converter = null;

    /**
     * @property {Null|Object} handler - Analytics event handlers
     */
    this.handler = null;

    /**
     * @const {String} NAMESPACE - events name space
     */
    const NAMESPACE = 'dsa';

    /**
     * @property {String[]} _events - list of our standard events
     * @private
     */
    const _events = [
        'vehicleView', 'liveSearch', 'liveSearchClick', 'clickToCall', 'inventorySearch', 'uiButtonUpdateResults', 'dealerSearch', 'closePopup', 'pageUnload',
        'ctaButton', 'ctaClick', 'submitClick', 'formShown', 'formFocus', 'formFocusOnce', 'formView', 'formSubmit', 'formError', 'formFieldError', 'slideshowClick', 'canadaBuildPrice',
        'mlpView', 'getDirections', 'mapShown', 'dynamicMapLoad', 'staticMapLoad', 'mapPlacesAutocomplete', 'socialShare', 'externalClick', 'formClick', 'canadaBPMessage',
        'fbLinkOpen', 'galleryThumbClick', 'galleryMainImageClick', 'galleryFullScreen', 'galleryOverlayThumbClick', 'saveVehicleButton', 'saveVehicle', 'removeSavedVehicle', 'garageView',
        'garageAdd', 'garageDelete', 'couponView', 'departmentLink', 'clearSearchBox', 'disclaimerBlockClick', 'galleryArrowClick', 'downloadFile',
        'couponClick', 'couponCtaButton', 'couponPrintButton', 'couponSuccessSend', 'vehiclePrintButton', 'weeklyAdsDownload', 'drGetAssistance', 'socialTweet', 'similarVehicleButtons', 'disclaimerPriceClick',
        'drSaveFinishLater', 'drCompletedDeal', 'drLaunch', 'vehicleQuickViewButton', 'gridViewButton', 'socialComment', 'offerSlide', 'searchBoxFiltersClick',
        'inventorySortButton', 'inventoryButtons', 'inventoryVehicleClick', 'moreImagesButton', 'pageBottom', 'adjustCredit', 'updatePricing', 'customizePayment', 'offerView',
        'equipmentClick', 'callFromForm', 'adjustTermLength', 'adjustDown', 'showMoreFeatures', 'featureSelect', 'announcementView', 'announcementClick', 'priceDetails',
        'offerDetailsClick', 'priceAlertRequest', 'showPaymentConfiguration', 'updatePaymentConfiguration', 'navigationClick', 'offerClick', 'customClick', 'internalClick',
        'getOfferClick', 'offerPrintButton', 'mapInteraction', 'shareFormSubmit', 'shareFormOpen', 'shareFormFocusOnce', 'shareFormFocus', 'socketTalkFirstOpen', 'socketTalkSuccessSubmit',
        'videoStart', 'videoWatch', 'videoComplete', 'openPrecisePrice',
    ];

    /**
     * @inheritDoc
     */
    this.init = function() {
        this.signOnEvents();
        Moff.event.on('dsa.pageView', () => this.sendPageView());
    };

    /**
     * Signs on dsa standard events
     *
     * @method signOnEvents
     * @private
     */
    this.signOnEvents = function() {
        for (let i = 0, {
                length
            } = _events; i < length; i++) {
            const event = _events[i];

            Moff.event.on(`${NAMESPACE}.${event}`, (args = {}) => this.handleEvent(event, this.normalizeData(args)));
        }
    };

    /**
     * Handles and prepare events
     *
     * @method handleEvent
     * @param {String} event - event name
     * @param {Object} data - events data
     */
    this.handleEvent = function(event, data) {
        let provider = this.eventsMap[event];

        if (provider) {
            let providerEvent = provider.event;

            let providerData = {};

            if (Array.isArray(provider.accept)) {
                for (let i = 0, {
                        length
                    } = provider.accept; i < length; i++) {
                    const objName = provider.accept[i];

                    if (data.hasOwnProperty(objName)) {
                        providerData[objName] = this.converter.convert(objName, data[objName], event, data);
                    }
                }
            }

            if (this.handler.hasHandler(event)) {
                const handlerResult = this.handler.handle(event, {
                    event,
                    data,
                    providerData,
                    providerEvent,
                    provider,
                });

                if (!handlerResult) {
                    return;
                }

                ({
                    providerEvent,
                    providerData,
                    provider
                } = handlerResult);
            }

            this.sendAnalyticsData(provider, providerEvent, providerData);
        }
    };

    /**
     * Send handled data to analytics
     *
     * @method sendAnalyticsData
     * @param {Object} provider - provider object
     * @param {String} providerEvent - provider event
     * @param {Object} providerData - provider handled data
     */
    this.sendAnalyticsData = function(provider, providerEvent, providerData) { // eslint-disable-line no-unused-vars
        throw new Error('sendAnalyticsData method must be overwritten');
    };

    /**
     * Sends pageview
     *
     * @method sendPageView
     */
    this.sendPageView = function() {
        throw new Error('sendPageView method must be overwritten');
    };

    /**
     * Returns normalized data
     *
     * @method normalizeData
     * @param {{}} args - data to normalize
     * @returns {{}} normalized data
     */
    this.normalizeData = function(args) {
        const data = {};
        const dataLayer = Moff.modules.get('DataLayer');

        if (Array.isArray(args.links)) {
            args.links.forEach(objectName => {
                const obj = dataLayer.findData(objectName);

                if (obj !== null) {
                    data[dataLayer.normalizeDataName(objectName)] = obj;
                }
            });
        }

        if (args.data) {
            $.extend(true, data, args.data);
        }

        return data;
    };
});
Moff.modules.initByConfig('BaseAnalyticsTheme1');