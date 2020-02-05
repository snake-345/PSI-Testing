// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
/**
 * Analytics Handler
 * @module BaseHandler
 */
// lint js_unique_name_placeholder disable
Moff.modules.create('BaseHandler', function() {
    'use strict';

    /**
     * @property {Object} - store of object handlers
     */
    this.handlers = {};

    /**
     * Handles data
     *
     * @method convert
     * @param {String} handlerName - name of handler
     * @param {Object} data - data
     * @returns {Object} handled data
     */
    this.handle = function(handlerName, data) {
        if (!this.hasHandler(handlerName)) {
            throw new Error(`${handlerName} handler is not defined`);
        }

        const clonedData = $.extend(true, {}, data);

        return this.handlers[handlerName](clonedData);
    };

    /**
     * Checks whether handler exist
     *
     * @method hasHandler
     * @param {String} handlerName - handler name
     * @returns {Boolean}
     */
    this.hasHandler = function(handlerName) {
        return this.handlers.hasOwnProperty(handlerName);
    };
});
Moff.modules.initByConfig('BaseHandler');