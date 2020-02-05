// import '../../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../../assets/javascripts/global.es6.js';
// import '../base-analytics.es6.js';
/**
 * Live Analytics System
 * @module LiveAnalytics
 */
// lint js_unique_name_placeholder disable
Moff.modules.create('LiveAnalytics', function() {
    'use strict';

    /**
     * @inheritDoc
     */
    this.eventsMap = {
        inventorySearch: {
            event: 'Vehicle.Search',
            accept: ['FilterObject', 'VehicleListArray'],
        },
        vehicleView: {
            event: 'Vehicle.View',
            accept: ['VehicleObject'],
        },
        liveSearch: {
            event: 'Vehicle.LiveSearch',
            accept: ['Keyword'],
        },
        formView: {
            event: 'Form.View',
            accept: ['FormObject', 'VehicleObject'],
        },
        formError: {
            event: 'Form.Error',
            accept: ['FormObject', 'VehicleObject'],
        },
        formSubmit: {
            event: 'Form.Submit',
            accept: ['FormObject', 'LeadObject', 'VehicleObject'],
        },
        dynamicMapLoad: {
            event: 'GoogleMap.View',
            accept: ['GoogleMapObject'],
        },
        staticMapLoad: {
            event: 'GoogleMap.View',
            accept: ['GoogleMapObject'],
        },
    };

    /**
     * @inheritDoc
     */
    this.init = function(...args) {
        this.constructor.prototype.init.apply(this, args);

        window._dfaq = window._dfaq || [];
    };

    /**
     * @inheritDoc
     */
    this.sendPageView = function() {
        window._dfaq.push(['trackPageView']);
    };

    /**
     * @inheritDoc
     */
    this.sendAnalyticsData = function(provider, providerEvent, providerData) {
        const [category, action] = providerEvent.split('.');

        window._dfaq.push(['trackEvent', category, action, providerData]);
    };
}, Moff.modules.getClass('BaseAnalyticsTheme1').constructor);
Moff.modules.initByConfig('LiveAnalytics');