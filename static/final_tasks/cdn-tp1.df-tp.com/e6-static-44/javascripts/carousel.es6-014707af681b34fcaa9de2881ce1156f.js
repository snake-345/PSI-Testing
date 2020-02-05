/**
 * @module Carousel Factory
 */
Moff.modules.create('CarouselFactory', function() {
    'use strict';

    const _module = this;
    const _blockName = 'carousel';
    const _defaultSelectors = {
        item: `.js-${_blockName}-item`,
        prev: `.js-${_blockName}-prev`,
        next: `.js-${_blockName}-next`,
        dots: `.js-${_blockName}-dots`,
        dot: `.js-${_blockName}-dot`,
    };
    const _defaultOptions = {
        animationDurarition: 650,
        animation: 'scroll', // 'scroll' || 'fade'
        autoScroll: true,
        autoScrollInterval: 3000,
        autoScrollAutostart: true,
        circular: true,
        controls: true,
        customAnimation: {},
        itemWidth: null,
        itemMove: null,
        lazyInit: true,
        lazyLoading: false,
        lazyLoadingPreventScroll: false,
        margin: null,
        pagination: true,
        pauseOnHover: true,
        perPage: 1,
        vertical: false,
        waitLoadedContent: false,
        width: 'auto',
        horizontalAlignment: 'left',
        height: 'auto',
    };
    const _carouselEventsAliases = {
        beforeinit: 'carousel:beforeinit',
        afterinit: 'carousel:afterinit',
        destroy: 'carousel:destroy',
        reload: 'carousel:reload',
        resize: 'carousel:resize',
        create: 'jcarousel:create',
        createend: 'jcarousel:createend',
        scroll: 'jcarousel:scroll',
        scrollend: 'jcarousel:scrollend',
        controlactive: 'jcarouselcontrol:active',
        controlinactive: 'jcarouselcontrol:inactive',
    };

    let _lazyImagesModule = null;

    this.modifiers = {
        carouselIsLoaded: `${_blockName}_loaded`,
        carouselIsVertical: `${_blockName}_vertical`,
        itemIsVisible: `${_blockName}__item_visible`,
        itemIsFullWidth: `${_blockName}__item_full-width`,
        dotIsActive: `${_blockName}__dot_active`,
        controlIsLoaded: `${_blockName}__control-loaded`,
        controlIsHidden: `${_blockName}__control-hidden`,
    };
    this.carousels = [];

    /**
     * Creating new carousel instance
     * @param {Object} config
     * @return {Carousel}
     */
    this.create = config => new Carousel(config); // eslint-disable-line no-use-before-define

    /**
     * Carousel base class
     * @class Carousel
     */
    class Carousel {
        constructor({
            name,
            $carousel,
            options = {},
            selectors = {}
        }) {
            _module.carousels[name] = this;

            this.name = name;
            this.$carousel = $carousel;
            this.options = $.extend({}, _defaultOptions, options);
            this.sel = $.extend({}, _defaultSelectors, selectors);

            return this;
        }

        init() {
            const initFunction = () => {
                if (this.options.waitLoadedContent) {
                    _waitLoadedContent.call(this, () => {
                        this.initCarousel();
                    });
                } else {
                    this.initCarousel();
                }
            };

            if (this.options.lazyInit) {
                Moff.modules.get('InViewport').once({
                    $elements: this.$carousel,
                    inCallback: initFunction,
                });
            } else {
                initFunction();
            }
        }

        initCarousel() {
            const {
                $carousel,
                options
            } = this;

            $carousel
                .addClass(_module.modifiers.carouselIsLoaded)
                .toggleClass(_module.modifiers.carouselIsVertical, options.vertical)
                .data({
                    carousel: {
                        options,
                        sel: this.sel
                    }
                });
            _attachEventHandlers.call(this);
            $carousel.trigger(_carouselEventsAliases.beforeinit);

            $carousel
                .jcarousel({
                    animation: options.animationDurarition,
                    transitions: {
                        transforms3d: true
                    },
                    vertical: options.vertical,
                    wrap: options.circular ? 'circular' : null,
                })
                .jcarouselSwipe({
                    draggable: options.animation !== 'fade',
                    method: options.animation,
                    perSwipe: _getItemMove(options),
                });

            if ($.isPlainObject(options.customAnimation) && !$.isEmptyObject(options.customAnimation)) {
                $carousel.jcarouselCustomAnimation(options.customAnimation);
            }

            if (options.autoScroll) {
                $carousel
                    .jcarouselAutoscroll({
                        interval: options.autoScrollInterval,
                        autostart: options.autoScrollAutostart,
                        target: `+=${_getItemMove(options)}`,
                        method: options.animation,
                    })
                    .jcarouselInViewport();
            }

            if (options.lazyLoading) {
                $carousel.jcarouselLazyLoading({
                    waitFunction: _lazyLoadingWaitFunction.bind(this),
                    preventScroll: options.lazyLoadingPreventScroll,
                });
            }

            if (options.controls) {
                this.buildArrows();
            }

            if (options.pagination) {
                this.buildPagination();
            }

            this.updateDimensions();
            _toggleControls.call(this);
            _setItemsIndexes.call(this);
            $carousel.trigger(_carouselEventsAliases.afterinit);
        }

        on(events, handler) {
            if (typeof handler === 'undefined') {
                return false;
            }

            if (typeof handler !== 'function') {
                throw new Error('Handler should be Function');
            }

            const normilizedEvents = events
                .trim()
                .replace(/  +/g, ' ')
                .split(' ')
                .map(event => {
                    if (_carouselEventsAliases.hasOwnProperty(event)) {
                        return _carouselEventsAliases[event];
                    }

                    throw new Error(`No event (${event}) find for this carousel instance`);
                })
                .join(' ');

            this.$carousel.on(normilizedEvents, handler);

            return this;
        }

        /**
         * Reloads carousel or if you want to change options at runtime
         * @param {Object} newOptions
         * @return {Boolean}
         */
        reload(newOptions) {
            Object.keys(newOptions || {}).forEach(option => {
                const val = newOptions[option];

                if (val !== this.options[option]) {
                    this.options[option] = val;

                    switch (option) {
                        case 'perPage':
                            _reloadPerPage.call(this, val);

                            break;

                            /* TODO: Provide all necessary options in arg */
                    }
                }
            });

            this.$carousel.jcarousel('reload');

            if (this.options.controls) {
                this.$prev.jcarouselControl('reload');
                this.$next.jcarouselControl('reload');
            }

            if (this.options.pagination) {
                this.$dots
                    .jcarouselPagination('reloadCarouselItems')
                    .jcarouselPagination('reload');
            }

            _toggleControls.call(this);
            _setItemsIndexes.call(this);

            if (this.options.autoScroll) {
                if (_hasPages.call(this)) {
                    this.$carousel.jcarouselInViewport('enable');
                } else {
                    this.$carousel.jcarouselInViewport('disable');
                }
            }

            this.$carousel.trigger(_carouselEventsAliases.reload);

            return this;
        }

        destroy() {
            const {
                $carousel
            } = this;

            if (!$carousel.hasClass(_module.modifiers.carouselIsLoaded)) {
                return;
            }

            if (this.options.autoScroll) {
                $carousel
                    .off('mouseenter mouseleave')
                    .jcarouselAutoscroll('destroy');
            }

            if (this.options.controls) {
                this.$prev.jcarouselControl('destroy');
                this.$next.jcarouselControl('destroy');
            }

            if (this.options.pagination) {
                this.$dots
                    .off('jcarouselpagination:active jcarouselpagination:inactive')
                    .jcarouselPagination('destroy');
            }

            $carousel
                .off('jcarousel:reload jcarousel:reloadend')
                .jcarousel('destroy')
                .jcarouselSwipe('destroy')
                .removeClass(_module.modifiers.carouselIsLoaded)
                .removeAttr('style')
                .trigger(_carouselEventsAliases.destroy);

            $carousel
                .find(this.sel.item)
                .removeAttr('style');

            Object.keys(_carouselEventsAliases || {}).forEach(alias => {
                $carousel.off(_carouselEventsAliases[alias]);
            });

            $(window).off('scroll.jcarousel');

            delete _module.carousels[this.name];
        }

        updateDimensions() {
            const {
                $carousel
            } = this;
            const $item = $carousel.find(this.sel.item);
            const {
                width,
                height
            } = this.options;

            if (width !== 'auto' && width !== '100%' && /^\d+px$/.test(width)) {
                $carousel.css({
                    maxWidth: width
                });
            }

            if (height !== 'auto') {
                $carousel.css({
                    height
                });
                $item.css({
                    height
                });
            }

            _fitItems.call(this);

            return this;
        }

        buildArrows() {
            const {
                $carousel,
                sel
            } = this;

            if (!$carousel.find(sel.prev).length) {
                $carousel.append(`<a href="#" class="${_blockName}__arrow ${_blockName}__arrow_prev ${sel.prev.slice(1)}"><div class="${_blockName}__arrow-icon df-icon df-icon-angle-left"></div></a>`);
            }

            if (!$carousel.find(sel.next).length) {
                $carousel.append(`<a href="#" class="${_blockName}__arrow ${_blockName}__arrow_next ${sel.next.slice(1)}"><div class="${_blockName}__arrow-icon df-icon df-icon-angle-right"></div></a>`);
            }

            this.$prev = $carousel.find(sel.prev);
            this.$next = $carousel.find(sel.next);

            this.$prev.jcarouselControl({
                target: `-=${_getItemMove(this.options)}`,
                method: this.options.animation,
            });

            this.$next.jcarouselControl({
                target: `+=${_getItemMove(this.options)}`,
                method: this.options.animation,
            });
        }

        buildPagination() {
            const {
                $carousel,
                sel
            } = this;

            if (!$carousel.find(sel.dots).length) {
                $carousel.append(`<div class="${_blockName}__dots ${sel.dots.slice(1)}"></div>`);
            }

            this.$dots = $carousel.find(sel.dots);

            this.$dots
                .on('jcarouselpagination:active jcarouselpagination:inactive', sel.dot, function(event) {
                    $(this).toggleClass(_module.modifiers.dotIsActive, event.type === 'jcarouselpagination:active');
                })
                .jcarouselPagination({
                    item: page => `<span class="${_blockName}__dot ${sel.dot.slice(1)}" data-item="${page}"></span>`,
                    method: this.options.animation,
                    perPage: this.options.perPage,
                });
        }

        autoscroll(method) {
            const methods = ['start', 'stop'];

            if (methods.indexOf(method) === -1) {
                throw new Error('Wrong method called for this carousel');
            }

            if (!_hasPages.call(this)) {
                return;
            }

            this.$carousel.jcarouselAutoscroll(method);
        }

        scroll(target, animate = true) {
            let normilizedTarget = target;

            if (!_hasPages.call(this)) {
                return this;
            }

            if (typeof target === 'number' && this.options.circular) {
                normilizedTarget = _getItemPosByIndex.call(this, target);
            }

            this.$carousel.jcarousel('scroll', normilizedTarget, animate);

            return this;
        }

        scrollIntoView(target, animate = true) {
            this.$carousel.jcarousel('scrollIntoView', target, animate);
        }

        getCurrentSlide() {
            return this.$carousel.data('jcarousel').target();
        }

        getCurrentSlideIndex() {
            return parseInt(this.getCurrentSlide().data('item-index'), 10);
        }
    }

    /**
     * Attaching event handlers
     * @private
     */
    function _attachEventHandlers() {
        const _this = this;
        const {
            $carousel,
            sel
        } = this;

        $carousel
            .on('jcarousel:reload', () => {
                if (_isWidthChanged($carousel)) {
                    _this.updateDimensions();
                    $carousel.trigger(_carouselEventsAliases.resize);
                }
            })
            .on('jcarousel:createend jcarousel:scrollend', () => {
                _markVisibleItems.call(_this);
            })
            .on('jcarousel:reloadend', () => {
                _markVisibleItems.call(_this);
                _alignHorizontally.call(_this);
            });

        if (_this.options.autoScroll && _this.options.pauseOnHover) {
            $carousel
                .on('mouseenter', () => {
                    $carousel.jcarouselAutoscroll('stop');
                })
                .on('mouseleave', () => {
                    if (!$carousel.data('autoScrollPaused') && _hasPages.call(_this)) {
                        $carousel.jcarouselAutoscroll('start');
                    }
                });
        }

        if (_this.options.controls) {
            $carousel.find(`${sel.prev}, ${sel.next}`)
                .on('jcarouselcontrol:active', event => {
                    $carousel.trigger(_carouselEventsAliases.controlactive, {
                        event
                    });
                    $(event.currentTarget).removeClass(_module.modifiers.controlIsHidden);
                })
                .on('jcarouselcontrol:inactive', event => {
                    $carousel.trigger(_carouselEventsAliases.controlinactive, {
                        event
                    });
                    $(event.currentTarget).addClass(_module.modifiers.controlIsHidden);
                });
        }
    }

    function _alignHorizontally() {
        const {
            $carousel,
            options
        } = this;
        const $items = $carousel.jcarousel('items');
        const itemsLength = $items.length;
        const itemWidth = $items.outerWidth(true);
        const itemMargin = itemWidth - $items.outerWidth();

        let shift = 0;

        if (itemsLength > options.perPage || (options.horizontalAlignment !== 'center' && options.horizontalAlignment !== 'right')) {
            return;
        }

        switch (options.horizontalAlignment) {
            case 'center':
                shift = (($carousel.outerWidth() - (itemWidth * itemsLength) + itemMargin) / 2);
                break;
            case 'right':
                shift = $carousel.outerWidth() - (itemWidth * itemsLength) + itemMargin;
                break;
        }

        $carousel.jcarousel('move', {
            left: `${shift}px`
        });
    }

    function _hasPages() {
        return this.$carousel.jcarousel('items').length > this.options.perPage;
    }

    /**
     * Waits loading images and metadata for video
     * @param {Function} callback - Function which running after loading content
     * @private
     */
    function _waitLoadedContent(callback) {
        const {
            $carousel,
            sel
        } = this;
        const videos = $carousel.find('video');

        let videosCount = videos.length;

        let videosCounter = 0;

        let isImageLoaded = false;

        let isVideoLoaded = videosCount === 0;

        let isCallbackCalled = false;

        $carousel.imagesLoaded()

            // Remove failed images
            .progress((instance, image) => {
                if (!image.isLoaded) {
                    $(image.img).closest(sel.item).remove();
                }
            })

            // Waiting load all carousel images
            .always(() => {
                isImageLoaded = true;
                runCallback();
            });

        // Check availability of metadata
        $.each(videos, function() {
            const video = this;

            if (video.videoWidth > 0 && video.videoHeight > 0) {
                isVideoLoaded = ++videosCounter === videosCount;
                $(this).data('isLoaded', true);
                runCallback();
            }
        });

        // Waiting metadata for each video
        videos.on('loadedmetadata', function() {
            if (!$(this).data('isLoaded')) {
                isVideoLoaded = ++videosCounter === videosCount;
            }

            runCallback();
        });

        $.each(videos.filter('.error'), function() {
            const errorVideo = $(this);

            errorVideo.closest(sel.item).remove();
            isVideoLoaded = videosCounter === --videosCount;

            runCallback();
        });

        videos.find('source').on('error', function() {
            $(this).closest(sel.item).remove();

            isVideoLoaded = videosCounter === --videosCount;
            runCallback();
        });

        function runCallback() {
            if (isVideoLoaded && isImageLoaded && !isCallbackCalled) {
                isCallbackCalled = true;
                callback();
            }
        }
    }

    /**
     * Checking if Carousel width changed
     * @param {jQuery} $carousel
     * @return {Boolean}
     * @private
     */
    function _isWidthChanged($carousel) {
        const newWidth = $carousel.outerWidth();
        const oldWidth = typeof $carousel.data('width') === 'undefined' ? 0 : $carousel.data('width');

        let isChanged = false;

        $carousel.data('width', newWidth);

        if (newWidth !== oldWidth) {
            isChanged = true;
        }

        return isChanged;
    }

    /**
     * Hide pagination if we doesn't need it
     * @private
     */
    function _toggleControls() {
        const isNeedHide = this.$carousel.find(this.sel.item).length <= this.options.perPage;

        this.$carousel.find(`${this.sel.dots}, ${this.sel.next}`)
            .toggleClass(_module.modifiers.controlIsHidden, isNeedHide);

        this.$carousel.find(`${this.sel.prev}`)
            .toggleClass(_module.modifiers.controlIsHidden,
                (!this.options.circular && this.getCurrentSlideIndex() === 0) ||
                isNeedHide);
    }

    /**
     * Setting indexes for items
     * @private
     */
    function _setItemsIndexes() {
        const {
            $carousel,
            sel
        } = this;
        const $items = $carousel.find(sel.item);

        for (let i = 0; i < $items.length; i++) {
            $($items[i]).attr('data-item-index', i);
        }
    }

    /**
     * Marking visible items with modificator
     * @private
     */
    function _markVisibleItems() {
        const {
            $carousel
        } = this;

        $carousel.find(this.sel.item).removeClass(_module.modifiers.itemIsVisible);
        $carousel.jcarousel('fullyvisible').addClass(_module.modifiers.itemIsVisible);
    }

    /**
     * Setting proper sources for relative images, removing preloaders after lazyLoading complete
     * @param {jQuery} $slides
     * @private
     */
    function _lazyLoadingWaitFunction($slides) {
        if (!_lazyImagesModule) {
            _lazyImagesModule = Moff.modules.get('LazyImages');
        }

        _lazyImagesModule.load({
            $scope: $slides,
            isDisableTransition: this.options.lazyLoadingPreventScroll,
        });
    }

    /**
     * Fitting items by preferred widths (by breakpoints) in options
     * @private
     */
    function _fitItems() {
        const {
            $carousel
        } = this;
        const $item = $carousel.find(this.sel.item);
        const {
            width,
            margin: marginRight,
            perPage
        } = _calcItemParams.call(this);

        if (width) {
            $item.css({
                width
            });
        }

        $item.css({
            marginRight
        });

        this.reload({
            perPage
        });
    }

    /**
     * Getting calc params for items according minimum width of item and margin range between items
     * @return {Object}
     * @private
     */
    function _calcItemParams() {
        const {
            $carousel,
            options
        } = this;
        const $item = $carousel.find(this.sel.item);
        const carouselWidth = $carousel.width();
        const minItemWidths = options.itemWidth;

        let params = {
            width: minItemWidths,
            margin: 0,
            perPage: options.perPage,
        };

        if ($item.hasClass(_module.modifiers.itemIsFullWidth)) {
            params.width = carouselWidth;
        }

        if ($.isPlainObject(minItemWidths)) {
            const minWidth = minItemWidths[Moff.getMode()];
            const marginRange = options.margin !== null && $.isPlainObject(options.margin) ?
                options.margin :
                {
                    min: 10,
                    max: 10
                };
            const minMargin = marginRange.min;
            const maxMargin = marginRange.max;

            if (minWidth < carouselWidth) {
                const visibleSlides = Math.floor((carouselWidth + minMargin) / (minWidth + minMargin));
                const space = carouselWidth - minWidth * visibleSlides;
                const isEnoughSpace = space / (visibleSlides - 1) <= maxMargin;

                params = {
                    width: isEnoughSpace ?
                        minWidth :
                        minWidth + (space - maxMargin * (visibleSlides - 1)) / visibleSlides,
                    margin: isEnoughSpace ?
                        space / (visibleSlides - 1) :
                        maxMargin,
                    perPage: visibleSlides,
                };
            }
        }

        return params;
    }

    /**
     * Getting length of items to move according itemMove and perPage from options
     * @param {Object} options
     * @return {Number}
     * @private
     */
    function _getItemMove(options) {
        return options.itemMove ? options.itemMove : options.perPage;
    }

    /**
     * Reload carousel with new perPage value
     * @param {Number} newPerPage
     * @private
     */
    function _reloadPerPage(newPerPage) {
        const itemMoveByPerPage = _getItemMove(this.options);

        this.$carousel.jcarouselSwipe('reload', {
            perSwipe: itemMoveByPerPage,
        });

        if (this.options.autoScroll) {
            this.$carousel.jcarouselAutoscroll('reload', {
                target: `+=${itemMoveByPerPage}`,
            });
        }

        if (this.options.controls) {
            this.$prev.jcarouselControl('reload', {
                target: `-=${itemMoveByPerPage}`,
            });
            this.$next.jcarouselControl('reload', {
                target: `+=${itemMoveByPerPage}`,
            });
        }

        if (this.options.pagination) {
            this.$dots
                .jcarouselPagination('reload', {
                    perPage: newPerPage,
                });
        }
    }

    /**
     * Get the position of item relative to carousel (ex. item [data-item-index="1"] is not really 1 in collection)
     * @param {Number} index - data-item-index of item
     * @returns {Number} the position of item relative to the original collection
     * @private
     */
    function _getItemPosByIndex(index) {
        return Number(this.$carousel.find(this.sel.item).filter(`[data-item-index="${index}"]`).index());
    }
});

Moff.modules.initClass('CarouselFactory', {
    scopeSelector: 'body',
});