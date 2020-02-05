/**
 * @module Misc
 */
Moff.modules.create('Misc', function() {
    'use strict';

    /**
     * @property {module:Misc} _module - link to class instance
     * @private
     */
    const _module = this;

    /**
     * @inheritDoc
     */
    this.init = function() {
        _analyticsExternalClick();
    };

    function _analyticsExternalClick() {
        $(_module.scope).on('click', 'a', function() {
            const $link = $(this);

            if (/^tel:/.test($link[0].href) && !$link.hasClass('js-no-phone')) {
                const dataLayer = Moff.modules.get('DataLayer');
                const primaryVehicleId = dataLayer.findData('PrimaryVehicleId');
                const eventData = {
                    links: [`DealerObject_${dataLayer.findData('PrimaryDealerId')}`],
                    data: {
                        PhoneObject: {
                            number: $link[0].href.replace('tel:', ''),
                            department: $link.data('department'),
                        },
                        LinkObject: {
                            text: $link.text().trim(),
                            href: $link.attr('href'),
                            url: $link[0].href,
                            action: 'Link',
                        },
                    },
                };

                if (primaryVehicleId) {
                    eventData.links.push(`VehicleObject_${primaryVehicleId}`);
                }

                Moff.event.trigger('dsa.clickToCall', eventData);
            } else if (window.location.hostname !== $link[0].hostname && $link[0].hostname.length && !$link.hasClass('js-buttons-share')) {
                Moff.event.trigger('dsa.externalClick', {
                    data: {
                        ExternalLink: {
                            href: $link[0].href || $link[0].innerText.trim(),
                        },
                    },
                });
            } else if (window.location.hostname === $link[0].hostname) {
                const eventData = {
                    data: {
                        InternalLink: {
                            href: $link[0].href || $link[0].innerText.trim(),
                        },
                    },
                };

                if ($link.data('target-page-type')) {
                    eventData.data.InternalLink.targetPageType = $link.data('target-page-type');
                }

                Moff.event.trigger('dsa.internalClick', eventData);
            }

            if ($link.data('custom-attribute')) {
                Moff.event.trigger('dsa.customClick', {
                    data: {
                        CustomLink: {
                            attribute: $link.data('custom-attribute'),
                        },
                    },
                });
            }
        });
    }
});
Moff.modules.initClass('Misc', {
    scopeSelector: 'body',
});