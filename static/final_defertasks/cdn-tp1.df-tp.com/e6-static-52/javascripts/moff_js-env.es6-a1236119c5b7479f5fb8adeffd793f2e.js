/**
 * Global environment variables
 */
(function() {
    'use strict';

    /**
     * Environment variables storage
     * @property {{container: String, isPreview: Boolean}} ENV_STORAGE
     * @private
     */
    const _storage = {
        type: null,
        layout: null,
        isPreview: null,
        isMetric: null,
    };

    Moff.ENV = {
        /**
         * ENV variable getter
         * @param {String|Null} key
         * @returns {*} - Full config or value by key
         */
        get(key = null) {
            if (key !== null && !_storage.hasOwnProperty(key)) {
                return null;
            }

            return key === null ? $.extend({}, _storage) : _storage[key];
        },

        /**
         * ENV variables setter
         * @param {Object} config
         */
        set(config) {
            if (!$.isPlainObject(config)) {
                throw new Error('Config should be Plain Object');
            }

            Object.keys(config).forEach(key => {
                if (!_storage.hasOwnProperty(key)) {
                    throw new Error(`Undeclared ENV variable "${key}"`);
                }

                if (_storage[key] === null) {
                    _storage[key] = config[key];
                }
            });
        },
    };
}());