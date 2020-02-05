(function() {
    var docEl = document.documentElement;
    var config = window.precisePrice ? window.precisePrice.config : {};
    var scrollTop = 0;
    var clientType = '3rdParty';
    var responseTimeout = 35000;
    var screenMedium = 992;
    var isOldBrowser = !window.CustomEvent;
    var isPopupClosing = false;
    var isFirstRun = true;
    var isIframeLoadedCorrectly = false;
    var isPPReady = false;
    var errorMessages = {
        titles: {
            timeout: 'Precise Price is temporarily timed out.',
            website: 'Precise Price is currently not available.',
            vehicle: 'Precise Price is currently not available.'
        },
        messages: {
            timeout: 'You might be able to fix the issue by exiting out and reopen the page. If it\'s not fixed, it might be because someone spilled coffee on it :) We\'ll get that fixed quickly so please shop around a little and try again in a few minutes.',
            website: 'Please contact support to check the connection. Sorry for the inconvenience.',
            vehicle: 'This vehicle is temporarily not supported by Precise Price. Please contact support. Sorry for the inconvenience.'
        },
        exit: 'EXIT'
    };
    var selectors = {
        widget: 'pp-widget',
        widgetInitialized: 'pp-widget-initialized',
        overlay: 'pp-overlay',
        popup: 'pp-popup',
        showPopup: 'pp-show-popup',
        hidePopup: 'pp-hide-popup',
        iframe: 'pp-iframe',
        loader: 'pp-loader',
        loading: 'pp-loading',
        active: 'pp-active',
        error: 'pp-error'
    };
    var sendingParams = {};
    var defaultMargin = '';
    var css,
        overlay,
        popup,
        iframe,
        loader,
        error,
        sendingData,
        responseTimer,
        iframeTimer,
        prevWindowWidth,
        startTime,
        destroyTimer;

    config.apiUrl = 'https://dr-api-third-party-endpoint-tp18.df-tp.com/';

    if (isOldBrowser) {
        showWarning('browser');

        return;
    }

    window.precisePrice = {
        openPopup: openPopup,
        closePopup: closePopup,
        getIframe: getIframe,
        getConfig: function() {
            return config;
        },
        sendRequest: sendRequest,
        getMonthlyPayment: getMonthlyPayment,
        beforeIframeRemove: sendAnalytics,
        removeClass: removeClass,
        numberFormat: numberFormat,
        checkUrlError: checkUrlError
    };

    try { // IE9+ CustomEvent support
        new CustomEvent('IE9');
    } catch (e) {
        window.CustomEvent = function(event, params) {
            var evt;

            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

            return evt;
        };

        CustomEvent.prototype = Object.create(window.Event.prototype);
    }

    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    function openPopup(params) {
        var scrollBarWidth = window.innerWidth - docEl.clientWidth;

        sendingParams = {};

        if (!(params && (params.writeupId || params.vdpUrl && (params.vehicleVin || params.entryPoint)))) {
            showWarning('params');

            return;
        }

        if (document.body.contains(popup)) {
            if (isPopupClosing) {
                clearTimeout(destroyTimer);
                removePopup();
            } else {
                showWarning('opened');

                return;
            }
        }

        isIframeLoadedCorrectly = false;
        isPPReady = false;

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                sendingParams[key] = params[key];
            }
        }

        overlay = createElement({
            type: 'div',
            className: selectors.overlay + ' ' + selectors.hidePopup
        });

        popup = createElement({
            type: 'div',
            className: selectors.popup
        });

        createIframe(params);
        createLoader();

        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        scrollTop = docEl.scrollTop;
        defaultMargin = docEl.style.marginRight;

        overlay.style.cssText = 'display:block;';
        overlay.offsetHeight;
        overlay.className += ' pp-overlay-visible';

        popup.style.cssText = 'display:block;';
        popup.offsetHeight;
        popup.className += ' pp-popup-visible ' + selectors.loading;

        docEl.className += ' ' + selectors.active;
        docEl.style.marginRight = scrollBarWidth + 'px';

        startTime = new Date().getTime();

        responseTimer = setTimeout(function() {
            showError('timeout');
        }, responseTimeout);
    }

    function createIframe(params) {
        if (iframe && iframe.parentNode === popup) {
            popup.removeChild(iframe);
        }

        iframe = createElement({
            type: 'iframe',
            className: selectors.iframe,
            attr: {
                scrolling: 'no',
                src: getIframeUrl(params)
            }
        });

        iframe.onload = iframeLoadHandler;
        popup.appendChild(iframe);
    }

    function createLoader() {
        if (loader && loader.parentNode === popup) {
            popup.removeChild(loader);
        }

        loader = createElement({
            type: 'div',
            innerHTML: '<svg viewBox="25 25 50 50"' + (config.styleVariables && config.styleVariables.primaryColor ? (' style="color:' + config.styleVariables.primaryColor + '"') : '') + '>' +
                '<circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>' +
                '</svg>' +
                '<div class="pp-loader-text pp-loader-text-1">Now loading...</div>' +
                '<div class="pp-loader-text pp-loader-text-2">Use this tool to calculate a precise price and payment.</div>' +
                '<div class="pp-loader-text pp-loader-text-3">Taxes and fees included!</div>',
            className: selectors.loader
        });

        popup.appendChild(loader);
    }

    function getIframeUrl(params) {
        var url = config.apiUrl + 'loader?apiKey=' + config.apiKey;
        var urlParams = '?clientType=' + clientType + '&apiKey=' + config.apiKey + (params.vehicleVin ? '&vin=' + params.vehicleVin : '');

        if (params.entryPoint === 'trade-in' || params.entryPoint === 'test-drive') {
            url = config.apiUrl + 'website/' + params.entryPoint + urlParams;
        }

        return url;
    }

    function iframeLoadHandler() {
        iframeTimer = setTimeout(function() {
            if (!isIframeLoadedCorrectly) {
                showError('website');
            }
        }, 1000);
    }

    function closePopup() {
        clearTimeouts();

        if (docEl.className.match(selectors.active)) {
            removeClass(docEl, selectors.active);
            docEl.style.marginRight = defaultMargin;
        }

        if (scrollTop && window.innerWidth < screenMedium) {
            docEl.scrollTop = scrollTop;
        }

        if (overlay instanceof Element) {
            overlay.className = selectors.overlay + ' ' + selectors.hidePopup;
        }

        if (isPopupExists()) {
            isPopupClosing = true;
            popup.className = selectors.popup;

            destroyTimer = setTimeout(function() {
                removePopup();
            }, 1000);
        }

        document.dispatchEvent(new CustomEvent('ppClose', {
            bubbles: true
        }));
    }

    function clearTimeouts() {
        clearTimeout(responseTimer);
        clearTimeout(iframeTimer);
    }

    function removePopup() {
        isPopupClosing = false;

        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }

        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    }

    function getIframe(params) {
        sendingParams = {};

        if (!(params && (params.writeupId || params.vdpUrl && (params.vehicleVin || params.entryPoint)))) {
            showWarning('params');

            return;
        }

        isIframeLoadedCorrectly = false;

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                sendingParams[key] = params[key];
            }
        }

        iframe = createElement({
            type: 'iframe',
            className: selectors.iframe,
            attr: {
                scrolling: 'no',
                src: getIframeUrl(params)
            }
        });

        iframe.onload = iframeLoadHandler;

        startTime = new Date().getTime();

        return iframe;
    }

    function init() {
        var params = parseLocation();

        if (!config.apiKey) {
            showWarning('params');

            return;
        }

        css = createElement({
            type: 'link',
            attr: {
                id: 'precise-price-css',
                href: 'https://cdn-tp1.df-tp.com/preciseprice-tp18/launcher/css/pp.css',
                rel: 'stylesheet'
            }
        });

        css.onload = function() {
            if (config.isParseHash !== false && params) {
                openPopup(params);
            }
        };

        prevWindowWidth = window.innerWidth;
        document.head.appendChild(css);
        collectRecentlyViewedVehicles();
        handleEvents();
        initWidgets();
        warmUpCache();

        document.dispatchEvent(new CustomEvent('ppReady', {
            bubbles: true,
            detail: params
        }));
    }

    function isPopupExists() {
        return popup instanceof Element;
    }

    function createElement(params) {
        var element = document.createElement(params.type);
        var key;

        if (params.className) {
            element.className = params.className;
        }

        if (params.innerHTML) {
            element.innerHTML = params.innerHTML;
        }

        for (key in params.attr) {
            if (params.attr.hasOwnProperty(key)) {
                element.setAttribute(key, params.attr[key]);
            }
        }

        return element;
    }

    function handleEvents() {
        // Click on widget handler
        document.addEventListener('click', function(e) {
            var widget = getWidget(e.target);
            var params = {};
            var paymentTerms;

            if (widget) {
                e.preventDefault();
                params.vehicleVin = widget.getAttribute('data-vin');
                params.vehicleImage = widget.getAttribute('data-vehicle-image-url');
                params.vdpUrl = widget.getAttribute('data-vdp-url');
                params.entryPoint = widget.getAttribute('data-entry-point');
                paymentTerms = widget.getAttribute('data-payment-terms');

                if (paymentTerms) {
                    params.paymentTerms = JSON.parse(paymentTerms);
                }

                openPopup(params);
            } else if (e.target && (e.target.className.match(selectors.hidePopup))) {
                sendingData = {
                    clientType: clientType,
                    event: 'close'
                };

                if (isPPReady && iframe.parentNode) {
                    iframe.contentWindow.postMessage(JSON.stringify(sendingData), '*');
                } else {
                    closePopup();
                }

                e.preventDefault();
            }
        });

        // Init dynamically added widgets
        if (window.MutationObserver) {
            new MutationObserver(function() {
                initWidgets();
            }).observe(docEl, {
                childList: true,
                subtree: true
            });
        } else {
            document.addEventListener('DOMSubtreeModified', function() {
                initWidgets();
            });
        }

        window.addEventListener('message', function(e) {
            var parentData,
                key;

            try {
                parentData = JSON.parse(e.data);
            } catch (e) {
                return;
            }

            if (parentData.clientType !== clientType) {
                return;
            }

            switch (parentData.event) {
                case 'configure':
                    var urlParams = {
                        clientType: clientType,
                        theme: 'responsive1'
                    };
                    var configurationData = {};
                    var urlParamsKeys = ['vehicleVin', 'writeupId', 'step'];
                    var configurationDataKeys = ['logo', 'dealer', 'styleVariables', 'recentlyViewed', 'vdpUrl', 'inventoryUrl', 'creditApplicationUrl'];
                    var paymentTerms = typeof sendingParams.paymentTerms === 'object' ? sendingParams.paymentTerms : null;

                    isIframeLoadedCorrectly = true;
                    clearTimeouts();
                    iframe = findIframe();

                    for (key in sendingParams) {
                        if (urlParamsKeys.indexOf(key) !== -1) {
                            urlParams[key] = sendingParams[key];
                        }
                    }

                    for (key in config) {
                        if (configurationDataKeys.indexOf(key) !== -1) {
                            if (key === 'recentlyViewed') {
                                if (config[key].recentlyViewedEnabled && config[key].vehicles) {
                                    configurationData.recentlyViewed = config[key].vehicles;
                                }
                            } else {
                                configurationData[key] = config[key];
                            }
                        }
                    }

                    if (sendingParams.vdpUrl) {
                        configurationData.vdpUrl = sendingParams.vdpUrl;
                    }

                    if (sendingParams.vehicleImage) {
                        configurationData.vehicleImage = sendingParams.vehicleImage;
                    }

                    sendingData = {
                        clientType: clientType,
                        event: 'init',
                        data: {
                            apiKey: config.apiKey,
                            apiUrl: config.apiUrl,
                            configurationData: configurationData,
                            urlParams: urlParams,
                            postData: paymentTerms ? {
                                paymentTerms: paymentTerms
                            } : {},
                            noCache: isFirstRun
                        }
                    };

                    iframe.contentWindow.postMessage(JSON.stringify(sendingData), '*');

                    break;

                case 'ready':
                    isPPReady = true;
                    sendingParams.writeupId = parentData.data ? parentData.data.writeupId : '';
                    iframe = findIframe();
                    sendingData = {
                        clientType: clientType,
                        event: 'ready',
                        data: {
                            apiUrl: config.apiUrl,
                            timestamp: startTime,
                            windowWidth: window.innerWidth
                        }
                    };

                    iframe.contentWindow.postMessage(JSON.stringify(sendingData), '*');
                    isFirstRun = false;

                    if (isPopupExists()) {
                        removeClass(popup, selectors.loading);
                        popup.removeChild(loader);
                    }

                    document.dispatchEvent(new CustomEvent('ppContentLoad', {
                        bubbles: true
                    }));

                    break;

                case 'entryPointReady':
                    isPPReady = true;
                    isIframeLoadedCorrectly = true;
                    iframe = findIframe();
                    sendingData = {
                        clientType: clientType,
                        event: 'entryPointReady',
                        data: {
                            styleVariables: config.styleVariables,
                            windowWidth: window.innerWidth
                        }
                    };

                    clearTimeouts();
                    iframe.contentWindow.postMessage(JSON.stringify(sendingData), '*');
                    isFirstRun = false;

                    if (isPopupExists()) {
                        removeClass(popup, selectors.loading);
                        popup.removeChild(loader);
                    }

                    document.dispatchEvent(new CustomEvent('ppContentLoad', {
                        bubbles: true
                    }));

                    break;

                case 'pushState':
                case 'replaceState':
                    var state = parentData.event;
                    var step = parentData.data.step;
                    var hash = '#pp/' + sendingParams.vehicleVin + '/' + step + '/' + sendingParams.writeupId;

                    document.dispatchEvent(new CustomEvent('ppStepChange', {
                        bubbles: true,
                        detail: {
                            state: state,
                            step: step,
                            hash: hash,
                            vehicleVin: sendingParams.vehicleVin,
                            writeupId: sendingParams.writeupId
                        }
                    }));

                    break;

                case 'completeDeal':
                    if (isPopupExists()) {
                        createIframe({
                            vehicleVin: parentData.data.vehicleVin
                        });
                        createLoader();
                        popup.className += ' ' + selectors.loading;
                    } else {
                        document.dispatchEvent(new CustomEvent('ppCompleteDeal', {
                            bubbles: true
                        }));
                    }

                    break;

                case 'updateWidget':
                    document.dispatchEvent(new CustomEvent('ppPaymentTermsUpdate', {
                        bubbles: true,
                        detail: {
                            downPayment: parentData.data.down,
                            termLength: parentData.data.term,
                            apr: parentData.data.apr,
                            monthlyPayment: parentData.data.monthly,
                            creditScore: parentData.data.creditScore
                        }
                    }));

                    break;

                case 'changeLocation':
                    window.location = parentData.data.url;

                    break;

                case 'close':
                    closePopup();

                    break;

                case 'error':
                    var errorType = parentData.data && parentData.data.errorType ? parentData.data.errorType : '';

                    showError(errorType);

                    break;

                case 'internalError':
                    isIframeLoadedCorrectly = true;

                    if (isPopupExists()) {
                        removeClass(popup, selectors.loading);
                        popup.removeChild(loader);
                    }

                    document.dispatchEvent(new CustomEvent('ppContentLoad', {
                        bubbles: true
                    }));

                    break;
            }
        });

        window.addEventListener('resize', function() {
            var windowWidth = window.innerWidth;

            iframe = findIframe();
            sendingData = {
                clientType: clientType,
                event: 'resize',
                data: {
                    windowWidth: windowWidth
                }
            };

            if (
                document.body.contains(iframe) &&
                (windowWidth >= screenMedium && prevWindowWidth < screenMedium || windowWidth < screenMedium && prevWindowWidth >= screenMedium)) {
                iframe.contentWindow.postMessage(JSON.stringify(sendingData), '*');
            }

            prevWindowWidth = windowWidth;
        });
    }

    function parseLocation() {
        var hash = window.location.hash;
        var params,
            vehicleVin,
            step,
            writeupId;

        if (hash.match(/^#pp\/\w{17}\/[\w-]+\/\d+$/i)) {
            params = hash.split('/');
            vehicleVin = params[1];
            step = params[2];
            writeupId = params[3];

            return {
                vehicleVin: vehicleVin,
                step: step,
                writeupId: writeupId
            };
        }

        return null;
    }

    function getWidget(element) {
        if (element && element.className.match(selectors.showPopup)) {
            return element.className.match(selectors.widget) ? element : getClosestElement(element, selectors.widget);
        }

        while (element.parentNode) {
            if (element.parentNode.className && element.parentNode.className.match(selectors.showPopup)) {
                return element.parentNode.className.match(selectors.widget) ? element.parentNode : getClosestElement(element.parentNode, selectors.widget);
            }

            element = element.parentNode;
        }

        return null;
    }

    function getClosestElement(element, className) {
        if (element.closest) {
            return element.closest('.' + className);
        } else {
            while (element.parentNode) {
                if (element.parentNode.className.match(className)) {
                    return element.parentNode;
                } else {
                    element = element.parentNode;
                }
            }

            return null;
        }
    }

    function findIframe() {
        return document.body.contains(iframe) ? iframe : document.querySelector('.' + selectors.iframe);
    }

    function initWidgets() {
        var widgets = document.querySelectorAll('.' + selectors.widget);
        var buttonText = config.buttonText || 'Calculate Your Payment';

        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].className.match(selectors.widgetInitialized) || widgets[i].getAttribute('data-type')) {
                continue;
            }

            widgets[i].className += ' ' + selectors.widgetInitialized + ' ' + selectors.showPopup;

            if (widgets[i].innerHTML === '') {
                widgets[i].innerHTML = '<div class="pp-widget-content"><div class="pp-widget-button"><div class="pp-widget-title">' + buttonText + '</div></div></div>';
            }
        }
    }

    function collectRecentlyViewedVehicles() {
        var url = location.protocol + '//' + location.hostname + location.pathname + location.search;
        var widget = document.querySelector('.' + selectors.widget);
        var vin = widget ? widget.getAttribute('data-vin') : config.vehicleVin;
        var cookie = getCookie();

        if (!vin ||
            !config.recentlyViewed ||
            !config.recentlyViewed.recentlyViewedEnabled ||
            !config.recentlyViewed.recentlyViewedCount
        ) {
            return;
        }

        config.recentlyViewed.vehicles = cookie.recentlyViewedVehicles || [];

        if (config.recentlyViewed.vehicles.length >= config.recentlyViewed.recentlyViewedCount) {
            config.recentlyViewed.vehicles.shift();
        }

        for (var i = 0; i < config.recentlyViewed.vehicles.length; i++) {
            if (config.recentlyViewed.vehicles[i].vin === vin) {
                config.recentlyViewed.vehicles.splice(i, 1);
            }
        }

        config.recentlyViewed.vehicles.push({
            vin: vin,
            url: url
        });

        cookie.recentlyViewedVehicles = config.recentlyViewed.vehicles;

        setCookie(cookie);
    }

    function showError(errorType) {
        var title = errorMessages.titles[errorType];
        var message = errorMessages.messages[errorType];
        var exit = errorMessages.exit;

        clearTimeouts();

        error = createElement({
            type: 'div',
            className: selectors.error,
            innerHTML: '<div class="pp-error-message">' +
                '<div class="pp-error-title">' + title + '</div>' +
                '<div class="pp-error-text">' + message + '</div>' +
                '<a href="#" class="pp-error-exit pp-hide-popup">' + exit + '</a></div>'
        });

        if (isPopupExists()) {
            removeClass(popup, selectors.loading);
            popup.className += ' pp-popup-error';
            popup.appendChild(error);
            popup.removeChild(iframe);
        }

        document.dispatchEvent(new CustomEvent('ppError', {
            bubbles: true,
            detail: {
                errorMessage: {
                    title: title,
                    message: message,
                    exit: exit
                }
            }
        }));
    }

    function sendAnalytics() {
        iframe = findIframe();
        sendingData = {
            clientType: clientType,
            event: 'dropSave'
        };

        if (iframe) {
            iframe.contentWindow.postMessage(JSON.stringify(sendingData), '*');
        }
    }

    function removeClass(e, c) {
        e.className = e.className.replace(new RegExp('(?:^|\\s)' + c + '(?!\\S)'), '');
    }

    function getCookie() {
        var cookies = '; ' + document.cookie;
        var parts = cookies.split('; precisePrice=');

        if (parts.length >= 2) {
            try {
                return JSON.parse(parts.pop().split(';').shift());
            } catch (e) {
                return {};
            }
        } else {
            return {};
        }
    }

    function setCookie(cookie) {
        var date = new Date(new Date().getTime() + 86400000); // 1 day

        document.cookie = 'precisePrice=' + JSON.stringify(cookie) + '; path=/; expires=' + date.toUTCString();
    }

    function showWarning(message) {
        /* eslint-disable no-console */
        switch (message) {
            case 'browser':
                console.warn('PrecisePrice: Unsupported browser!');

                break;
            case 'params':
                console.warn('PrecisePrice: Required params are not provided!');

                break;
            case 'opened':
                console.warn('PrecisePrice: Popup already opened!');

                break;
            case 'init':
                console.warn('PrecisePrice: Init widget first!');

                break;
            case 'price':
                console.warn('PrecisePrice: Vehicle price is not set!');

                break;
        }
        /* eslint-enable no-console */
    }

    function warmUpCache() {
        var cookie = getCookie();
        var timestamp = new Date().getTime();
        var timeout = 1800000; // 30 min

        if (
            detectBot() ||
            !config.vehicleVin ||
            cookie.warmUp && cookie.warmUp[config.vehicleVin] && (timestamp - cookie.warmUp[config.vehicleVin]) < timeout) {
            return;
        }

        sendRequest({
            url: config.apiUrl + 'warmup.php?vehicleVin=' + config.vehicleVin,
            onSuccess: function(response) {
                if (typeof response !== 'object' || response.status !== 1) {
                    return;
                }

                cookie = getCookie();

                if (!cookie.warmUp) {
                    cookie.warmUp = {};
                }

                cookie.warmUp[config.vehicleVin] = new Date().getTime();

                setCookie(cookie);
            }
        });
    }

    function detectBot() {
        return /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent);
    }

    function sendRequest(params) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', params.url, true);
        xhr.setRequestHeader('X-Api-Key', config.apiKey);
        xhr.timeout = responseTimeout;
        xhr.send();

        xhr.onerror = errorCallback;
        xhr.ontimeout = errorCallback;

        xhr.onload = function() {
            if (xhr.status === 200) {
                var response;

                if (window.precisePrice.checkUrlError(xhr.responseURL)) {
                    errorCallback();

                    return;
                }

                try {
                    response = JSON.parse(xhr.responseText);
                } catch (e) {
                    errorCallback();

                    return;
                }

                successCallback(response);
            } else {
                errorCallback();
            }
        };

        function successCallback(response) {
            if (typeof params.onSuccess === 'function') {
                params.onSuccess(response);
            }
        }

        function errorCallback() {
            if (typeof params.onError === 'function') {
                params.onError();
            }
        }
    }

    function getMonthlyPayment(vehicleVin, callback) {
        sendRequest({
            url: config.apiUrl + 'writeup-free/payment-terms?vin=' + vehicleVin,
            onSuccess: function(response) {
                var monthlyPayment;

                if (typeof response !== 'object') {
                    returnResult();

                    return;
                }

                monthlyPayment = calculateMonthly(
                    response.downMax - response.downPayment, response.termLength, response.apr
                );

                returnResult({
                    monthlyPayment: monthlyPayment
                });
            },
            onError: returnResult
        });

        function returnResult(result) {
            result = result || {};
            result.vehicleVin = vehicleVin;

            if (typeof callback === 'function') {
                callback(result);
            }
        }
    }

    function calculateMonthly(principal, term, apr) {
        var monthInterest, pow;

        if (principal <= 0) {
            return 0;
        } else if (apr === 0) {
            return (principal / term).toFixed(0);
        }

        monthInterest = apr * 100 / 10000 / 12;
        pow = Math.pow(1 + monthInterest, term);

        return ((principal * pow * monthInterest) / (pow - 1)).toFixed(0);
    }

    function numberFormat(str) {
        var delimiter = ',';

        if (typeof str !== 'number' && typeof str !== 'string') {
            str = '';
        }

        str = str.toString().replace(/(\d+)(\.\d+)?/g,
            function(c, b, a) {
                return b.replace(/(\d)(?=(\d{3})+$)/g, '$1' + delimiter) + (a ? a : '');
            }
        );

        return str;
    }

    function checkUrlError(url) {
        var errorLocation;

        errorLocation = document.createElement('a');
        errorLocation.href = url;

        if (typeof url === 'undefined') {
            return false;
        }

        return !url || errorLocation.pathname.match(/^\/error/);
    }
})();

(function() {
    var _config = window.precisePrice.getConfig();
    var _isTransitionSupport = typeof document.createElement('div').style.transition !== 'undefined';
    var _primaryColorStyle = _config.styleVariables && _config.styleVariables.primaryColor ? (' style="color:' + _config.styleVariables.primaryColor + '" ') : '';
    var _loaderTemplate = '<svg viewBox="25 25 50 50"' + _primaryColorStyle + '><circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg>';
    var _buttonText = _config.buttonText || 'Calculate Your Payment';
    var _sliderTemplate = '' +
        '<div class="pp-monthly-row">' +
        '<div class="pp-monthly-title">Estimated Monthly Payment</div>' +
        '<div class="pp-monthly-result">$<span class="pp-monthly-value"></span>	<small>/mo</small></div>' +
        '</div>' +
        '<div class="pp-slider-track"' + _primaryColorStyle + '>' +
        '<div class="pp-slider-selection"></div>' +
        '<div class="pp-slider-handle"></div>' +
        '</div>' +
        '<div class="pp-payment-terms-row">' +
        '<div class="pp-payment-terms-item">$<span class="pp-down-payment-value"></span> down</div>' +
        '<div class="pp-payment-terms-item"><span class="pp-term-length-value"></span> mo</div>' +
        '<div class="pp-payment-terms-item"><span class="pp-apr-value"></span>% APR</div>' +
        '<div class="pp-payment-terms-item"><a class="pp-customize-link pp-show-popup" href="#"' + _primaryColorStyle + '>Customize</a></div>' +
        '</div>' +
        '<a class="pp-slider-button pp-show-popup" href="#"' + _primaryColorStyle + '>' + _buttonText + '</a>' +
        '<div class="pp-slider-loader">' +
        '<div class="pp-slider-loader-text">Loading Your Monthly Payment...</div>' +
        '<div class="pp-loader">' + _loaderTemplate + '</div>' +
        '</div>';
    var _selectors = {
        pp: 'pp-widget',
        widget: 'pp-slider-widget',
        widgetInitialized: 'pp-widget-initialized',
        track: 'pp-slider-track',
        handle: 'pp-slider-handle',
        selection: 'pp-slider-selection',
        downPayment: 'pp-down-payment-value',
        monthlyPayment: 'pp-monthly-value',
        termLength: 'pp-term-length-value',
        apr: 'pp-apr-value',
        loading: 'pp-slider-loading',
        loader: 'pp-slider-loader',
        customize: 'pp-customize-link',
        button: 'pp-slider-button'
    };
    var _elements = {
        widget: null,
        track: null,
        handle: null,
        selection: null,
        downPayment: null,
        monthlyPayment: null,
        termLength: null,
        apr: null,
        loader: null
    };
    var _sliderData = {};
    var _itemsRange = [];
    var _itemsOffset = [];
    var _vehicleVin;

    initWidget();

    function initWidget() {
        var widget = document.querySelector('.' + _selectors.pp + '[data-type=slider]');

        if (widget) {
            _vehicleVin = widget.getAttribute('data-vin');
            widget.className += ' ' + _selectors.widget + ' ' + _selectors.widgetInitialized + ' ' + _selectors.loading;
            widget.innerHTML = _sliderTemplate;
            _elements.widget = widget;

            getData();
        }
    }

    function addEventHandlers() {
        window.addEventListener('message', function(e) {
            var parentData;

            try {
                parentData = JSON.parse(e.data);
            } catch (e) {
                return;
            }

            if (parentData.event === 'updateWidget') {
                _sliderData.downPayment = parentData.data.down;
                _sliderData.termLength = parentData.data.term;
                _sliderData.apr = parentData.data.apr;
                _sliderData.monthlyPayment = Math.round(parentData.data.monthly);
                updateSlider();
            }
        });

        _elements.track.addEventListener('mousedown', function(e) {
            setData(e);

            document.addEventListener('mousemove', setData);
            document.addEventListener('mouseup', removeEventHandlers);

            e.preventDefault();
        });

        _elements.track.addEventListener('touchstart', function(e) {
            setData(e);

            document.addEventListener('touchmove', setData);
            document.addEventListener('touchend', removeEventHandlers);

            e.preventDefault();
        });

        _elements.track.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });

        _elements.handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
        });

        _elements.handle.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    }

    function removeEventHandlers() {
        document.removeEventListener('mousemove', setData);
        document.removeEventListener('mouseup', removeEventHandlers);
        document.removeEventListener('touchmove', setData);
        document.removeEventListener('touchend', removeEventHandlers);
    }

    function getData() {
        window.precisePrice.sendRequest({
            url: _config.apiUrl + 'writeup-free/payment-terms?vin=' + _vehicleVin,
            onSuccess: function(response) {
                if (typeof response !== 'object') {
                    destroySlider();

                    return;
                }

                for (var key in response) {
                    _sliderData[key] = response[key];
                }

                initSlider();
            },
            onError: function() {
                destroySlider();
            }
        });
    }

    function setData(e) {
        if (typeof e === 'undefined') {
            _sliderData.monthlyPayment = calculateMonthly(
                _sliderData.downMax - _sliderData.downPayment, _sliderData.termLength, _sliderData.apr
            );
        } else {
            var pageX = typeof e.pageX !== 'undefined' ? e.pageX : e.touches[0].pageX;
            var sliderCoords = getCoords(_elements.track);
            var leftEdge = pageX - sliderCoords.left;
            var rightEdge = _elements.track.offsetWidth;
            var newOffset = (pageX - sliderCoords.left) / rightEdge * 100;
            var closestOffset,
                index;

            if (newOffset < 0) {
                newOffset = 0;
            }

            if (leftEdge > rightEdge) {
                newOffset = 100;
            }

            closestOffset = _itemsOffset.reduce(function(prev, curr) {
                return (Math.abs(curr - newOffset) < Math.abs(prev - newOffset) ? curr : prev);
            });

            index = _itemsOffset.indexOf(closestOffset);
            _sliderData.downPayment = _itemsRange[index];
            _sliderData.monthlyPayment = calculateMonthly(
                _sliderData.downMax - _itemsRange[index], _sliderData.termLength, _sliderData.apr
            );
        }

        updateSlider();
    }

    function initSlider() {
        var step = 100;
        var downMin = Math.ceil(_sliderData.downMin / step) * step;
        var downMax = Math.floor(_sliderData.downMax / step) * step;
        var rangeLength = (downMax - downMin) / step + 1;

        for (var key in _elements) {
            _elements[key] = document.querySelector('.' + _selectors[key]);
        }

        window.precisePrice.removeClass(_elements.widget, _selectors.loading);
        _elements.widget.removeChild(_elements.loader);

        _itemsRange = new Array(rangeLength)
            .join().split(',')
            .map(function(item, index) {
                return downMin + index * step;
            });

        if (_sliderData.downMin % step) {
            _itemsRange.unshift(_sliderData.downMin);
        }

        if (_sliderData.downMax % step) {
            _itemsRange.push(_sliderData.downMax);
        }

        for (var i = 0; i < _itemsRange.length; i++) {
            _itemsOffset.push((_itemsRange[i] - _sliderData.downMin) / (_sliderData.downMax - _sliderData.downMin) * 100);
        }

        _elements.termLength.innerHTML = _sliderData.termLength;
        _elements.apr.innerHTML = _sliderData.apr;

        setData();
        addEventHandlers();
    }

    function updateSlider(e) {
        var paymentTerms = {
            down: _sliderData.downPayment
        };
        var newOffset;

        if (typeof e === 'undefined') {
            newOffset = (_sliderData.downPayment - _sliderData.downMin) / (_sliderData.downMax - _sliderData.downMin) * 100;
        } else {
            var index = _itemsRange.indexOf(_sliderData.downPayment);

            newOffset = _itemsOffset[index];
        }

        _elements.widget.setAttribute('data-payment-terms', JSON.stringify(paymentTerms));
        _elements.downPayment.innerHTML = window.precisePrice.numberFormat(_sliderData.downPayment);
        _elements.monthlyPayment.innerHTML = window.precisePrice.numberFormat(_sliderData.monthlyPayment);
        _elements.termLength.innerHTML = _sliderData.termLength;
        _elements.apr.innerHTML = _sliderData.apr;
        _elements.selection.style.width = newOffset + '%';
        _elements.handle.style.left = newOffset + '%';
    }

    function destroySlider() {
        if (_elements.widget.className.match(_selectors.loading)) {
            removeSlider();

            return;
        }

        _elements.widget.style.height = _elements.widget.offsetHeight + 'px';
        _elements.widget.offsetHeight;
        _elements.widget.style.height = 0;

        if (_isTransitionSupport) {
            _elements.widget.addEventListener('transitionend', removeSlider);
        } else {
            removeSlider();
        }
    }

    function removeSlider() {
        _elements.widget.parentNode.removeChild(_elements.widget);
    }

    function calculateMonthly(principal, term, apr) {
        var monthInterest, pow;

        if (principal <= 0) {
            return 0;
        } else if (apr === 0) {
            return (principal / term).toFixed(0);
        }

        monthInterest = apr * 100 / 10000 / 12;
        pow = Math.pow(1 + monthInterest, term);

        return ((principal * pow * monthInterest) / (pow - 1)).toFixed(0);
    }

    function getCoords(element) {
        var box = element.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
})();

(function() {
    var _config = window.precisePrice.getConfig();
    var _buttonText = _config.buttonText || 'Calculate your payments';
    var _buttonTemplate = '' +
        '<div class="pp-widget-content">' +
        '<div class="pp-button-title">' + _buttonText + '</div>' +
        '<div class="pp-button-monthly">' +
        '<span class="pp-button-monthly-value">$---</span> /mo' +
        '<div class="pp-loader">' +
        '<svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg>' +
        '</div>' +
        '</div>';
    '</div>';
    var _selectors = {
        pp: 'pp-widget',
        widget: 'pp-button-widget',
        widgetInitialized: 'pp-widget-initialized',
        monthlyPayment: 'pp-button-monthly-value',
        loading: 'pp-loading',
        loader: 'pp-loader',
        showPopup: 'pp-show-popup'
    };

    initWidgets();
    handleEvents();

    function initWidgets() {
        var widgets = document.querySelectorAll('.' + _selectors.pp + '[data-type=button]');

        for (var i = 0; i < widgets.length; i++) {
            var widget = widgets[i];
            var vehicleVin = widget.getAttribute('data-vin');

            if (widget.className.match(_selectors.widgetInitialized)) {
                continue;
            }

            widget.className += ' ' + _selectors.widget + ' ' + _selectors.widgetInitialized + ' ' + _selectors.loading + ' ' + _selectors.showPopup;
            widget.innerHTML = _buttonTemplate;

            window.precisePrice.getMonthlyPayment(vehicleVin, getMonthlyCallback);
        }
    }

    function getMonthlyCallback(result) {
        var widget = document.querySelectorAll('.' + _selectors.widget + '[data-vin="' + result.vehicleVin + '"]');

        for (var i = 0; i < widget.length; i++) {
            if (typeof result.monthlyPayment !== 'undefined') {
                setMonthly(widget[i], result.monthlyPayment);
            }

            initButton(widget[i]);
        }
    }

    function setMonthly(widget, monthlyPayment) {
        widget.querySelector('.' + _selectors.monthlyPayment).innerHTML = '$' + window.precisePrice.numberFormat(monthlyPayment);
    }

    function initButton(widget) {
        var loader = widget.querySelector('.' + _selectors.loader);

        if (loader) {
            loader.parentNode.removeChild(loader);
        }

        window.precisePrice.removeClass(widget, _selectors.loading);
    }

    function handleEvents() {
        // Init dynamically added widgets
        if (window.MutationObserver) {
            new MutationObserver(function() {
                initWidgets();
            }).observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        } else {
            document.addEventListener('DOMSubtreeModified', function() {
                initWidgets();
            });
        }

        window.addEventListener('message', function(e) {
            var parentData;

            try {
                parentData = JSON.parse(e.data);
            } catch (e) {
                return;
            }

            if (parentData.event === 'updateWidget') {
                var widget = document.querySelector('.' + _selectors.widget + '[data-vin="' + parentData.data.vehicleVin + '"]');

                if (widget) {
                    setMonthly(widget, Math.round(parentData.data.monthly));
                }
            }
        });
    }
}());