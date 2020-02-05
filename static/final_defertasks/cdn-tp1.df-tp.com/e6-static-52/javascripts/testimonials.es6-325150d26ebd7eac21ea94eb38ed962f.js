// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/javascripts/in-viewport/in-viewport.es6.js';
// import '../../../../../../../assets/javascripts/carousel.es6.js';
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