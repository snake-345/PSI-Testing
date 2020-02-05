/**
 * @module Base Carousel
 */
Moff.modules.create('CarouselHelpers', function() {
    'use strict';

    /**
     * Adjusting elements height
     * @param {jQuery} $elements
     */
    this.adjustHeight = function($elements) {
        let height = 0;

        let i = 0;

        $elements.css('height', '');

        for (; i < $elements.length; i++) {
            const element = $elements[i];

            height = Math.max(height, element.offsetHeight);
        }

        $elements.height(height);
    };
});

Moff.modules.initClass('CarouselHelpers', {
    scopeSelector: 'body',
});