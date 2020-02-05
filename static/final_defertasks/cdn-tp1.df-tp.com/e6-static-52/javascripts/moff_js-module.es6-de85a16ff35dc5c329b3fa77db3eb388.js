/* eslint-disable no-param-reassign */
(function() {
    'use strict';

    Moff.Module.reopen({
        jsSelector: '.js-module',

        beforeInit() {
            if (window.e6Locale) {
                Moff.locale = window.e6Locale;
                delete(window.e6Locale);
            }
        },

        $find(selector) {
            return $(this.scope).find(selector);
        },

        ajaxAddGetDataCallback(on, callback) {
            Moff.ajaxSystem.addGetDataCallback(on, callback);
        },

        ajaxAddSuccessCallback(on, callback) {
            Moff.ajaxSystem.addSuccessCallback(this.id, on, callback);
        },

        ajaxAddPreloader(on, showCallback, hideCallback) {
            Moff.ajaxSystem.addPreloader(this.id, on, showCallback, hideCallback);
        },

        ajaxRegister(callbacks) {
            callbacks.moduleId = this.id;
            Moff.ajaxSystem.register(callbacks);
        },

        ajaxRequest(params) {
            params.moduleId = this.id;

            _setAjaxBaseUrl.call(this, params);
            Moff.ajaxSystem.request(params);
        },

        ajaxRequestWithoutId(params) {
            _setAjaxBaseUrl.call(this, params);
            Moff.ajaxSystem.request(params);
        },

        ajaxCreateURL(params) {
            params.moduleId = this.id;

            _setAjaxBaseUrl.call(this, params);

            return Moff.ajaxSystem.createURL(params);
        },

        afterCssLoaded(callback) {
            if (document.body.hasAttribute('data-css-loaded')) {
                setTimeout(() => callback());
                // callback();
            } else {
                // setTimeout for break long task on cssLoaded event
                document.body.addEventListener('cssloaded', () => setTimeout(callback));
            }
        },

        numberFormat(number, decimals, decPoint, thousandsSep) {
            number = (`${number}`).replace(/[^0-9+\-Ee.]/g, '');
            number = !isFinite(+number) ? 0 : +number;
            decimals = !isFinite(+decimals) ? 0 : Math.abs(decimals);
            thousandsSep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
            decPoint = (typeof decPoint === 'undefined') ? '.' : decPoint;

            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            const string = (decimals ? toFixedFix(number, decimals) : `${Math.round(number)}`).split('.');

            if (string[0].length > 3) {
                string[0] = string[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSep);
            }

            if ((string[1] || '').length < decimals) {
                string[1] = string[1] || '';
                string[1] += new Array(decimals - string[1].length + 1).join('0');
            }

            function toFixedFix(num, dec) {
                const modifier = 10 ** dec;

                return `${(Math.round(num * modifier) / modifier).toFixed(decimals)}`;
            }

            return string.join(decPoint);
        },

        updateView(html) {
            if (typeof html !== 'string' || $.trim(html) === '') {
                return;
            }

            $(this.scope).html(html);
        },

        updateViewOnSuccessAjaxEvent(eventName, callback) {
            const MODULE = this;

            this.ajaxAddSuccessCallback([eventName], html => {
                MODULE.updateView(html);

                if (typeof callback !== 'undefined') {
                    callback(html);
                }
            });
        },

        /**
         * Update view after getting Geo Position
         * @param {Boolean} afterPositionChanged - sending request after changing geo position
         * @param {Function} successCallback - callback on success Ajax response after getting Geo Position
         * @param {Function} errorCallback - callback on any errors while getting Geo Position or Ajax request
         */
        updateViewOnGetPosition({
            success: successCallback,
            error: errorCallback
        }) {
            const MODULE = this;
            const GEOLOCATION = Moff.modules.getByName('Geolocation')[0];

            this.ajaxAddSuccessCallback(['getPosition.viewUpdated'], data => {
                MODULE.updateView(data);
                successCallback(data);
            });
            Moff.event.once('getPosition.error', errorCallback);

            if (GEOLOCATION.getPositionPromise === null) {
                GEOLOCATION.getPosition()
                    .catch(() => {
                        Moff.event.trigger('getPosition.error');
                    })
                    .then(({
                        isChanged
                    }) => {
                        if (isChanged) {
                            Moff.ajaxSystem.request({
                                event: 'getPosition.viewUpdated',
                                preloader: false,
                                pushState: false,
                                error() {
                                    Moff.event.trigger('getPosition.error');
                                },
                            });
                        } else {
                            // If position has not changed
                            Moff.event.trigger('getPosition.error');
                        }
                    });
            }
        },
    });

    /**
     * Setting custom baseUrl (for AJAX requests in module) to params if it is exist in module data
     * @param {Object} params
     * @private
     */
    function _setAjaxBaseUrl(params) {
        if (typeof params.baseAjaxUrl === 'undefined' &&
            typeof this.data !== 'undefined' &&
            typeof this.data.baseAjaxUrl !== 'undefined') {
            params.baseUrl = this.data.baseAjaxUrl;
        }
    }
}());
/* eslint-enable no-param-reassign */