/**
 * Ajax manager.
 * @module AjaxSystem
 */
(function() {
    'use strict';

    const AjaxSystemConstructor = function() {
        const _ajaxSystem = this;
        const _xhrStorage = {};
        const _callbacks = {};
        const _errorClass = 'js-ajax-system-error';

        let _ajaxErrorMessage,
            _baseUrl;

        /**
         * Setup global data type for ajax requests.
         * @method init
         */
        this.init = function() {
            _ajaxErrorMessage = window.ajaxErrorMessage;
            delete(window.ajaxErrorMessage);
            window.addEventListener('popstate', event => {
                if (event.state // Check that event has state wich will be used in ajaxSystem
                    &&
                    event.state.popState // Check that request should requested on popState event
                    &&
                    event.state.timestamp !== window.localStorage.getItem('lastAjaxWithPopState')) { // And check that request won't made second time
                    this.request(event.state);
                }
            });
        };

        /**
         * Adds callbacks which use for get data from modules
         * @method addGetDataCallback
         * @param {array} on - callback will be run on this events
         * @param {function} callback - function which should return array of data
         */
        this.addGetDataCallback = function(on, callback) {
            on.forEach(event => {
                _callbacks[event] = initEventStorage(_callbacks[event]);
                _callbacks[event].getData.push(callback);
            });
        };

        /**
         * Adds callbacks which will be run on ajax success
         * @method addSuccessCallback
         * @param {number} id - module id
         * @param {array} on - callback will be run on this events
         * @param {function} callback - function which recieves ajax result and processes it
         */
        this.addSuccessCallback = function(id, on, callback) {
            on.forEach(event => {
                _callbacks[event] = initEventStorage(_callbacks[event]);
                _callbacks[event].success[id] = callback;
            });
        };

        /**
         * Add functions which runs before and after ajax
         * @method addPreloader
         * @param {number} id - module id
         * @param {array} on - events list
         * @param {function} showCallback - function which runs before ajax
         * @param {function} hideCallback - function which runs after ajax
         */
        this.addPreloader = function(id, on, showCallback, hideCallback) {
            on.forEach(event => {
                _callbacks[event] = initEventStorage(_callbacks[event]);
                _callbacks[event].preloader[id] = {
                    show: showCallback,
                    hide: hideCallback,
                };
            });
        };

        this.showPreloader = function(scope, isUpper = false) {
            const module = $(scope);
            const moduleHeight = module.height();
            const windowHeight = window.innerHeight;
            const moduleTop = module.offset().top;
            const moduleBottom = moduleTop + module.height();

            let preloaderCircle,
                preloaderCircleHeight;

            if (!module.hasClass('module-preloader')) {
                module
                    .addClass('module-preloader')
                    .append(`<div class="module-preloader_locker ${isUpper ? '__upper' : ''} js-module-preloader-locker">
						<div class="module-preloader_overlay"></div>
						<div class="module-preloader_circle js-module-preloader-circle${moduleHeight < 100 ? ' __small' : ''}${Moff.detect.browser.msie ? ' __ie' : ''}">
							<svg class="preloader" width="${moduleHeight < 100 ? '25px' : '50px'}"
								height="${moduleHeight < 100 ? '25px' : '50px'}"
								viewbox="0 0 50 50">
								<circle class="preloader_background-circle" cx="25" cy="25" r="21px"></circle>
								<circle class="preloader_animated-circle" cx="25" cy="25" r="21px"></circle>
								<polyline class="preloader_checkmark" points="15,25 24,35 35,15"></polyline>
							</svg>
						</div>
					</div>`);
                preloaderCircle = module.find('.js-module-preloader-circle');
                preloaderCircleHeight = preloaderCircle.outerHeight();

                setTop();
                $(window).on('scroll.preloader', setTop);
            }

            function setTop() {
                const scrollTop = window.pageYOffset;
                const scrollBottom = scrollTop + windowHeight;
                const viewport = Math.max(Math.min(moduleBottom, scrollBottom), moduleTop) - Math.min(Math.max(moduleTop, scrollTop), moduleBottom);
                const top = Math.min(Math.max(Math.max(scrollTop - moduleTop, 0) + viewport / 2, 25), moduleHeight - preloaderCircleHeight / 2);

                preloaderCircle.css('top', top);
            }
        };

        this.hidePreloader = function(scope) {
            $(window).off('scroll.preloader');
            $(scope)
                .removeClass('module-preloader')
                .find('.js-module-preloader-locker:last').remove();
        };

        /**
         * Method uniting methods: addGetDataCallback, addSuccessCallback, addPreloader
         * @methos register
         * @param {object} callbacks - object contains callbacks. For example {
         *     moduleId: 11,
         *     getDataCallbacks: [
         *         {
         *             on: ['search', 'filtering'],
         *             callback: function() { return []; }
         *         },
         *         {
         *             on: ['sorting'],
         *             callback: function() { return []; }
         *         }
         *     ],
         *     successCallbacks: [
         *         {
         *             on: ['search', 'filtering', 'sorting'],
         *             callback: function(data) { $('body').append(data); }
         *         }
         *     ],
         *     preloaders: [
         *         {
         *             on: ['search', 'filtering'],
         *             show: function() { $('body').css('opacity', 0.5); },
         *             hide: function() { $('body').css('opacity', 1); }
         *         },
         *         {
         *             on: ['soring'],
         *             show: function() { $('body').addClass('loading') },
         *             hide: function() { $('body').removeClass('loading') },
         *         }
         *     ]
         * }
         */
        this.register = function(callbacks) {
            if (callbacks.getDataCallbacks) {
                callbacks.getDataCallbacks.forEach(args => this.addGetDataCallback(args.on, args.callback));
            }

            if (callbacks.successCallbacks) {
                callbacks.successCallbacks.forEach(args => this.addSuccessCallback(callbacks.moduleId, args.on, args.callback));
            }

            if (callbacks.preloaders) {
                callbacks.preloaders.forEach(args => this.addPreloader(callbacks.moduleId, args.on, args.show, args.hide));
            }
        };

        /**
         * Make ajax request.
         * @method request
         * @param {object} params - Contains parameters.
         * @param {string} params.baseUrl - Base url for request.
         * @param {string} params.event - Event name.
         * Other modules can give their data and update self by its event if it registered callbacks on this event.
         * @param {string} params.action - Action name which transmitted to backend.
         * @param {array} params.data - Array of objects with properties: name, value. It's data sent to backend by get request.
         * @param {array} params.postData - Array of objects with properties: name, value. It's data sent to backend by post request.
         * @param {object} params.preloader - Object with two methods: show, hide. It's methods will be called before and after ajax request.
         * @param {function} params.success - Function which will be called on ajax success. Recieve ajax response.
         * @param {function} params.error - Function which will be called on ajax error.
         * @param {boolean} params.pushState - Default: true. Save this request in history or not.
         * @param {boolean} params.popState - Default: true. Should handle pop state event or not.
         * @param {boolean} params.preventRequest - Default: false. Need prevent previous request or not.
         * @param {string} params.timestamp - when request was finished. Sets automatically.
         */
        this.request = function(params) {
            const normalizedParams = normalizeParams(params);
            const type = normalizedParams.postData.length ? 'POST' : 'GET';
            const url = this.createURL(normalizedParams);
            const data = normalizedParams.postData.filter(element => element.value !== '');

            preloaders(normalizedParams, 'show');

            if (normalizedParams.preventRequest) {
                if (!normalizedParams.historyUrl && normalizedParams.event && _xhrStorage[normalizedParams.event]) {
                    _xhrStorage[normalizedParams.event].abort();
                } else if (_xhrStorage.otherRequest) {
                    _xhrStorage.otherRequest.abort();
                }
            }

            const xhr = $.ajax({
                type,
                url,
                data,
                dataType: 'json',

                success: json => {
                    if (typeof json === 'object') {
                        successHandler(normalizedParams, json);
                        preloaders(normalizedParams, 'hide');
                        _ajaxSystem.changeCanonical({
                            canonical: json.canonical,
                            prev: json.prev,
                            next: json.next,
                        });
                        changeNoIndex(json.noindex);

                        if (normalizedParams.popState) {
                            normalizedParams.timestamp = normalizedParams.timestamp || Date.now().toString();
                            window.localStorage.setItem('lastAjaxWithPopState', normalizedParams.timestamp);
                        }

                        pushState(json.url, url, json.title, normalizedParams);
                        $('body').append(json.javascript);
                        Moff.event.trigger('ajaxSystem:success');
                        Moff.event.trigger(`ajaxSystem.${normalizedParams.event}:success`);
                    } else {
                        errorHandler(normalizedParams);
                        Moff.event.trigger(`ajaxSystem.${normalizedParams.event}:error`);
                    }
                },
                error: errorXhr => {
                    if (errorXhr.statusText !== 'abort') {
                        errorHandler(normalizedParams);
                        Moff.event.trigger('ajaxSystem:error');
                        Moff.event.trigger(`ajaxSystem.${normalizedParams.event}:error`);
                    }
                },
            });

            if (params.preventRequest) {
                if (!params.historyUrl && params.event && _xhrStorage[params.event]) {
                    _xhrStorage[params.event] = xhr;
                } else {
                    _xhrStorage.otherRequest = xhr;
                }
            }
        };

        /**
         * Creates URL for ajax from modules params.
         * @method createURL
         * @param {object} params - parameters object
         * @returns {string} New generated URL
         */
        this.createURL = function(params) {
            let modulesId,
                url;
            const urlComponents = [];

            if (params.historyUrl) {
                return params.historyUrl;
            }

            const normalizedParams = normalizeParams(params);
            const data = getData(normalizedParams);

            url = normalizedParams.baseUrl + (normalizedParams.baseUrl.indexOf('?') === -1 ? '?' : '&');

            if (normalizedParams.event && _callbacks[normalizedParams.event]) {
                modulesId = Object.keys(_callbacks[normalizedParams.event].success);

                if (normalizedParams.moduleId && modulesId.indexOf(normalizedParams.moduleId.toString()) === -1) {
                    modulesId.push(normalizedParams.moduleId);
                }
            } else {
                modulesId = [normalizedParams.moduleId];
            }

            if (normalizedParams.action) {
                urlComponents.push(`_action=${encodeURIComponent(normalizedParams.action)}`);
            }

            urlComponents.push($.param(data.concat(normalizeArray('_modules', modulesId))));
            url += urlComponents.join('&');

            return url;
        };

        this.changeCanonical = function(links) {
            $.each(links, (type, link) => {
                const element = $(`head [rel="${type}"]`);

                if (link) {
                    if (element.length) {
                        element.attr('href', link);
                    } else {
                        $('head').append(`<link rel="${type}" href="${link}">`);
                    }
                } else if (element.length) {
                    element.remove();
                }
            });
        };

        function normalizeArray(name, array) {
            const result = [];
            const {
                length
            } = array;

            let i = 0;

            for (; i < length; i++) {
                result.push({
                    name: `${name}[]`,
                    value: array[i],
                });
            }

            return result;
        }

        function normalizeParams(params) {
            const {
                location
            } = window;
            const defaultParams = {
                pushState: true,
                popState: true,
                preventRequest: false,
                data: [],
                postData: [],
                baseUrl: _baseUrl || `${location.protocol}//${location.host}${location.pathname}${location.search}`,
            };

            const result = $.extend(defaultParams, params);

            if (!result.event) {
                result.event = generateHashString(JSON.stringify(stringifyFunctionsInObject(params)));
            }

            if (typeof result.success === 'function' && result.pushState) {
                _ajaxSystem.addSuccessCallback(result.moduleId, [result.event], result.success);
                delete(result.success);
            }

            if (result.preloader && typeof result.preloader.show === 'function' && typeof result.preloader.hide === 'function' && result.pushState) {
                _ajaxSystem.addPreloader(result.moduleId, [result.event], result.preloader.show, result.preloader.hide);
                delete(result.preloader);
            }

            return result;
        }

        function stringifyFunctionsInObject(obj) {
            const newObj = {};

            $.each(obj, (key, value) => {
                if ($.isPlainObject(value)) {
                    newObj[key] = stringifyFunctionsInObject(value);
                } else if ($.isFunction(value)) {
                    newObj[key] = value.toString();
                }
            });

            return newObj;
        }

        function generateHashString(str) {
            /* jshint ignore:start */
            const {
                length
            } = str;

            let hash = 0;

            let i = 0;

            let _char;

            if (str.length === 0) {
                return hash;
            }

            for (; i < length; i++) {
                _char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + _char;
                hash |= 0; // Convert to 32bit integer
            }

            return hash.toString();
            /* jshint ignore:end */
        }

        function initEventStorage(eventStorage) {
            const defaultStorage = {
                getData: [],
                success: {},
                preloader: {},
            };

            return $.extend(defaultStorage, eventStorage || {});
        }

        function getData(params) {
            let data = [];

            if (params.event && _callbacks[params.event]) {
                _callbacks[params.event].getData.forEach(callback => data = data.concat(callback()));
            }

            return data.concat(params.data).filter(element => element.value !== '');
        }

        function preloaders(params, action) {
            if (params.preloader !== false && params.event && _callbacks[params.event]) {
                const ids = Object.keys(_callbacks[params.event].success).filter(id => id !== 'undefined');
                const preloadersIds = Object.keys(_callbacks[params.event].preloader ? _callbacks[params.event].preloader : {});
                const preloadersObj = _callbacks[params.event].preloader;
                const preloadersCalled = {};

                if (ids.length > 1) {
                    _ajaxSystem[`${action}Preloader`]($('.container-global'), true);
                } else {
                    ids.forEach(id => {
                        if (typeof preloadersObj[id] === 'undefined') {
                            _ajaxSystem[`${action}Preloader`]($(Moff.modules.getById(id).scope));
                        } else if (typeof preloadersObj[id][action] === 'function') {
                            preloadersCalled[id] = true;
                            preloadersObj[id][action]();
                        }
                    });

                    preloadersIds.forEach(id => {
                        if (!preloadersCalled[id] && typeof preloadersObj[id][action] === 'function') {
                            preloadersObj[id][action]();
                        }
                    });
                }
            }

            if (params.preloader && typeof params.preloader[action] === 'function') {
                params.preloader[action]();
            }

            if (params.success && typeof params.preloader === 'undefined') {
                _ajaxSystem[`${action}Preloader`]($(Moff.modules.getById(params.moduleId).scope));
            }
        }

        function successHandler(params, response) {
            if (params.event && _callbacks[params.event]) {
                $.each(_callbacks[params.event].success, (id, callback) => {
                    callback(response[id]);
                });
            }

            if (typeof params.success === 'function') {
                params.success(response[params.moduleId]);
            }
        }

        function changeNoIndex(noindex) {
            const element = $('head [content="noindex"]');

            if (noindex && !element.length) {
                $('head').append('<meta name="robots" content="noindex">');
            } else if (!noindex && element.length) {
                element.remove();
            }
        }

        function errorHandler(params) {
            preloaders(params, 'hide');
            const errorEl = $(`<div class="ajax-system-error ${_errorClass}"><div class="ajax-system-error_inner">${_ajaxErrorMessage} <a href="#" class="ajax-system-error_close js-ajax-error-close">x</a></div></div>`).appendTo('body');

            errorEl.find('.js-ajax-try-again').on('click', event => {
                _ajaxSystem.request(params);
                errorEl.remove();
                event.preventDefault();
            });
            errorEl.find('.js-ajax-error-close').on('click', event => {
                errorEl.remove();
                event.preventDefault();
            });

            if (typeof params.error === 'function') {
                params.error();
            }
        }

        function pushState(newUrl, requestUrl, title, params) {
            if (!params.historyUrl && Moff.detect.history &&
                params.pushState !== false && newUrl !== window.location.pathname + window.location.search) {
                params.preventRequest = true; // eslint-disable-line no-param-reassign
                params.historyUrl = requestUrl; // eslint-disable-line no-param-reassign
                history.pushState(params, title, newUrl);
            }

            if (title && Moff.detect.history && params.pushState !== false) {
                document.title = title;
            }
        }
    };

    Moff.ajaxSystem = new AjaxSystemConstructor();
    Moff.ajaxSystem.init();
}());