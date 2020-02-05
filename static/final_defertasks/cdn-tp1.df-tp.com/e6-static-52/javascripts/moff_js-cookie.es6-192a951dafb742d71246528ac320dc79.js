/**
 * Cookie manager.
 * @module Cookie
 */
(function() {
    'use strict';

    const CookieConstructor = function() {
        /**
         * Get cookie
         * @method get
         * @param {string} name - cookie name
         * @returns {string} Cookie value
         */
        this.get = function(name) {
            const matches = document.cookie.match(new RegExp(
                `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
            ));

            return matches ? decodeURIComponent(matches[1]) : undefined;
        };

        /**
         * Set cookie
         * @method set
         * @param {string} name - cookie name
         * @param {string} value - cookie value
         * @param {object} options - different options
         * @param {number} options.expires - How many seconds to expire the cookie
         * @param {date} options.expires - When cookie expire
         * @param {string} options.path - Cookie path
         * @param {string} options.domain - Cookie domain
         * @param {boolean} options.secure - If true cookie will sent only on secure connection
         */
        this.set = function(name, value, options = {}) {
            let updatedCookie;

            let {
                expires
            } = options;

            if (typeof expires === 'number' && expires) {
                const date = new Date();

                date.setTime(date.getTime() + expires * 1000);
                options.expires = date; // eslint-disable-line no-param-reassign
                ({
                    expires
                } = options);
            }

            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString(); // eslint-disable-line no-param-reassign
            }

            value = encodeURIComponent(value); // eslint-disable-line no-param-reassign
            updatedCookie = `${name}=${value}`;

            Object.keys(options).forEach(prop => {
                const propValue = options[prop];

                updatedCookie += `; ${prop}`;
                if (propValue !== true) {
                    updatedCookie += `=${propValue}`;
                }
            });

            document.cookie = updatedCookie;
        };

        /**
         * Delete cookie
         * @method delete
         * @param {string} name - cookie name
         */
        this.delete = function(name) {
            const options = {
                expires: -1,
            };

            // For testing purposes
            if (location.hostname === 'localhost') {
                options.path = '/';
            }

            this.set(name, '', options);
        };
    };

    Moff.cookie = new CookieConstructor();
}());