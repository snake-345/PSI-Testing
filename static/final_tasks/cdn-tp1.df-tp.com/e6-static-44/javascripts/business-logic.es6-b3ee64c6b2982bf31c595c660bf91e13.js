/**
 * @module SocialLink
 */
Moff.modules.create('SocialLink', function() {
    'use strict';

    const MODULE = this;

    const SEL = {
        openInLightbox: '.js-social-link-open-in-lightbox',
        facebook: '.js-social-link-facebook',
        instagram: '.js-social-link-instagram',
        twitter: '.js-social-link-twitter',
        youtube: '.js-social-link-youtube',
    };

    const YOUTUBE_VIDEO_ID_REG_EXP = /(\.be\/|v=|embed\/)([^&?]+)/i;
    const INSTAGRAM_CACHE = {};

    let _popup;

    this.init = function() {
        _popup = Moff.modules.get('Popup');
        _loadSDKs();
        _handleFacebook();
        _handleYoutube();
        Moff.event.on('afterLeftovers', () => {
            _handleInstagram();
            _handleTwitter();
        });
    };

    function _loadSDKs() {
        // TODO: Need rid of inlineJS.push here. We can try move Moff.leftovers from inlineJS or add support to conditions to our asset compiler
        window.inlineJS.push(() => {
            if (MODULE.$find(`${SEL.instagram}${SEL.openInLightbox}`).length) {
                Moff.leftovers.push('//www.instagram.com/embed.js');
            }

            if (MODULE.$find(`${SEL.twitter}${SEL.openInLightbox}`).length) {
                Moff.leftovers.push('//platform.twitter.com/widgets.js');
            }
        });
    }

    function _handleFacebook() {
        $(MODULE.scope).on('click', `${SEL.facebook}${SEL.openInLightbox}`, event => {
            const url = encodeURIComponent($(event.currentTarget).attr('href'));
            const maxWidth = 500;

            _popup.openInlinePopup({
                maxWidth,
                callbacks: {
                    afterOpen() {
                        const computedStyle = window.getComputedStyle(this.contentContainer[0]);
                        const paddingTop = parseInt(computedStyle.paddingTop, 10);
                        const paddingBottom = parseInt(computedStyle.paddingBottom, 10);
                        const paddingLeft = parseInt(computedStyle.paddingLeft, 10);
                        const paddingRight = parseInt(computedStyle.paddingRight, 10);
                        const marginTop = parseInt(computedStyle.marginTop, 10);
                        const marginBottom = parseInt(computedStyle.marginBottom, 10);
                        const marginLeft = parseInt(computedStyle.marginLeft, 10);
                        const marginRight = parseInt(computedStyle.marginRight, 10);
                        const width = Math.min(window.innerWidth, maxWidth) - paddingLeft - paddingRight - marginLeft - marginRight;
                        const height = window.innerHeight - paddingTop - paddingBottom - marginTop - marginBottom;
                        const params = [
                            `href=${url}`,
                            'tabs=timeline',
                            `width=${width}`,
                            `height=${height}`,
                            'small_header=false',
                            'adapt_container_width=true',
                            'hide_cover=false',
                            'show_facepile=false',
                        ];

                        this.content.html(`<iframe 
							src="https://www.facebook.com/plugins/page.php?${params.join('&')}"
							width="${width}"
							height="${height}"
							style="border: none; overflow: hidden; display: block;"
							scrolling="no"
							frameborder="0"
							allowTransparency="true"
							allow="encrypted-media
							style=""></iframe>`);
                    },
                },
            });

            event.preventDefault();
        });
    }

    function _handleYoutube() {
        $(MODULE.scope).on('click', `${SEL.youtube}${SEL.openInLightbox}`, event => {
            const url = $(event.currentTarget).attr('href');

            let videoId = url.match(YOUTUBE_VIDEO_ID_REG_EXP);

            if (!videoId) {
                return;
            }

            /* eslint-disable prefer-destructuring */
            videoId = videoId[2];
            /* eslint-enable prefer-destructuring */
            _popup.openInlinePopup({
                maxWidth: 800,
                content() {
                    return `<div class="aspect-ratio-block __xs-16x9">
						<iframe src="//youtube.com/embed/${videoId}"
								style="position: absolute; height: 100%; width: 100%;"
								frameborder="0"
								allowfullscreen
								allowtransparency></iframe>
					</div>`;
                },
            });

            event.preventDefault();
        });
    }

    function _handleInstagram() {
        $(MODULE.scope).on('click', `${SEL.instagram}${SEL.openInLightbox}`, event => {
            const url = $(event.currentTarget).attr('href');

            _popup.openInlinePopup({
                maxWidth: 500,
                waiting(loaded) {
                    _getInstagramContent(url, html => {
                        this.content.html(html.replace(/min-width:.+?;/i, ''));
                        loaded();
                        setTimeout(() => {
                            window.instgrm.Embeds.process();
                            this.content.find('.instagram-media').css('min-width', '');
                        }, 0);
                    });
                },
            });

            event.preventDefault();
        });
    }

    function _handleTwitter() {
        $(MODULE.scope).on('click', `${SEL.twitter}${SEL.openInLightbox}`, event => {
            const url = $(event.currentTarget).attr('href');

            _popup.openInlinePopup({
                maxWidth: 500,
                content() {
                    return `<a class="twitter-timeline" href="${url}"></a>`;
                },
                callbacks: {
                    afterOpen() {
                        window.twttr.widgets.load();
                    },
                },
            });

            event.preventDefault();
        });
    }

    function _getInstagramContent(url, callback) {
        if (INSTAGRAM_CACHE[url]) {
            callback(INSTAGRAM_CACHE[url]);
        } else {
            $.get(`https://api.instagram.com/oembed/?url=${url}&omitscript=true`, response => {
                INSTAGRAM_CACHE[url] = response.html;
                callback(response.html);
            });
        }
    }
});

Moff.modules.initClass('SocialLink', {
    scopeSelector: 'body',
});