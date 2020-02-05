import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './fixed.es6-3d04d3aeee19d5cbd0cd177b759622e8.js';
import './sticky.es6-7df793e1cbd1154f47a2c8380733df61.js';
import './geolocation.es6-7b30dcef7a33486c9b6b7fcd11274d59.js';

/**
 * @module AnnouncementBar
 */
Moff.modules.create('AnnouncementBarTheme1', function() {
    'use strict';

    const MODULE = this;
    const BLOCK_NAME = 'announce-bar';
    const ANIMATION_DURATION = 300;
    const SEL = {
        announceBar: `.js-${BLOCK_NAME}`,
        container: `.js-${BLOCK_NAME}-container`,
        timer: `.js-${BLOCK_NAME}-timer`,
        timerDays: `.js-${BLOCK_NAME}-timer-d`,
        timerHours: `.js-${BLOCK_NAME}-timer-h`,
        timerMinutes: `.js-${BLOCK_NAME}-timer-m`,
        timerSeconds: `.js-${BLOCK_NAME}-timer-s`,
        closeIcon: `.js-${BLOCK_NAME}-close`,
        ctaButton: `.js-${BLOCK_NAME}-cta-button`,
    };
    const MOD = {
        barBottom: `${BLOCK_NAME}_bottom`,
        barClosing: `${BLOCK_NAME}_closing`,
        barHidden: `${BLOCK_NAME}_hidden`,
        timerHidden: `${BLOCK_NAME}__timer_invisible`,
    };

    let _$scope,
        _$announceBar,
        _stickyModule,
        _fixedModule,
        _timerExpires;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        _$scope = $(MODULE.scope);
        _$announceBar = _$scope.find(SEL.announceBar);
        _stickyModule = Moff.modules.get('Sticky');
        _fixedModule = Moff.modules.get('Fixed');

        _initTimer();
        _handleEvents();

        MODULE.afterCssLoaded(() => {
            if (MODULE.data.isGeolocationRequired) {
                _initGeolocation();
            } else {
                _showBar();
            }

            _toggleSticky();
        });
    };

    /**
     * Initing Geolocation for this module
     * @private
     */
    function _initGeolocation() {
        MODULE.updateViewOnGetPosition({
            success() {
                _$announceBar = _$scope.find(SEL.announceBar);

                _initTimer();
                _toggleSticky();
                _showBar();
            },
            error() {
                _showBar();
            },
        });
    }

    /**
     * Attaching event handlers for Announce bar
     * @private
     */
    function _handleEvents() {
        $(window).on('resize', _toggleSticky);
        _$scope.on('click', SEL.closeIcon, event => {
            _hideBar();
            event.preventDefault();
        });
        _$scope.on('click', SEL.ctaButton, _hideBar);
    }

    /**
     * Toggling Sticky component by screen size
     * @private
     */
    function _toggleSticky() {
        if (!_$announceBar.length) {
            return;
        }

        if (_isBarSticky()) {
            _stickyModule.initSticky(_$announceBar);
        } else {
            _stickyModule.destroySticky(_$announceBar);
        }
    }

    /**
     * Init timer countdown
     * @private
     */
    function _initTimer() {
        const $timer = _$scope.find(SEL.timer);

        _timerExpires = `${$timer.data('timer-expires')}T00:00`;

        if (!$timer.length) {
            return;
        }

        const $timerDays = $timer.find(SEL.timerDays);
        const $timerHours = $timer.find(SEL.timerHours);
        const $timerMinutes = $timer.find(SEL.timerMinutes);
        const $timerSeconds = $timer.find(SEL.timerSeconds);

        $timerDays.text('0');
        $timerHours.text('00');
        $timerMinutes.text('00');
        $timerSeconds.text('00');
        let timeOrigin = performance.now();

        let isTimerRunning = true;

        let isTimerShowed = false;

        requestAnimationFrame(function run(timestamp) {
            if (((timestamp - timeOrigin) / 1000) >= 1) {
                const {
                    days,
                    hours,
                    minutes,
                    seconds
                } = _getRemainingTime();

                $timerDays.text(days);
                $timerHours.text(hours);
                $timerMinutes.text(minutes);
                $timerSeconds.text(seconds);

                timeOrigin = timestamp;

                if (!isTimerShowed) {
                    $timer.removeClass(MOD.timerHidden);
                    isTimerShowed = true;
                }

                if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                    _hideBar();
                    isTimerRunning = false;
                }
            }

            if (isTimerRunning) {
                requestAnimationFrame(run);
            }
        });
    }

    /**
     * Getting remaining time
     * @return {Object} - diff in {days, hours, minutes, seconds}
     * @private
     */
    function _getRemainingTime() {
        const diff = Date.parse(_timerExpires) - Date.now();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    /**
     * Showing bar
     * @private
     */
    function _showBar() {
        const delay = _$announceBar.data('delay') * 1000;

        _$announceBar.removeAttr('style');

        if (delay === 0 && !_$announceBar.hasClass(MOD.barHidden)) {
            return;
        }

        setTimeout(() => {
            const initialHeight = 0;
            const actualHeight = _$announceBar.find(SEL.container).outerHeight();

            _$announceBar
                .css({
                    height: initialHeight
                })
                .focus().css({
                    height: actualHeight
                });

            if (_isBarSticky()) {
                _stickyModule.reCalculateWithAnimation(_$announceBar, initialHeight, actualHeight, ANIMATION_DURATION);
            }

            setTimeout(() => {
                _$announceBar
                    .css({
                        height: 'auto'
                    })
                    .removeClass(MOD.barHidden);
                _fixedModule.reCalculateFixed();
            }, ANIMATION_DURATION);
        }, delay);
    }

    /**
     * Hiding bar animation
     * @return {boolean}
     * @private
     */
    function _hideBar() {
        const initialHeight = _$announceBar.outerHeight();

        _$announceBar
            .css({
                height: initialHeight
            })
            .focus().css({
                height: 0
            })
            .addClass(MOD.barClosing);

        if (_isBarSticky()) {
            _stickyModule.reCalculateWithAnimation(_$announceBar, initialHeight, 0, ANIMATION_DURATION);
        }

        _setCookieOnClose();

        setTimeout(() => {
            if (_isBarSticky()) {
                _stickyModule.destroySticky(_$announceBar);
            }

            _fixedModule.destroyFixed(_$announceBar);
            _$scope.remove();
        }, ANIMATION_DURATION);
    }

    /**
     * Setting cookie after closing
     * @private
     */
    function _setCookieOnClose() {
        const expireDays = _getCookieExpires();
        const name = `announceBarStatus_${_$announceBar.data('id')}`;

        if (expireDays === 0) {
            Moff.cookie.delete(name);

            return;
        }

        Moff.cookie.set(name, 'closed', {
            expires: expireDays,
            path: '/',
        });
    }

    /**
     * Getting Cookie expires by period in config
     * @returns {number}
     * @private
     */
    function _getCookieExpires() {
        const barDisplayFrequency = _$announceBar.data('freq');
        const oneHourSeconds = 60 * 60;
        const oneDaySeconds = oneHourSeconds * 24;
        const date = new Date();
        const daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const frequencyMap = {
            always: oneHourSeconds, // One hour because session cookie has problems in Chrome https://stackoverflow.com/questions/10617954/chrome-doesnt-delete-session-cookies
            first: oneDaySeconds * 365,
            day: oneDaySeconds,
            week: oneDaySeconds * 7,
            month: oneDaySeconds * daysInMonth,
        };

        return frequencyMap.hasOwnProperty(barDisplayFrequency) ?
            frequencyMap[barDisplayFrequency] :
            oneDaySeconds;
    }

    /**
     * Checking if Announcement bar is supposed to be Sticky
     * @return {boolean}
     * @private
     */
    function _isBarSticky() {
        return !/xs/.test(Moff.getMode()) && !_$announceBar.hasClass(MOD.barBottom);
    }
});
Moff.modules.initByConfig('AnnouncementBarTheme1');