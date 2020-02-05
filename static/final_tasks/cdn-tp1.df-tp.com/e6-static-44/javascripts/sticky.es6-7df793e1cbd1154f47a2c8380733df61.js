/**
 * @module Sticky
 */
/* eslint-disable no-param-reassign */
Moff.modules.create('Sticky', function() {
    'use strict';

    /* Restrictions:
     *   - Can't work right with many intersecting sticky elements in one parent
     *       (We can try calculate something like offsetBottomFromParent which we will used in scrollHandler
     *       when we try decide it's crossed bottom border of parent or not)
     *   - Can't work right with sticky elements which are located below sticky element with parent if it elements are located in the same parent */

    const _stickyElements = [];

    let _isAnimating = false;

    let _unsetIsHovered,
        _fixedModule,
        _windowHeight,
        _$window,
        _$body;

    /**
     * Popups initialization
     * @method init
     */
    this.init = function() {
        _windowHeight = window.innerHeight;
        _$window = $(window);
        _$body = $('body');
        _fixedModule = Moff.modules.get('Fixed');
        _unsetIsHovered = Moff.utils.debounce(element => {
            element.isHovered = false;
            _$window.off(`scroll.stickyElement${element.index}`);
        }, 50);

        _$window.on('resize', resizeHandler);
        _$window.on('scroll.sticky', () => {
            if (_isAnimating) {
                return;
            }

            scrollHandler();
        });

        Moff.event.on('fixed.update', resizeHandler);
    };

    this.initSticky = async function(element, options = {}) {
        const index = _stickyElements.length;

        let container = $('<div class="sticky-container js-sticky-container"><div class="sticky-container_inner js-sticky-container-inner"></div></div>');

        let placeholder = $('<div class="sticky-placeholder js-sticky-placeholder"></div>');

        if (!element.length || element.data('stickyElement') || Moff.ENV.get('isPreview')) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 0));
        container = element.wrap(container).closest('.js-sticky-container');
        await new Promise(resolve => setTimeout(resolve, 0));
        placeholder = container.after(placeholder).next('.js-sticky-placeholder');

        const inner = container.find('.js-sticky-container-inner');

        await new Promise(resolve => setTimeout(resolve, 0));
        _stickyElements.push(prepareSticky({
            container,
            inner,
            placeholder,
            index,
            fixed: false,
            scrollLock: options.scrollLock || false,
            fixedToParentBottom: false,
            additionalMarginBottom: options.additionalMarginBottom || 0,
            parent: options.parent && options.parent.length ? options.parent : false,
            positionContext: options.parent && options.parent.length ? getPositionContext(container) : false,
        }));

        await new Promise(resolve => setTimeout(resolve, 0));
        element.data('stickyElement', _stickyElements[index]);
        handleStickyElementHover(_stickyElements[index]);
        handleStickyElementScroll(_stickyElements[index]);
        calculateOffsetTop();
        scrollHandler();
        updateContainerBgColor(container);
    };

    this.getStickyElements = function() {
        return _stickyElements;
    };

    this.destroySticky = function(element) {
        const stickyElement = element.data('stickyElement');

        if (!stickyElement) {
            return;
        }

        stickyElement.container.off('scroll mouseenter touchstart mouseleave touchend');
        stickyElement.placeholder.remove();
        element.unwrap().unwrap();
        _stickyElements.splice(stickyElement.index, 1);
        element.removeData('stickyElement');
        resizeHandler();
    };

    this.reCalculate = function() {
        resizeHandler();
    };

    this.reCalculateWithAnimation = function(changingElement, fromHeight, newHeight, duration = 350, timingFunction = 'ease') {
        if (changingElement && changingElement.data('stickyElement') && newHeight !== undefined) {
            const stickyElement = changingElement.data('stickyElement');
            const transition = {
                transitionProperty: 'all',
                transitionDuration: `${duration / 1000}s`,
                transitionTimingFunction: timingFunction,
            };
            const removeTransition = {
                transitionProperty: '',
                transitionDuration: '',
                transitionTimingFunction: '',
            };
            const animationData = {
                fromHeight,
                newHeight,
                duration,
                timingFunction,
                transition,
                removeTransition,
            };

            Moff.event.trigger('sticky.recalculateWithAnimationStart', animationData);

            _isAnimating = true;

            stickyElement.placeholder.css(transition);
            stickyElement.placeholder.css({
                height: newHeight,
            });

            _stickyElements.forEach(element => {
                if (element.index > stickyElement.index && !element.fixedToParentBottom) {
                    if (element.fixed) {
                        element.container.css(transition);
                        element.container.css('top', element.offsetTop + (newHeight - fromHeight));
                    }
                }
            });

            setTimeout(() => {
                _isAnimating = false;
                this.reCalculate();
                stickyElement.placeholder.css(removeTransition);
                _stickyElements.forEach(element => element.container.css(removeTransition));

                Moff.event.trigger('sticky.recalculateWithAnimationEnd', animationData);
            }, duration);
        }
    };

    this.isAnimating = function() {
        return _isAnimating;
    };

    /**
     * Getting offsetTop for $element if it would be sticky
     * @param {jQuery} $element
     * @returns {number}
     */
    this.getElementStickyTop = function($element) {
        let element = {
            top: $element.offset().top,
            left: Math.round($element.offset().left),
            right: Math.round($element.offset().left + $element.outerWidth()),
            offsetTop: 0,
            tmp: true,
        };
        const tmpStickyElements = _stickyElements.concat(element);

        let offsetTop = 0;

        arrangeElementsByTop(tmpStickyElements);
        [element] = tmpStickyElements.filter(el => el.tmp === true);
        setOffsetTop(element, tmpStickyElements);

        if (typeof element.offsetTop !== 'undefined') {
            ({
                offsetTop
            } = element);
        }

        return offsetTop;
    };

    function prepareSticky(element) {
        const width = element.placeholder.width();
        const height = element.inner.height();
        const left = Math.round(element.placeholder.offset().left);
        const right = Math.round(left + width);

        element.container.width(width);
        element.placeholder.height(height);
        element.container.addClass('__sticky-ready');

        const stickyElement = $.extend(element, {
            width,
            height,
            left,
            right,
            offsetTop: 0,
            maxHeight: _windowHeight,
            top: element.placeholder.offset().top,
            parentTop: element.parent ? element.parent.offset().top : null,
            parentHeight: element.parent ? element.parent.height() : null,
            positionContextTop: element.positionContext ? element.positionContext.offset().top : null,
        });

        stickyElement.offsetFromFixed = (stickyElement.parent && _fixedModule) ? _fixedModule.getFixedElementsOffset(stickyElement) : 0;

        return stickyElement;
    }

    function handleStickyElementHover(element) {
        element.isHovered = false;

        element.container.on('mouseenter touchstart', () => {
            element.isHovered = true;
        });

        element.container.on('mouseleave touchend', () => {
            _unsetIsHovered(element);
            _$window.on(`scroll.stickyElement${element.index}`, () => _unsetIsHovered(element));
        });
    }

    function handleStickyElementScroll(element) {
        element.containerScrollTop = 0;

        element.container.on('scroll', () => {
            element.containerScrollTop = element.container.scrollTop();
            _$window.trigger('scroll.sticky');
        });
    }

    function arrangeElementsByTop(stickyElements = _stickyElements) {
        stickyElements
            .sort((a, b) => a.top - b.top)
            .forEach((element, index) => {
                element.index = index;
            });
    }

    function setOffsetTop(element, stickyElements = _stickyElements) {
        const {
            length
        } = stickyElements;
        const {
            index
        } = element;

        let currentElement;

        let i = 0;


        for (; i < length; i++) {
            currentElement = stickyElements[i];

            if (!currentElement.parent &&
                element.left < currentElement.right && element.right > currentElement.left &&
                i < index) {
                element.offsetTop = Math.max(element.offsetTop, currentElement.offsetTop + currentElement.height);
                element.maxHeight = _windowHeight - element.offsetTop;
            }
        }
    }

    function calculateOffsetTop() {
        arrangeElementsByTop();
        _stickyElements.forEach(element => {
            setOffsetTop(element);
        });
    }

    function scrollHandler() {
        const scrollTop = window.pageYOffset;

        _stickyElements.forEach(element => {
            const isCrossedUpperBorder = element.top + element.containerScrollTop - element.offsetTop < scrollTop;
            const isCrossedLowerBorder = element.top + element.height + element.offsetFromFixed <= scrollTop + _windowHeight;

            if (isCrossedUpperBorder) {
                const elementScrollBottom = scrollTop + element.offsetTop + element.height - element.containerScrollTop;
                const parentBottom = element.parentTop + element.parentHeight - element.additionalMarginBottom;
                const isNotFixed = !element.fixed;

                if (isNotFixed && element.isHovered && !isCrossedLowerBorder) {
                    element.containerScrollTop = scrollTop - element.top + element.offsetTop;

                    return;
                }

                element.container.addClass('__fixed');
                element.fixed = true;
                element.container.css('top', element.offsetTop);

                if (element.maxHeight <= element.height) {
                    element.container.css({
                        overflow: 'auto',
                        'max-height': element.maxHeight,
                    });

                    if (isNotFixed) {
                        element.container.scrollTop(element.containerScrollTop);
                    }
                }

                if (element.parent && elementScrollBottom >= parentBottom) {
                    element.fixedToParentBottom = true;
                    element.container.css({
                        position: 'absolute',
                        top: 'auto',
                        bottom: element.positionContextTop + element.positionContext.height() - parentBottom,
                        'max-height': '',
                        'padding-bottom': '',
                    });
                } else {
                    element.fixedToParentBottom = false;
                    element.container.css({
                        position: '',
                        bottom: '',
                        'padding-bottom': element.offsetFromFixed,
                    });
                }

                if (element.scrollLock && !element.fixedToParentBottom) {
                    _$body.css('overflow', (element.offsetTop + element.height) > _windowHeight ? 'hidden' : '');
                }
            } else {
                if (element.top - element.offsetTop > scrollTop) {
                    element.containerScrollTop = 0;
                }

                element.container.removeClass('__fixed');
                element.fixed = false;
                element.container.css({
                    top: '',
                    overflow: '',
                    'max-height': '',
                });

                if (element.scrollLock && !element.fixedToParentBottom) {
                    _$body.css('overflow', '');
                }
            }
        });
    }

    function getPositionContext(element) {
        const parent = element.parent();

        if (parent.css('position') !== 'static' || parent.is('body')) {
            return parent;
        }

        return getPositionContext(parent);
    }

    /**
     * Get background color of closest container or module with relative styling
     * @param {jQuery} $element
     * @returns {String|Null}
     */
    function getParentBgColor($element) {
        const $parents = $element.parents();

        let parentBgColor = '';

        let bgColorParent;

        for (let i = 0; i < $parents.length; i++) {
            bgColorParent = $($parents[i]).css('background-color');

            if (bgColorParent !== 'rgba(0, 0, 0, 0)' && bgColorParent !== 'transparent') {
                parentBgColor = bgColorParent;

                break;
            }
        }

        return parentBgColor;
    }

    /**
     * Get background gradient of closest container or module with relative styling
     * @param {jQuery} $element
     * @returns {String|Null}
     */
    function getParentBgGradient($element) {
        const $parents = $element.parents();

        let parentBgGradient = '';

        let bgGradientParent;

        for (let i = 0; i < $parents.length; i++) {
            bgGradientParent = $($parents[i]).css('background-image');

            if (bgGradientParent !== 'none' && bgGradientParent !== 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)') {
                parentBgGradient = bgGradientParent;

                break;
            }
        }

        return parentBgGradient;
    }

    /**
     * Detect background video of closest container or module with relative styling
     * @param {jQuery} $element
     * @returns {Boolean}
     */
    function hasParentVideoBg($element) {
        const $parents = $element.parents();

        let isParentHasVideo = false;

        for (let i = 0; i < $parents.length; i++) {
            isParentHasVideo = $($parents[i]).hasClass('js-video-background');

            if (isParentHasVideo) {
                break;
            }
        }

        return isParentHasVideo;
    }

    function updateContainerBgColor($container) {
        const bgColorCache = $container.data('backgroundColor');
        const isBgColorCache = typeof bgColorCache !== 'undefined';

        if (isBgColorCache && bgColorCache === '') {
            return;
        }

        const bgColor = isBgColorCache ? bgColorCache : getParentBgColor($container);
        const bgGradient = getParentBgGradient($container);
        const bgVideo = hasParentVideoBg($container);

        if (!isBgColorCache) {
            $container.data('backgroundColor', bgColor);
        }

        if (bgColor) {
            $container.css('background-color', bgColor);
        }

        if (bgGradient || bgVideo) {
            $container.css('background', 'transparent');
        }
    }

    function resizeHandler() {
        _windowHeight = window.innerHeight;
        _stickyElements.forEach(element => prepareSticky(element));
        calculateOffsetTop();
        _$window.trigger('scroll.sticky');
    }
});

// Initialize Sticky module
Moff.modules.initClass('Sticky', {
    scopeSelector: 'body',
});
/* eslint-enable no-param-reassign */