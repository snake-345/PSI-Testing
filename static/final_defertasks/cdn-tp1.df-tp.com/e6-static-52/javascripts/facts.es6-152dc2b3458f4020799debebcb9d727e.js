// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/javascripts/in-viewport/in-viewport.es6.js';
/**
 * @module Facts
 */
Moff.modules.create('FactsTheme1', function() {
    'use strict';

    const _module = this;
    const _animationSpeed = 650;

    let _animation,
        _current;
    const _sel = {
        phrase: '.js-phrase',
        fixedPart: '.js-fixed-words',
        animation: '.js-animated-words',
        animationWord: '.js-animated-word',
        animationLetter: '.js-animated-letter',
    };

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        const phrase = _module.$find(_sel.phrase);

        _animation = _module.$find(_sel.animation);

        _module.afterCssLoaded(() => {
            fitPhrase(phrase);
            $(window).on('resize', () => {
                fitPhrase(phrase);
                setWidth(_current);
            });

            _animation
                .css('visibility', '')
                .addClass('__init');

            _current = _animation.find(`${_sel.animationWord}:first`).toggleClass('__visible __hidden');

            if (_animation.hasClass('__rotate2')) {
                toggleLetters(_current.find(_sel.animationLetter));
            }

            setWidth(_current);
            startLoop();
        });
    };

    function startLoop() {
        setTimeout(() => {
            if (_animation.hasClass('__clip')) {
                _animation.width(0);

                setTimeout(() => {
                    nextWord(startLoop);
                }, _animationSpeed);
            } else {
                nextWord(startLoop);
            }
        }, _module.config.delay * 1000);
    }

    function nextWord(callback) {
        let next = _current.next();

        next = next.length ? next : _animation.find(`${_sel.animationWord}:first`);

        _current.toggleClass('__visible __hidden');
        next.toggleClass('__visible __hidden');

        if (_animation.hasClass('__rotate2')) {
            toggleLetters(_current.find(_sel.animationLetter), next.find(_sel.animationLetter));
        }

        setWidth(next);
        _current = next;
        setTimeout(callback, _animationSpeed);
    }

    function toggleLetters(current, next = $()) {
        let i = 0;
        const length = Math.max(current.length, next.length);

        for (; i < length; i++) {
            toggleLetter(current, next, i);
        }
    }

    function toggleLetter(current, next, index) {
        const delay = 20;

        setTimeout(() => {
            current.eq(index).add(next.eq(index)).toggleClass('__in __out');
        }, index * delay);
    }

    function setWidth(item) {
        const space = 8; // Needs for clip animation

        _animation.width(item.width() + (_animation.hasClass('__clip') ? space : 0));
    }

    function fitPhrase($phrase) {
        const $animatedWrapper = $phrase.find(_sel.animation);
        const $animatedWords = $phrase.find(_sel.animationWord);
        const $fixedWords = $phrase.find(_sel.fixedPart);
        const additionalSpace = 20;

        let width = 0;


        $fixedWords.css('font-size', '');
        $animatedWrapper.css('font-size', '');

        $.each($animatedWords, function() {
            width = Math.max($(this).width(), width);
        });

        width += $fixedWords.width() + additionalSpace;

        const multiplier = Math.min($phrase.width() / width, 1);

        $fixedWords.css('font-size', parseInt($fixedWords.css('font-size'), 10) * multiplier);
        $animatedWrapper.css('font-size', parseInt($animatedWrapper.css('font-size'), 10) * multiplier);
    }
});
Moff.modules.initByConfig('FactsTheme1');