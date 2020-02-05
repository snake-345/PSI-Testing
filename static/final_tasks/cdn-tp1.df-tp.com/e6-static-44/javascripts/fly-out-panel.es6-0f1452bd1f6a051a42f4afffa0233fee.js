/**
 * @module FlyOutPanels
 */
Moff.modules.create('FlyOutPanels', function() {
    'use strict';

    const _module = this;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        Moff.event.on('fly-out-panel.show', name => {
            show(_module.$find(`.js-fly-out-panel[data-name="${name}"]`));
        });

        Moff.event.on('fly-out-panel.hide', name => {
            hide(_module.$find(`.js-fly-out-panel[data-name="${name}"]`));
        });

        Moff.event.on('fly-out-panel.force-hide', () => {
            hide(_module.$find('.js-fly-out-panel'));
        });

        addHideHandlers();
    };

    function show(panel) {
        hide(_module.$find('.js-fly-out-panel'));
        $('html').css('overflow', 'hidden');
        panel.addClass('__show');
    }

    function hide(panel) {
        $('html').css('overflow', '');
        panel.removeClass('__show');
    }

    function addHideHandlers() {
        let startCoords;

        $(_module.scope)
            .on('touchstart mousedown', '.js-fly-out-panel', event => {
                startCoords = getCoords(event);
            })
            .on('touchend touchcancel mouseup', '.js-fly-out-panel', function(event) {
                let endCoords,
                    diffX,
                    diffY;
                const isLeft = $(this).hasClass('__left');

                if (startCoords) {
                    endCoords = getCoords(event);
                    diffX = startCoords.x - endCoords.x;
                    diffY = startCoords.y - endCoords.y;

                    if (($(event.target).hasClass('js-hide-fly-out-panel') && Math.abs(diffY) < 10 && Math.abs(diffX) < 10) ||
                        (Math.abs(diffY) < 10 && Math.abs(diffX) > 30 && ((isLeft && diffX > 0) || (!isLeft && diffX < 0)))) {
                        Moff.event.trigger('fly-out-panel.hide', $(this).data('name'));
                    }

                    startCoords = false;
                }
            });

        $(document).on('keyup', event => {
            if (event.keyCode === Moff.keys.escape) {
                hide(_module.$find('.js-fly-out-panel'));
            }
        });
    }

    function getCoords(e) {
        const event = e.originalEvent || e || window.event;

        if (event.touches !== undefined && event.touches.length > 0) {
            return {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY,
            };
        }
        if (event.changedTouches !== undefined && event.changedTouches.length > 0) {
            return {
                x: event.changedTouches[0].pageX,
                y: event.changedTouches[0].pageY,
            };
        }
        if (event.pageX !== undefined) {
            return {
                x: event.pageX,
                y: event.pageY,
            };
        }
        return {
            x: event.clientX,
            y: event.clientY,
        };
    }
});


// Initialize FlyOutPanels module
Moff.modules.initClass('FlyOutPanels', {
    scopeSelector: 'body',
});