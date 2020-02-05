// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
/**
 * Analytics Converter
 * @module BaseConverter
 */
// lint js_unique_name_placeholder disable
Moff.modules.create('BaseConverter', function() {
    'use strict';

    /**
     * @property {Object} - store of object converters
     */
    this.converters = {};

    /**
     * Converts data
     *
     * @method convert
     * @param {String} dataName - name of data
     * @param {Array} data - data
     * @returns {Object} converted data
     */
    this.convert = function(dataName, ...data) {
        if (!this.converters.hasOwnProperty(dataName)) {
            throw new Error(`${dataName} converter is not defined`);
        }

        return this.converters[dataName].call(this, ...data);
    };

    /**
     * Gets range values
     *
     * @method getFilterRangeValues
     * @param {String|Array} value - value to be processed
     * @returns {*[]}
     */
    this.getFilterRangeValues = function(value) {
        let result = [parseInt(value, 10), parseInt(value, 10)];

        if (typeof value === 'string' && value) {
            const valueArr = value.split(',');

            for (let i = 0, {
                    length
                } = valueArr; i < length; i++) {
                valueArr[i] = valueArr[i] === '' ? null : parseInt(valueArr[i], 10);
            }

            return valueArr;
        }

        if (Array.isArray(value)) {
            result = value.length ?
                [Math.min(...value), Math.max(...value)] :
                [null, null];
        }

        return result;
    };

    /**
     * Filters object by allowed properties
     *
     * @method filterByAllowedProps
     * @param {Object} originObj - origin object to be filtered
     * @param {Array} allowedProps - allowed properties
     * @returns {{}} Filtered object
     * @private
     */
    this.filterByAllowedProps = function(originObj, allowedProps) {
        const obj = {};

        if (!Array.isArray(allowedProps)) {
            throw new Error('allowedProps should be array');
        }

        allowedProps.forEach(prop => {
            if (originObj.hasOwnProperty(prop)) {
                obj[prop] = originObj[prop];
            }
        });

        return obj;
    };

    /**
     * Converts object by map
     * @param {Object} originObj - object which we want convert
     * @param {Object} map - map in this format {
     *     originProp: 'newNameForProp',
     *     anotherProp: (dataFromAnotherProp, originObj) => ({ newNameForAnotherProp: +dataFromAnotherProp })
     * }
     * When you set property in map like string it will rename
     * When you set it like function result of this function will returned and will merge to result object
     * @returns {Object}
     */
    this.convertByMap = function(originObj, map) {
        const obj = {};

        Object.keys(originObj || {}).forEach(prop => {
            if (map.hasOwnProperty(prop)) {
                if (typeof map[prop] === 'function') {
                    $.extend(obj, map[prop](originObj[prop], originObj));
                } else {
                    obj[map[prop]] = originObj[prop];
                }
            } else {
                obj[prop] = originObj[prop];
            }
        });
        return obj;
    };
});
Moff.modules.initByConfig('BaseConverter');