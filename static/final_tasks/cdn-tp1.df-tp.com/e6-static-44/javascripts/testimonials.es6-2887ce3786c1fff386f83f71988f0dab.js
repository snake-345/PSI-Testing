import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './in-viewport.es6-46373fca6273eaaff5ee5a19e4f7af58.js';
import './carousel.es6-bb6b2e70c2d5e620dc33b287106ed0e0.js';
/**
 * @module Testimonials
 */
Moff.modules.create('TestimonialsTheme1', function() {
    'use strict';

    const _module = this;
    const _defaultOptions = {
        autoscroll: false,
        showArrows: false,
        showDots: false,
    };

    let _config;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        _config = $.extend(_defaultOptions, convertConfigToObject(_module.config.itemOptions));
        this.slideshow = Moff.modules.getByName('CarouselFactory')[0].create({
            name: 'TestimonialsTheme1',
            $carousel: _module.$find('.js-testimonials-slider'),
            options: {
                autoScroll: _config.autoscroll,
                controls: _config.showArrows,
                pagination: _config.showDots,
            },
        });

        _module.afterCssLoaded(() => {
            _module.slideshow.init();
            initMoreLink();
        });
    };

    /**
     * Converting config Array to Object
     * @param {Array} configArray
     * @return {Object}
     */
    function convertConfigToObject(configArray) {
        return configArray.reduce((obj, key) => {
            obj[key] = true; // eslint-disable-line no-param-reassign

            return obj;
        }, {});
    }

    function initMoreLink() {
        _module.$find('.js-more-link').on('click', function(event) {
            const link = $(this);
            const hiddenText = link.closest('.js-testimonial-comment').find('.js-hidden-text');
            const element = link.closest('.js-more');

            if (!hiddenText.length) {
                return;
            }

            hiddenText.removeClass('hidden');
            element.remove();
            event.preventDefault();
        });
    }
});
Moff.modules.initByConfig('TestimonialsTheme1');