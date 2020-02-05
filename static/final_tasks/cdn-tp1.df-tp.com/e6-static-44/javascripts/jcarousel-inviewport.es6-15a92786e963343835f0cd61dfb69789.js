/**
 * Check if slider is in viewport and start / stop it by this condition
 */

($ => {
    'use strict';

    const inViewport = Moff.modules.get('InViewport');
    const inViewportClass = 'carousel_in-visible-viewport';

    $.jCarousel.plugin('jcarouselInViewport', {
        _isEnabled: true,
        _init() {
            const _this = this;
            const $carousel = this.carousel();

            if (!_isCarouselAutoscroll($carousel)) {
                return;
            }

            inViewport.on({
                $elements: $carousel,
                inCallback($carouselEl) {
                    $carouselEl.data('isInViewport', true);
                    _this._autoscrollStart();
                },
                outCallback($carouselEl) {
                    $carouselEl.data('isInViewport', false);
                    _this._autoscrollStop();
                },
            });
        },
        enable() {
            this._isEnabled = true;

            if (!this.carousel().data('isInViewport')) {
                return this;
            }
            this._autoscrollStart();

            return this;
        },
        disable() {
            this._isEnabled = false;
            this._autoscrollStop();

            return this;
        },
        isEnabled() {
            return this._isEnabled;
        },
        _autoscrollStart() {
            if (!this.isEnabled()) {
                return;
            }

            this.carousel()
                .jcarouselAutoscroll('start')
                .data('autorotateInited', true)
                .addClass(inViewportClass);
        },
        _autoscrollStop() {
            this.carousel()
                .jcarouselAutoscroll('stop')
                .data('autorotateInited', false)
                .removeClass(inViewportClass);
        },
    });

    function _isCarouselAutoscroll($carousel) {
        const autoscroll = $carousel.data('jcarouselautoscroll');

        return typeof autoscroll !== 'undefined' &&
            autoscroll &&
            $carousel.jcarouselAutoscroll('options').autostart;
    }
})(jQuery);