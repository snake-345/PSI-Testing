import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
/**
 * @module InViewport
 */
Moff.modules.create('InViewport', function() {
    'use strict';

    let _elements = [];

    this.init = function() {
        $(window).on('scroll.inViewport resize.inViewport', Moff.utils.throttle(() => _handleScroll(), 100));
    };

    /**
     * Handle inViewport, callback will be called only one time
     * @param {Object} options
     * @param {jQuery} options.$elements - jQuery collection of elements which should be watched
     * @param {function} options.inCallback - Callback which will be called when one of $elements will appear in viewport. Get $element
     * @param {function} options.outCallback - Callback which will be called when one of $elements will disappear from viewport. Get $element
     */
    this.once = function(options) {
        _getElements(options, true);
        setTimeout(() => _handleScroll(), 0);
    };

    /**
     * Handle inViewport
     * @param {Object} options
     * @param {jQuery} options.$elements - jQuery collection of elements which should be watched
     * @param {function} options.inCallback - Callback which will be called when one of $elements will appear in viewport. Get $element
     * @param {function} options.outCallback - Callback which will be called when one of $elements will disappear from viewport. Get $element
     */
    this.on = function(options) {
        _getElements(options);
        _handleScroll();
    };

    function _getElements({
        $elements,
        inCallback,
        outCallback
    }, isOnce = false) {
        $.each($elements, (index, element) => {
            const elementObj = {
                $element: $(element),
                node: element,
                inCallback,
                outCallback,
                isOnce,
            };

            _elements.push(elementObj);
        });
    }

    function _handleScroll() {
        for (let i = 0, l = _elements.length; i < l; i++) {
            const element = _elements[i];

            if (!element) {
                continue;
            }
            if (!Moff.utils.isElementInDom(element.node)) {
                _elements[i] = null;
                continue;
            }

            if (!element.inViewport && _inViewport(element.node)) {
                element.inViewport = true;

                if (element.inCallback) {
                    element.inCallback(element.$element);

                    if (element.isOnce) {
                        _elements[i] = null;
                    }
                }
            } else if (element.inViewport && !_inViewport(element.node)) {
                element.inViewport = false;

                if (element.outCallback) {
                    element.outCallback(element.$element);

                    if (element.isOnce) {
                        _elements[i] = null;
                    }
                }
            }
            // _handleScroll in in(out)CallBack can change array length, in that case we need to restart the loop
            if (_elements.length !== l) {
                l = _elements.length;
                i = -1;
            }
        }

        _elements = _elements.filter(v => v);
    }

    function _inViewport(element) {
        const {
            top,
            left,
            bottom,
            right
        } = element.getBoundingClientRect();

        return top < window.innerHeight &&
            bottom > 0 &&
            left < window.innerWidth &&
            right > 0;
    }
});

Moff.modules.initClass('InViewport', {
    scopeSelector: 'body',
});