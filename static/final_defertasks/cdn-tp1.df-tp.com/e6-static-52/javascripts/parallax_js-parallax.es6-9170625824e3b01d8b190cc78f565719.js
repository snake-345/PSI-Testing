// import '../jquery.es6.js';
// import '../../vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../popover-enhancement.es6.js';
// import '../global.es6.js';
// import '../widgets/container.es6.js';
/**
 * @module Parallax
 */
Moff.modules.create('Parallax', function() {
    'use strict';

    const MODULE = this;
    const IS_MOBILE = Moff.detect.isMobile;
    const SEL = {
        parallax: '.js-parallax',
        heightHelper: '.js-parallax-helper',
        bgMobile: '.parallax_bg-mobile',
    };
    const SPEED_CONFIGS = {
        fixed: 0,

        // Try to prevent jerking on mobile devices by decreasing background offset
        slow: IS_MOBILE ? 0.52 : 0.12,
        normal: IS_MOBILE ? 0.64 : 0.24,
        fast: IS_MOBILE ? 0.76 : 0.36,
    };

    let _parallaxData = {};

    let _currentId = 0;

    let _$parallaxElements,
        _winHeight,
        _winScrollTop;

    this.init = () => {
        _$parallaxElements = MODULE.$find(SEL.parallax);

        Moff.event.on('container.lazy-background-set', ({
            $container
        }) => {
            if (!$container.hasClass(SEL.parallax.slice(1))) {
                return;
            }

            MODULE.afterCssLoaded(() => {
                const parallaxData = _setInitParallaxData($container[0]);

                _loadInitBgParams(parallaxData);
            });
        });

        MODULE.afterCssLoaded(() => {
            _handleEvents();
        });
    };

    /**
     * Getting id of parallax element data
     * @param {HTMLElement} element
     * @returns {string}
     */
    this.getElementId = element => element.dataset.parallaxId;

    /**
     * Setting props to relative parallax Data
     * @param {string} id
     * @param {object} data
     */
    this.setParallaxData = (id, data) => {
        if (typeof data !== 'object' || !_parallaxData.hasOwnProperty(id)) {
            throw new Error(`Can't set new data for ${id}`);
        }

        $.extend(_parallaxData[id], data);
    };

    /**
     * Getting data of parallax element
     * @param {string} id
     * @returns {object}
     */
    this.getElementData = id => {
        if (!_parallaxData.hasOwnProperty(id)) {
            throw new Error(`No parallax data presented in element with id="${id}"`);
        }

        return _parallaxData[id];
    };

    /**
     * Stopping all parallax effects or unique parallax of unique element
     * @param {jQuery} $element
     * @returns {undefined}
     */
    this.destroy = ($element = _$parallaxElements) => {
        const elementLength = $element.length;

        if (!($element instanceof jQuery) || !elementLength || !$element.hasClass(SEL.parallax.slice(1))) {
            return;
        }

        if (elementLength === 1) {
            delete _parallaxData[MODULE.getElementId($element[0])];
        } else {
            _parallaxData = {};
        }

        $element
            .css({
                backgroundSize: '',
                backgroundPositionY: '',
            })
            .removeData('parallax-id')
            .removeClass(`parallax ${SEL.parallax.slice(1)}`);
    };

    /**
     * Adding event handlers to each parallax element
     * @private
     */
    function _handleEvents() {
        $(window)
            .on('parallax-images-loaded resize.parallax carousel:resize', () => {
                _setWindowHeight();
                _setWindowScrollPos();

                _forEachParallaxElement(
                    _loadElementDimensions,
                    _refreshBackground,
                    _renderParallax
                );
            })
            .trigger('resize.parallax')
            .on('scroll.parallax', () => {
                _setWindowScrollPos();
                _forEachParallaxElement(_renderParallax);
            });
    }

    /**
     * Setting initial data of parallax elements
     * @param {HTMLElement} element
     * @returns {Object}
     * @private
     */
    function _setInitParallaxData(element) {
        const id = _getNextId();

        _parallaxData[id] = {
            id,
            element,
            parallaxSpeed: SPEED_CONFIGS[element.dataset.parallaxSpeed],
            width: element.clientWidth,
            height: element.clientHeight,
            topOffset: element.offsetTop,
            bottomOffset: element.offsetTop + element.clientHeight,
            bgWidth: null,
            bgHeight: null,
            bgAspectRatio: null,
        };

        /* eslint-disable no-param-reassign */
        element.dataset.parallaxId = id;
        /* eslint-enable no-param-reassign */

        if (IS_MOBILE) {
            // On Most of Mobile devices {background-size} and {background-attachment: fixed} can't be used together
            element.classList.add('parallax_bg-scroll');
        }

        return _parallaxData[id];
    }

    /**
     * Return next ID
     * @returns {string}
     * @private
     */
    function _getNextId() {
        return `px${++_currentId}`;
    }

    /**
     * Set window scrollTop position
     */
    function _setWindowScrollPos() {
        _winScrollTop = document.documentElement.scrollTop || window.pageYOffset;
    }

    /**
     * Calc and set window height
     */
    function _setWindowHeight() {
        _winHeight = (() => {
            if (IS_MOBILE) {
                // Getting real viewport height on mobile browsers by adding block with 100vh
                if (!$(SEL.heightHelper).length) {
                    const styles = 'position:fixed;top:0;height:100vh;z-index:-1;visibility:hidden;';

                    $('body').append(`<div class="${SEL.heightHelper.slice(1)}" style="${styles}"></div>`);
                }

                return $(SEL.heightHelper).height();
            }

            return window.innerHeight;
        })();
    }

    /**
     * Send callbacks for each parallax data
     * Send callbacks to all parallax elements and call them with relative data and id
     * @param {array} callbacks
     */
    function _forEachParallaxElement(...callbacks) {
        const cbLength = callbacks.length;

        Object.keys(_parallaxData).forEach(id => {
            if (_parallaxData[id].parallaxSpeed !== 0) {
                for (let i = 0; i < cbLength; i++) {
                    callbacks[i](_parallaxData[id]);
                }
            }
        });
    }

    /**
     * Calculating background dimensions and set them to element Data
     * @param {HTMLElement} element
     * @param {String} id
     * @private
     */
    function _loadInitBgParams({
        element,
        id
    }) {
        const bgImage = new Image();

        bgImage.onload = () => {
            MODULE.setParallaxData(id, {
                bgWidth: bgImage.width,
                bgHeight: bgImage.height,
                bgAspectRatio: bgImage.width / bgImage.height,
            });

            $(window).trigger('parallax-images-loaded');
        };

        [bgImage.src] = window.getComputedStyle(element)
            .backgroundImage
            .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
            .split(',');
    }

    /**
     * Calculating element dimension and set them to element Data
     * @param {HTMLElement} element
     * @param {String} id
     * @private
     */
    function _loadElementDimensions({
        element,
        id
    }) {
        MODULE.setParallaxData(id, {
            topOffset: element.offsetTop,
            bottomOffset: element.offsetTop + element.clientHeight,
            width: element.clientWidth,
            height: element.clientHeight,
        });
    }

    /**
     * Refresh all background params and set proper styles for element
     * @param {object} pxElement
     */
    function _refreshBackground(pxElement) {
        const {
            id,
            element,
            width,
            height,
            bgWidth: oldBgWidth,
            topOffset,
            bgAspectRatio
        } = pxElement;

        let bgHeight = height; // Initially set full height for bg

        let bgWidth = bgHeight * bgAspectRatio;

        // Get bg size while fit as cover
        if (bgWidth < width) {
            bgWidth = width;
            bgHeight = bgWidth / bgAspectRatio;
        }

        if (bgWidth !== oldBgWidth) {
            MODULE.setParallaxData(id, {
                bgWidth,
                bgHeight
            });
        }

        // Fix missing bg height for parallax by getting parallaxTop on critical top coordinate (top offset of element)
        const missingBgHeight = _getParallaxTop(pxElement, topOffset) * 2;

        if (missingBgHeight > 0) {
            bgHeight += missingBgHeight;
            bgWidth = bgHeight * bgAspectRatio;

            MODULE.setParallaxData(id, {
                bgWidth,
                bgHeight
            });
        }

        element.style.backgroundSize = `auto ${bgHeight}px`;
    }

    /**
     * Getting top position of background by relative element Data
     * @param {object} pxElement
     * @param {number} baseTop - the reference point of shifting background
     * @returns {number}
     */
    function _getParallaxTop({
        parallaxSpeed,
        height,
        topOffset,
        bgHeight
    }, baseTop = _winScrollTop) {
        const elementCenterOffset = (_winHeight - height) / 2; // Make bg in center of window
        const bgTopOffset = (_winHeight - bgHeight) / 2; // Offset of bg while fit as cover
        const baseOffset = (topOffset - baseTop - elementCenterOffset) * parallaxSpeed;

        return Math.round(baseOffset + bgTopOffset);
    }

    /**
     * Setting background Y position of element by pxElement for parallax effect
     * @param {object} pxElement
     */
    function _renderParallax(pxElement) {
        const {
            element,
            topOffset
        } = pxElement;
        const scrollBgTopOffset = IS_MOBILE ? (topOffset - _winScrollTop) : 0; // Because of {background-attachment: scroll} for mobile

        element.style.backgroundPositionY = `${_getParallaxTop(pxElement) - scrollBgTopOffset}px`;
    }
});

Moff.modules.initClass('Parallax', {
    scopeSelector: 'body',
});