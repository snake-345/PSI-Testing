/**
 * @class DataLayer
 */
Moff.modules.create('DataLayer', function() {
    /**
     * @property {Object} _store - store
     * @private
     */
    const _store = {};

    /**
     * Finds object by name from storage
     *
     * @method findData
     * @param {String} name - object name
     * @returns {Object|NULL}
     */
    this.findData = function(name) {
        let result = null;

        if (_store.hasOwnProperty(name)) {
            const prop = _store[name];

            // In case if prop is primitive value
            result = prop;

            // We should clone object to prevent modification of origin's one
            if ($.isPlainObject(prop)) {
                result = $.extend(true, {}, _store[name]);
            } else if (Array.isArray(prop)) {
                result = [...prop];
            }
        }

        return result;
    };

    /**
     * Pushes data into store
     *
     * @method pushData
     * @param {String} name - data name key
     * @param {*} data - data to be stored
     */
    this.pushData = function(name, data) {
        if (typeof name !== 'string') {
            throw new Error('Data Layer: Method pushData: name must be a string');
        }

        if (typeof data === 'undefined') {
            throw new Error('Data Layer: Method pushData: data is not defined');
        }

        _store[name] = data;
    };

    /**
     * Append data into store
     *
     * @method appendData
     * @param {String} name - data name key
     * @param {*} data - data to be stored
     */
    this.appendData = function(name, data) {
        if (typeof name !== 'string') {
            throw new Error('Data Layer: Method appendData: name must be a string');
        }

        if (typeof data === 'undefined') {
            throw new Error('Data Layer: Method appendData: data is not defined');
        }

        if (!Array.isArray(data)) {
            throw new Error('Data Layer: Method appendData: data should be an array');
        }

        if (!Array.isArray(_store[name]) && typeof _store[name] !== 'undefined') {
            throw new Error('Data Layer: Method appendData: data by this key should be an array or undefined');
        }

        if (typeof _store[name] === 'undefined') {
            _store[name] = data;
        } else {
            _store[name] = _store[name].concat(data);
        }
    };

    /**
     * Finds all objects by normalized name
     *
     * @method findByObjectName
     * @param {String} objName - needed object name
     * @returns {Array}
     */
    this.findByNormalizedObjectName = function(objName) {
        const result = [];

        Object.keys(_store || {}).forEach(obj => {
            if (this.normalizeDataName(obj) === objName) {
                result.push(this.findData(obj));
            }
        });

        return result;
    };

    /**
     * Normalizes data name
     *
     * @method _normalizeDataName
     * @param {String} name - data name in storage
     * @returns {String} normalized data name
     * @private
     */
    this.normalizeDataName = function(name) {
        return name.replace(/_.+/, '');
    };

    /**
     * Removes data by name
     * @param {String} name - Data name
     */
    this.removeData = function(name) {
        if (typeof name !== 'string') {
            throw new Error('Data Layer: Method removeData: name must be a string');
        }

        if (_store.hasOwnProperty(name)) {
            delete _store[name];
        }
    };
});

Moff.modules.initClass('DataLayer', {
    scopeSelector: 'body',
});