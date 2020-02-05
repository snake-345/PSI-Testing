(function() {
    'use strict';

    Moff.utils = {
        debounce(f, ms) {
            let timer = null;

            return function(...args) {
                const onComplete = () => {
                    f.apply(this, args);
                    timer = null;
                };

                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(onComplete, ms);
            };
        },
        throttle(f, ms) {
            let isThrottled = false;

            let savedArgs,
                savedThis;

            function wrapper(...args) {
                if (isThrottled) {
                    savedArgs = args;
                    savedThis = this;
                    return;
                }

                f.apply(this, args);
                isThrottled = true;

                setTimeout(() => {
                    isThrottled = false;
                    if (savedArgs) {
                        wrapper.apply(savedThis, savedArgs);
                        savedArgs = null;
                        savedThis = null;
                    }
                }, ms);
            }

            return wrapper;
        },
        isElementInDom(element) {
            while (element) {
                if (element === document) {
                    return true;
                }

                element = element.parentNode; // eslint-disable-line no-param-reassign
            }
            return false;
        },
        ucfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getLocationSearchData() {
            return window.location.search
                .replace('?', '')
                .split('&')
                .map(param => param.split('='))
                .reduce((values, [key, value]) => {
                    values[key] = value; // eslint-disable-line no-param-reassign

                    return values;
                }, {});
        },
        scrollToElement($element, scrollSpeed, callback = () => {}) {
            const $document = $('html');
            const stickyModule = Moff.modules.get('Sticky');
            const stickyBar = Moff.modules.get('StickyBarTheme1');
            const stickyElementsOffset = stickyModule.getElementStickyTop($element);
            const elementOffsetTop = $element.offset().top;
            const offsetFix = $(window).height() - $document.prop('scrollHeight') + $element.outerHeight();

            let elementOffset = elementOffsetTop - stickyElementsOffset;

            if (offsetFix > 0) {
                elementOffset -= offsetFix;
            }

            elementOffset -= stickyBar ? stickyBar.getModuleHeight(elementOffset) : 0;
            const scrollTime = Math.abs((elementOffset - $document.scrollTop()) / scrollSpeed);

            $document.animate({
                scrollTop: elementOffset
            }, scrollTime, callback);
        },
        scrollToElementInContainer($element, $scrollContainer, scrollSpeed, callback = () => {}) {
            const containerFullHeight = $scrollContainer.prop('scrollHeight');
            const containerHeight = $scrollContainer.outerHeight();
            const containerScroll = $scrollContainer.scrollTop();

            let elementOffset = $element.position().top + containerScroll;
            const offsetFix = containerFullHeight - containerHeight - elementOffset;

            if (offsetFix < 0) {
                elementOffset += offsetFix;
            }

            const scrollTime = Math.abs((elementOffset - containerScroll) / scrollSpeed);

            $scrollContainer.animate({
                scrollTop: elementOffset
            }, scrollTime, callback);
        },
    };
}());