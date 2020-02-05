/**
 * @module Fixed
 */
/* eslint-disable no-param-reassign */
Moff.modules.create('Fixed', function() {
    'use strict';

    /* Restrictions:
     *   - Only three position on bottom, no fixed elements on top
     *   - Provide offset only for sticky elements with parent */

    const LEFT = 'bottom-left';
    const RIGHT = 'bottom-right';
    const FULL = 'bottom-full';
    const _fixedElements = {
        [LEFT]: [],
        [RIGHT]: [],
        [FULL]: []
    };

    let _windowHeight,
        _windowWidth,
        _$window;

    /**
     * Initialization
     * @method init
     */
    this.init = function() {
        _windowHeight = window.innerHeight;
        _windowWidth = window.innerWidth;
        _$window = $(window);
        _$window.on('resize.fixed', Moff.utils.debounce(() => {
            if (Moff.detect.OS.iOS && _windowWidth === window.innerWidth) {
                return; // avoid resize on Safari scroll
            }

            _resizeHandler();
        }, 500));
    };

    this.initFixed = function($element, options = {}) {
        const position = (options.position === undefined || !_isCorrectPosition(options.position)) ? RIGHT : options.position;

        let index = (options.index === undefined || Number.isNaN(Number(options.index))) ? _fixedElements[position].length : Number(options.index);

        if (!$element.length || _isFixedElement($element) || Moff.ENV.get('isPreview')) {
            return;
        }

        if (options.placeAfter && _isFixedElement(options.placeAfter)) {
            ({
                index
            } = options.placeAfter.data('fixedElement'));
        }

        const fixedElement = _prepareFixed({
            $element,
            options,
            margin: options.margin || 0,
            index,
            position,
        });

        _fixedElements[fixedElement.position].push(fixedElement);
        $element.data('fixedElement', fixedElement);
        _arrangeFixedElements();
        Moff.event.trigger('fixed.update');
    };

    this.destroyFixed = function($element) {
        const fixedElement = $element.data('fixedElement');

        if (!_isFixedElement($element)) {
            return;
        }

        _fixedElements[fixedElement.position] = _fixedElements[fixedElement.position]
            .filter(element => element.$element.get(0) !== fixedElement.$element.get(0));

        $element
            .removeData('fixedElement')
            .css({
                bottom: '',
                'max-height': '',
            });
        this.reCalculateFixed();
    };

    this.reCalculateFixed = function() {
        _resizeHandler();
    };

    /**
     * Get bottom offset for sticky with a parent for made it available to interact
     * @param {object} element
     * @returns {Number}
     */
    this.getFixedElementsOffset = function(stickyElement) {
        let fixedElementsHeight = 0;

        _fixedElements[FULL].forEach(fixedElement => {
            fixedElementsHeight = fixedElement.offsetBottom + fixedElement.height;
        });

        [LEFT, RIGHT].forEach(position => {
            _fixedElements[position].forEach(fixedElement => {
                if ((fixedElement.position === LEFT && stickyElement.left < fixedElement.right) ||
                    (fixedElement.position === RIGHT && stickyElement.right > fixedElement.left)) {
                    fixedElementsHeight = fixedElement.offsetBottom + fixedElement.height;
                }
            });
        });

        return fixedElementsHeight;
    };

    this.getFixedElements = function(position) {
        return _isCorrectPosition(position) ? _fixedElements[position] : [];
    };

    function _isFixedElement($element) {
        return !!$element.length && !!$element.data('fixedElement');
    }

    function _isCorrectPosition(position) {
        return [LEFT, RIGHT, FULL].indexOf(position) !== -1;
    }

    function _resizeHandler() {
        _windowHeight = window.innerHeight;
        _windowWidth = window.innerWidth;
        _prepareFixedElements();
        _arrangeFixedElements();
        Moff.event.trigger('fixed.update');
    }

    function _prepareFixedElements() {
        Object.keys(_fixedElements)
            .forEach(position => _fixedElements[position]
                .forEach(element => _prepareFixed(element)));
    }

    function _arrangeFixedElements() {
        const previousElements = {};

        [FULL, LEFT, RIGHT].forEach(position => {
            const fixedElements = _fixedElements[position];

            fixedElements.sort(_sorting);

            for (let i = 0; i < fixedElements.length; i++) {
                const previousElement = position !== FULL ? (previousElements[position] || previousElements[FULL]) : previousElements[position];

                let maxHeight = '';

                if (previousElement) {
                    const margin = Math.max(previousElement.margin, fixedElements[i].margin);

                    fixedElements[i].offsetBottom = previousElement.offsetBottom + previousElement.height + margin;
                } else {
                    fixedElements[i].offsetBottom = fixedElements[i].bottom;
                }

                if (!fixedElements[i].ghost) {
                    previousElements[position] = fixedElements[i];
                }

                if (fixedElements[i].ghost || i === (fixedElements.length - 1)) {
                    maxHeight = `${_windowHeight - (fixedElements[i].offsetBottom + fixedElements[i].margin)}px`;
                }

                fixedElements[i].$element.css({
                    bottom: fixedElements[i].offsetBottom,
                    'max-height': maxHeight,
                });
            }
        });
    }

    function _sorting(a, b) {
        if (a.index > b.index) {
            return 1;
        }

        if (a.index < b.index) {
            return -1;
        }

        return 0;
    }

    function _prepareFixed(element) {
        const {
            $element,
            options
        } = element;

        $element.css('bottom', '');

        const {
            top,
            left
        } = $element.position();
        const width = $element.outerWidth();
        const height = $element.outerHeight();

        let ghost = options.ghost || false;

        if ($element.css('display') === 'none' || !$element.is(':visible')) {
            ghost = true;
        }

        return $.extend(element, {
            offsetBottom: 0,
            ghost,
            height,
            width,
            top,
            left,
            right: left + width,
            bottom: _windowHeight - top - height,
        });
    }
});

// Initialize Fixed module
Moff.modules.initClass('Fixed');
/* eslint-enable no-param-reassign */