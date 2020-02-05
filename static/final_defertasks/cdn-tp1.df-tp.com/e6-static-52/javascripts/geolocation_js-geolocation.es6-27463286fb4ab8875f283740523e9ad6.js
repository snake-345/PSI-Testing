/**
 * @module Geolocation
 */
Moff.modules.create('Geolocation', function() {
    'use strict';

    const _MODULE = this;

    /**
     * Distance between old and new positions, when need to update location
     * @type {number}
     */
    this.distanceOfChange = 100;

    /**
     * Is geolocation is pending
     * @type {boolean}
     */
    this.getPositionPromise = null;

    /**
     * Check if browser support Geolocation API
     * @return {boolean}
     */
    this.isGeolocationSupports = function() {
        return !!navigator.geolocation;
    };

    /**
     * Getting Geolocation coordinates from Cookie
     * @return {null}
     */
    this.getCachedPosition = function() {
        const cachedPosition = Moff.cookie.get('geolocation');

        return typeof cachedPosition !== 'undefined' && cachedPosition !== null ?
            JSON.parse(cachedPosition) :
            null;
    };

    /**
     * Promise for getting current position by browser Geolocaion API
     * @return {Promise.<Object|Null>} - coordinates of current position
     * @example
     * 	this.getPosition()
     * 		.then(({latitude, longitude, isChanged}) => {
     * 	  		...
     * 		})
     * 	  	.catch((error) => {
     * 			...
     * 		});
     */
    this.getPosition = function() {
        const self = this;

        if (this.getPositionPromise !== null) {
            return this.getPositionPromise;
        }

        return this.getPositionPromise = new Promise((resolveCallback, rejectCallback) => {
            if (!_MODULE.isGeolocationSupports()) {
                _getPositionError(
                    new Error('Geolocation is not supported by your browser'),
                    rejectCallback
                );

                return;
            }

            navigator.geolocation.getCurrentPosition(({
                coords
            }) => {
                self.getPositionPromise = null;
                _getPositionSuccess(coords, resolveCallback);
            }, error => {
                self.getPositionPromise = null;
                _getPositionError(error, rejectCallback);
            }, {
                enableHighAccuracy: true,
            });
        });
    };

    /**
     * Check if location changed by new position
     * @param {Number} latitude
     * @param {Number} longitude
     * @param {Number} accuracy
     * @return {boolean}
     */
    this.isLocationChanged = function({
        latitude,
        longitude,
        accuracy = 20
    }) {
        const cachedPosition = _MODULE.getCachedPosition();

        if (typeof cachedPosition === 'undefined' || cachedPosition === null) {
            return true;
        }

        const distance = _MODULE.getDistance({
            latitude: cachedPosition.latitude,
            longitude: cachedPosition.longitude
        }, {
            latitude,
            longitude
        });

        return (distance - _MODULE.distanceOfChange) > accuracy;
    };

    /**
     * Getting distance between 2 points in metres
     * see mathforum.org/library/drmath/view/51879.html for derivation and http://www.movable-type.co.uk/scripts/latlong.html for samples
     * @param {Number} lat1 - latitude of first point
     * @param {Number} lon1 - longitude of first point
     * @param {Number} lat2 - latitude of second point
     * @param {Number} lon2 - longitude of second point
     * @return {number}
     */
    this.getDistance = function({
        latitude: lat1,
        longitude: lon1
    }, {
        latitude: lat2,
        longitude: lon2
    }) {
        const planetRadius = 6371e3;
        const f1 = _toRadians(lat1);
        const l1 = _toRadians(lon1);
        const f2 = _toRadians(lat2);
        const l2 = _toRadians(lon2);
        const df = f2 - f1;
        const dl = l2 - l1;
        const a = Math.sin(df / 2) * Math.sin(df / 2) +
            Math.cos(f1) * Math.cos(f2) *
            Math.sin(dl / 2) * Math.sin(dl / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return planetRadius * c;
    };

    /**
     * @param {Number} number
     * @return {number}
     * @private
     */
    function _toRadians(number) {
        return number * Math.PI / 180;
    }

    /**
     * Callback on success getting position
     * @param {Object} coordinates
     * @param {Function} successCallback
     */
    function _getPositionSuccess(coordinates, successCallback) {
        const isChanged = _MODULE.isLocationChanged(coordinates);
        const position = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            isChanged,
        };

        if (isChanged) {
            _setCookiePositionParams({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            });
        }

        successCallback(position);
    }

    /**
     * Callback on fail getting position
     * @param {Object} error
     * @param {Function} errorCallback
     */
    function _getPositionError(error, errorCallback) {
        _setCookiePositionParams(null);

        errorCallback(error);

        if (error instanceof Error) {
            throw error;
        }
    }

    /**
     * Setting cookie for current position
     * @param {Object|Null} position - the position of the device on Earth, as well as the accuracy with which these properties are calculated
     * @private
     */
    function _setCookiePositionParams(position) {
        let positionStr = position;

        if ($.isPlainObject(position)) {
            positionStr = JSON.stringify(position);
        }

        Moff.cookie.set('geolocation', positionStr, {
            expires: 60 * 60 * 24 * 365,
            path: '/',
        });
    }
});

Moff.modules.initClass('Geolocation', {
    scopeSelector: 'body',
});