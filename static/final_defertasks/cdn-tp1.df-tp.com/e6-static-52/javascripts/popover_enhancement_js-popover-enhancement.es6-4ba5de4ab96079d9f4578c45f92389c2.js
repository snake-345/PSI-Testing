(function() {
    'use strict';

    const {
        init
    } = $.fn.popover.Constructor.prototype;
    const {
        destroy
    } = $.fn.popover.Constructor.prototype;

    $.fn.popover.Constructor.prototype.init = function(type, element, options) {
        const clonedOptions = $.extend({}, options);

        if (clonedOptions.trigger === 'enhancedHover') {
            const $el = $(element);

            let popover;

            $el
                .on('touchend.popover-enhancement click.popover-enhancement', event => {
                    if (event.type === 'touchend') {
                        $el.popover('toggle');
                    }

                    event.preventDefault();
                })
                .on('mouseenter.popover-enhancement', () => {
                    if (!popover) {
                        $el.popover('show');
                    }
                })
                .on('show.bs.popover', () => {
                    setTimeout(() => {
                        popover = true;
                        $el.addClass('active');

                        $(window).on('touchend.popover-enhancement mousemove.popover-enhancement', event => {
                            if (!$(event.target).closest('.popover, .js-popover.active').length) {
                                $el.popover('hide');
                            }
                        });
                    }, 0);
                })
                .on('hide.bs.popover', () => {
                    popover = false;
                    $el.removeClass('active');
                    $(window).off('touchend.popover-enhancement mousemove.popover-enhancement');
                });

            clonedOptions.trigger = 'manual';
        }

        init.call(this, type, element, clonedOptions);
    };

    $.fn.popover.Constructor.prototype.destroy = function() {
        if (this.$element) {
            this.$element.off('.popover-enhancement');
        }

        destroy.call(this);
    };
}());