// import '../jquery.es6.js';
// import '../../vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../popover-enhancement.es6.js';
// import '../global.es6.js';
// import '../in-viewport/in-viewport.es6.js';
/**
 * @module Container
 */
Moff.modules.create('Container', function() {
    'use strict';

    const _module = this;

    let _videoBackgrounds;

    this.init = function() {
        const header = _module.$find('.js-layout-header-block');
        const firstFullHeight = _module.$find('.js-layout-main-block > .js-container:first.js-full-height-container, ' +
            '.js-layout-main-block > .js-container:first .js-full-height-container');

        initLazyBackground();

        if (!Moff.detect.isMobile) {
            initVideoBackground();
        }

        if (firstFullHeight.length) {
            _module.afterCssLoaded(() => {
                $(window)
                    .on('resize.container-full-height', () => firstFullHeight.css('min-height', `calc(100vh - ${header.outerHeight()}px)`))
                    .trigger('resize.container-full-height');
            });
        }
    };

    function initLazyBackground() {
        const $lazyBackgrounds = _module.$find('.js-container-lazy-background');

        if (!$lazyBackgrounds.length) {
            return;
        }

        // It's hack, because our asset resolver works not really good, and can't work with dependancies in widget container normally
        setTimeout(() => {
            Moff.modules.get('InViewport').once({
                $elements: _module.$find('.js-container-lazy-background'),
                inCallback($container) {
                    $container.css('background-image', '');
                    Moff.event.trigger('container.lazy-background-set', {
                        $container
                    });
                },
            });
        }, 50);
    }

    function initVideoBackground() {
        _videoBackgrounds = _module.$find('.js-video-background');

        if (!_videoBackgrounds.length) {
            return;
        }

        _module.afterCssLoaded(() => {
            $(window)
                .on('resize.container-video-background', () => {
                    $.each(_videoBackgrounds, (index, element) => resizeVideoBackground($(element)));
                })
                .trigger('resize.container-video-background');
        });

        window.onYouTubeIframeAPIReady = function() {
            $.each(_videoBackgrounds, function() {
                let inner = $(this).find('.js-video-background-inner');
                const video = $(this).find('.js-video-background-iframe');

                video.data('player', new window.YT.Player(video[0], {
                    videoId: video.data('id'),
                    playerVars: {
                        rel: 0,
                        autoplay: 1,
                        showinfo: 0,
                        controls: 0,
                        loop: 1,
                        /* eslint-disable camelcase */
                        iv_load_policy: 3,
                        /* eslint-enable camelcase */
                        modestbranding: 1,
                        fs: 1,
                    },
                    events: {
                        onReady(event) {
                            const player = event.target;
                            const duration = player.getDuration();

                            player.mute();
                            inner.addClass('__ready');
                            setTimeout(function loop() {
                                const delay = 1.3;

                                if (player.getCurrentTime() + delay >= duration) {
                                    player.seekTo(0);
                                }

                                setTimeout(loop, 150);
                            }, 150);
                        },
                        onStateChange(event) {
                            const player = event.target;

                            if (event.data === window.YT.PlayerState.PLAYING && inner) {
                                inner.addClass('__playing');
                                inner = false;
                            }

                            if (event.data === window.YT.PlayerState.ENDED) {
                                player.seekTo(0);
                            }
                        },
                    },
                }));
            });
        };
    }

    function resizeVideoBackground(videoBackground) {
        const video = videoBackground.find('.js-video-background-iframe');
        const wrapperWidth = videoBackground.outerWidth();
        const wrapperHeight = videoBackground.outerHeight();
        const ratio16x9 = 16 / 9;

        let videoWidth,
            videoHeight;

        if (wrapperWidth / wrapperHeight < ratio16x9) {
            videoHeight = wrapperHeight;
            videoWidth = videoHeight * ratio16x9;
        } else {
            videoWidth = wrapperWidth;
            videoHeight = videoWidth / ratio16x9;
        }

        video
            .width(videoWidth)
            .height(videoHeight)
            .css({
                'margin-top': (wrapperHeight - videoHeight) / 2,
                'margin-left': (wrapperWidth - videoWidth) / 2,
            });
    }
});
Moff.modules.initClass('Container', {
    scopeSelector: 'body',
});