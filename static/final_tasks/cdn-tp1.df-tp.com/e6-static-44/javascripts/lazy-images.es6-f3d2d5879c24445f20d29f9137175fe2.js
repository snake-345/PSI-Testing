import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './in-viewport.es6-46373fca6273eaaff5ee5a19e4f7af58.js';
/**
 * @module LazyImages
 */
Moff.modules.create('LazyImages', function() {
    'use strict';

    const MODULE = this;
    const SEL = {
        img: 'img',
        lazyImages: '.js-lazy-picture-in-viewport',
        lazyImagesSources: 'img[data-src], img[data-srcset], source[data-srcset], source[data-sizes]',
        wrapper: '.js-lazy-picture-wrapper',
        preloader: '.js-lazy-picture-preloader',
        placeholder: '.js-lazy-picture-placeholder',
    };
    const MOD = {
        loading: 'lazy-picture_loading',
    };

    let _$scope,
        _inViewport;

    this.init = function() {
        _$scope = $(MODULE.scope);
        _inViewport = Moff.modules.get('InViewport');
        _initLoadingImagesOnInViewport();
    };

    this.reInit = function($scope = _$scope) {
        _initLoadingImagesOnInViewport($scope);
    };

    this.load = config => {
        if (_isAlreadyPending(config.$scope) || MODULE.isImagesLoaded(config.$scope)) {
            return;
        }

        new Loader(config); // eslint-disable-line no-new, no-use-before-define
    };

    this.isImagesLoaded = function($scope = _$scope) {
        const $images = $scope.find(SEL.img);
        const count = $images.length;

        let loadedImages = 0;

        $.each($images, function() {
            if (_checkImage(this)) {
                loadedImages++;
            }
        });

        return loadedImages === count;
    };

    function _initLoadingImagesOnInViewport($scope = _$scope) {
        _inViewport.once({
            $elements: $scope.find(SEL.lazyImages),
            inCallback($element) {
                MODULE.load({
                    $scope: $element.parent()
                });
            },
        });
    }

    /**
     * Setting proper sources for relative images, removing preloaders after lazyLoading complete
     * @class Loader
     * @param {jQuery} $scope
     * @param {Function} callback
     * @private
     */
    class Loader {
        constructor({
            $scope,
            callback,
            isDisableTransition = false
        }) {
            this.$scope = $scope;
            this.$images = $scope.find(SEL.lazyImagesSources);
            this.$wrappers = $scope.find(SEL.wrapper);
            this.$preloaders = $scope.find(SEL.preloader);
            this.$placeholders = $scope.find(SEL.placeholder);
            this.isDisableTransition = isDisableTransition;
            this.callback = callback;
            this.loadAttempts = 0;

            this.init();
        }

        init() {
            this.$images
                .toggleClass('non-transition', this.isDisableTransition)
                .each(function() {
                    const $img = $(this);
                    const src = $img.attr('data-src');
                    const srcset = $img.attr('data-srcset');
                    const sizes = $img.attr('data-sizes');

                    $img
                        .addClass(MOD.loading)
                        .attr({
                            src,
                            srcset,
                            sizes
                        })
                        .removeAttr('data-src')
                        .removeAttr('data-srcset')
                        .removeAttr('data-sizes');

                    // Reevaluate <picture> if picturefill used for support <picture> in old browsers
                    /* eslint-disable no-undef */
                    if (typeof window.picturefill === 'function' && $img.is('img')) {
                        picturefill({
                            reevaluate: true,
                            elements: [$img[0]],
                        });
                    }
                    /* eslint-enable no-undef */
                });

            this._wait();
        }

        _wait() {
            const _this = this;

            this.loadAttempts++;

            if (MODULE.isImagesLoaded(this.$scope)) {
                this._loadingCompleteCallback();
            } else if (_this.loadAttempts <= 100) { // Wait maximum 10 seconds
                setTimeout(() => {
                    _this._wait();
                }, 100);
            } else {
                this._loadingCompleteCallback();
            }
        }

        _loadingCompleteCallback() {
            if (typeof this.callback !== 'undefined') {
                this.callback();
            }

            this.loadAttempts = 0;
            this.$images.removeClass(MOD.loading).trigger('lazy-load.complete');

            this.$preloaders.remove();
            this.$placeholders.remove();
            this.$wrappers.children().unwrap();
        }
    }

    function _checkImage(img) {
        if (!img.complete) {
            return false;
        }

        return !(typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0);
    }

    function _isAlreadyPending($scope) {
        const $images = $scope.find('img');

        return $images.hasClass(MOD.loading).length === $images.length;
    }
});

Moff.modules.initClass('LazyImages', {
    scopeSelector: 'body',
});