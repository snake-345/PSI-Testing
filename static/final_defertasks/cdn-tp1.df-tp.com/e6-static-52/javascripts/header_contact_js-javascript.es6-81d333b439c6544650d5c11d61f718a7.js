/**
 * @module HeaderContact
 */
Moff.modules.create('HeaderContact', function() {
    'use strict';

    const MODULE = this;
    const SEL = {
        popoverLink: '.js-popover',
        popoverArrow: '.arrow',
        locationLink: '.js-location',
        hoursLink: '.js-hours',
        phonesLink: '.js-phones',
        container: window.isTwinTurbo ? '.js-e6-layout-popover' : '.container-global',
        getDirection: '.js-get-direction',
        getDirectionPopover: '.js-get-direction-popover',
        getDirectionMap: '.js-get-direction-map',
        getDirectionMapImage: '.js-get-direction-map-img',
        getDirectionDealer: '.js-get-direction-dealer',
        getDirectionForm: '.js-get-direction-form',
        getDirectionFromAddress: '.js-get-direction-from-address',
        getDirectionToAddress: '.js-get-direction-to-address',
        autocompleteContainer: '.pac-container:last',
        autocompleteItem: '.pac-item',
        autocompleteHelper: '.js-autocomplete-helper',
        table: '.js-header-contact-table',
    };
    const MOD = {
        dealerSelected: 'get-direction__dealer_selected',
        mapNotClickable: 'get-direction__map_not-clickable',
        tableLayoutColumn: 'header-contact__table_layout_column',
    };

    let _mapIsLoaded = false;

    let _autocompleteRequested = false;

    let _autocomplete;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        MODULE.afterCssLoaded(_initPopovers);

        $(MODULE.scope)
            .on('shown.bs.popover', SEL.locationLink, function() {
                const $popover = $(this).data('bs.popover').$tip;

                if (!_mapIsLoaded) {
                    const dsaData = {
                        data: {
                            GoogleMapObject: {
                                isStatic: true,
                            },
                        },
                    };

                    Moff.event.trigger('dsa.mapShown', dsaData);
                    Moff.event.trigger('dsa.staticMapLoad', dsaData);
                    _mapIsLoaded = true;
                }

                _initAutocomplete($popover);
                _initAnalyticsHandlers($popover);
                _initDealerSelect($popover);
            })
            .on('inserted.bs.popover', `${SEL.hoursLink}, ${SEL.phonesLink}`, function() {
                const $popover = $(this).data('bs.popover').$tip;

                _fitTables($popover.find(SEL.table), $popover);
            })
            .on('hidden.bs.popover', SEL.locationLink, function() {
                _destroyAutocomplete($(this).data('bs.popover').$tip);
            });
    };

    const _debouncedTogglePhonesPopover = Moff.utils.debounce(() => {
        _togglePhonesPopover();

        // Popover('destroy') is asynchronous function, it waiting 150 ms for transition end,
        // that is why we can not init new popover on same element right after destroy popover
    }, 200);

    function _initPopovers() {
        MODULE.$find(`${SEL.hoursLink}, ${SEL.locationLink}`).popover({
            html: true,
            container: MODULE.scope,
            placement: 'bottom',
            trigger: 'enhancedHover',
        });

        _debouncedTogglePhonesPopover();
        $(window).on('resize', () => {
            _debouncedTogglePhonesPopover();
        });
    }

    function _togglePhonesPopover() {
        const $phonesPopover = MODULE.$find(SEL.phonesLink);
        const isSingleDealerMode = !MODULE.data.dealersData;
        const hidePhonesTableOnDesktop = !MODULE.data.showPhonesTable;
        const isPhoneNumberVisible = Moff.getMode() !== 'xs';

        if ($phonesPopover.length === 0) {
            return;
        }

        if (isPhoneNumberVisible && hidePhonesTableOnDesktop && isSingleDealerMode) {
            $phonesPopover.popover('destroy');
            $phonesPopover.removeClass('js-no-phone');
        } else if (!$phonesPopover.data()['bs.popover']) {
            $phonesPopover.popover({
                html: true,
                container: MODULE.scope,
                placement: 'bottom',
                trigger: 'enhancedHover',
            });
            $phonesPopover.addClass('js-no-phone');
        }
    }

    function _initDealerSelect($popover) {
        const $dealers = $popover.find(SEL.getDirectionDealer);

        $popover
            .on('click', SEL.getDirectionMap, function(event) {
                if ($(this).hasClass(MOD.mapNotClickable)) {
                    event.preventDefault();
                }
            })
            .on('click', SEL.getDirectionDealer, function(event) {
                const $dealer = $(this);
                const dealerId = $dealer.data('id');

                if ($dealer.hasClass(MOD.dealerSelected)) {
                    return;
                }

                $dealers.removeClass(MOD.dealerSelected);
                $dealer.addClass(MOD.dealerSelected);

                Moff.cookie.set('header_contact_dealer', dealerId, {
                    expires: 31 * 24 * 60 * 60,
                    path: '/',
                });

                _destroyAutocomplete($popover);
                _updateView(MODULE.data.dealersData[dealerId]);
                _initAutocomplete($popover);

                event.preventDefault();
            });
    }

    function _fitTables($tables, $parent) {
        const parentWidth = $parent.width();

        $.each($tables, function() {
            const $table = $(this);

            $table.toggleClass(MOD.tableLayoutColumn, $table.width() > parentWidth);
        });
    }

    function _updateView(data) {
        const $locations = $(data.locations);
        const locationPopoverContent = $locations.data('content');
        const $locationLink = MODULE.$find(SEL.locationLink);
        const $locationPopover = $locationLink.data('bs.popover').$tip;
        const locationLinkLeft = $locationLink.offset().left;

        MODULE.$find(SEL.hoursLink).replaceWith(data.hours);
        MODULE.$find(SEL.phonesLink).replaceWith(data.phones);

        const locationLinkOffset = $locationLink.offset().left - locationLinkLeft;

        if (locationLinkOffset !== 0) {
            $locationPopover.css('left', $locationPopover.position().left + locationLinkOffset);
        }

        $locationLink
            .attr('data-content', locationPopoverContent)
            .html($locations.html());
        $locationPopover.find(SEL.getDirectionPopover).replaceWith(locationPopoverContent);
        _initPopovers();
        _initAnalyticsHandlers($locationPopover);
    }

    function _initAutocomplete($popover) {
        const $input = $popover.find(SEL.getDirection);

        if (!$input.length) {
            return;
        }

        Moff.loadAssets({
            js: [window.lazyJavasciptDependencies.googleMapApi]
        }, () => {
            _autocomplete = new google.maps.places.Autocomplete($input[0], {
                types: ['geocode'],
            });

            // Move autocomplete dropdown into popup
            setTimeout(() => $input.after($(SEL.autocompleteContainer)), 300);

            $popover
                .on('mousedown', SEL.autocompleteItem, () => {
                    // Helper for not closing popover after removed .pac-container
                    $input.after($('<div class="js-autocomplete-helper"></div>').css({
                        height: $(SEL.autocompleteContainer).height(),
                        position: 'absolute',
                        left: 0,
                        right: 0,
                    }));
                })
                .on('mouseup', function() {
                    const autocompleteHelper = $(this).find(SEL.autocompleteHelper);

                    if (autocompleteHelper.length) {
                        $input.closest('form').trigger('submit');
                        autocompleteHelper.remove();
                    }
                });

            if (!_autocompleteRequested) {
                Moff.event.trigger('dsa.mapPlacesAutocomplete');
                _autocompleteRequested = true;
            }
        });
    }

    /**
     * Handles analytics events
     * @param {Object} $popover
     * @private
     */
    function _initAnalyticsHandlers($popover) {
        const $fromAddress = $popover.find(SEL.getDirectionFromAddress);
        const toAddress = $popover.find(SEL.getDirectionToAddress).val();
        const primaryDealerId = Moff.modules.get('DataLayer').findData('PrimaryDealerId');

        $popover.find(SEL.getDirectionForm).on('submit', event => {
            const $currentTarget = $(event.currentTarget);
            const fromAddress = $fromAddress.val() || 'Current Location';

            Moff.event.trigger('dsa.getDirections', {
                links: [`DealerObject_${primaryDealerId}`],
                data: {
                    FromAddress: fromAddress,
                    ToAddress: toAddress,
                    UIObject: {},
                    LinkObject: {
                        text: $currentTarget.text().trim(),
                        href: $currentTarget.attr('href'),
                    },
                },
            });
        });

        $popover.find(SEL.getDirectionMap).on('click', event => {
            const $map = $(event.currentTarget);

            Moff.event.trigger('dsa.getDirections', {
                links: [`DealerObject_${primaryDealerId}`],
                data: {
                    FromAddress: 'Current Location',
                    ToAddress: toAddress,
                    UIObject: {},
                    LinkObject: {
                        text: $map.find(SEL.getDirectionMapImage).attr('alt'),
                        href: $map.attr('href'),
                    },
                },
            });
        });
    }

    function _destroyAutocomplete($popover) {
        if (!_autocomplete) {
            return;
        }

        $popover.off('mousedown mouseup');
        google.maps.event.clearInstanceListeners(_autocomplete);
    }
});