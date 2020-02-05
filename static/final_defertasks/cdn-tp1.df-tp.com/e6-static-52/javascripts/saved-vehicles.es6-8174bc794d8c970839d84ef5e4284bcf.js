// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/components/fly-out-panel/fly-out-panel.es6.js';
// import '../../../../../../../assets/javascripts/in-viewport/in-viewport.es6.js';
// import '../../../../../../../assets/javascripts/lazy-images/lazy-images.es6.js';
/**
 * @module SavedVehicles
 */
Moff.modules.create('SavedVehiclesTheme1', function() {
    'use strict';

    const _module = this;
    const _sel = {
        overlay: '.js-saved-vehicles-overlay',
        overlayWrapper: '.js-saved-vehicles-overlay-wrapper',
        overlayMarker: '.js-saved-vehicles-marker',
        hideHint: '.js-saved-vehicles-hide-hint',
        hint: '.js-saved-vehicles-hint',
        removeBtn: '.js-vehicle-remove',
        tabBtn: '.js-saved-vehicles-tab',
        vehicleTabs: '.js-vehicles-tabs',
        vehicleList: '.js-vehicles-list',
        vehicleItem: '.js-saved-vehicle-item',
        savedCount: '.js-saved-vehicles-count',
        viewedCount: '.js-recently-viewed-count',
        compareVehicleCheckmark: '.js-compare-vehicle-checkmark',
        vehicleToCompare: '.js-select-to-compare',
        comparePanel: '.js-compare-panel',
        compareSelectedNumber: '.js-compare-selected-number',
        compareVehiclesLink: '.js-compare-link',
        clearVehiclesCheckmark: '.js-clear-vehicles',
    };
    const _mod = {
        headingTabActive: 'saved-vehicles__heading-tab_active',
        listActive: 'saved-vehicles-list_active',
        hidden: 'hidden',
        overlaySavedEnable: 'saved-vehicles-overlay_enable-saved-vehicles',
        overlayViewedEnable: 'saved-vehicles-overlay_enable-recently-viewed',
        hintTransparent: 'saved-vehicles-popover_transparent',
        markerActive: 'saved-vehicles-overlay__marker_active',
        position: '__left',
        compareSelected: 'saved-vehicles-list__item_selected',
        compareDisabled: 'compare-vehicles-panel__link_disabled',
    };

    let _$scope,
        _$overlayWrapper,
        _$overlay,
        _$hint,
        _position,
        _fixedModule,
        _lazyImagesModule,
        _isRecentlyViewedTabEnabled;

    let _isClickCompareVehiclesAllowed = false;

    let _isHintInited = false;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        _$scope = $(_module.scope);
        _lazyImagesModule = Moff.modules.get('LazyImages');
        _$overlayWrapper = _module.$find(_sel.overlayWrapper);
        _$overlay = _module.$find(_sel.overlay);
        _$hint = _module.$find(_sel.hint);
        _isRecentlyViewedTabEnabled = _module.config.recentlyViewedVehiclesEnabled;
        _fixedModule = Moff.modules.get('Fixed');
        _position = _$overlayWrapper.hasClass(_mod.position) ? 'bottom-left' : 'bottom-right';

        _initHint();
        _initFixed();
        _$overlay.on('click', event => {
            Moff.event.trigger('fly-out-panel.show', 'savedVehicles');
            _loadImages();
            event.preventDefault();
        });

        _$scope.on('click', _sel.removeBtn, function(event) {
            const $btn = $(this);
            const vuid = $btn.data('vuid');
            const vehicleType = $btn.data('vehicle-type');

            let vuids = Moff.cookie.get(vehicleType);

            if (vehicleType === 'saved_vehicles') {
                vuids = vuids ? JSON.parse(vuids) : [];
                vuids.splice(vuids.indexOf(vuid), 1);
            } else {
                vuids = vuids ? JSON.parse(vuids) : {};
                delete vuids[vuid];
            }

            if ($btn.closest(_sel.vehicleToCompare).hasClass(_mod.compareSelected)) {
                _handleCompareVehicle(event, vuid);
            }

            $btn.closest(_sel.vehicleItem).remove();

            Moff.cookie.set(vehicleType, JSON.stringify(vuids), {
                expires: 7 * 24 * 60 * 60,
                path: '/',
            });

            Moff.event.trigger(vehicleType === 'saved_vehicles' ? 'saved-vehicles.remove' : 'viewed-vehicles.remove', {
                vuids: vehicleType === 'saved_vehicles' ? vuids : Object.keys(vuids),
                withAjax: false,
            });

            if (vehicleType === 'saved_vehicles') {
                Moff.event.trigger('dsa.removeSavedVehicle', {
                    links: [`VehicleObject_${vuid}`],
                });
            }
            event.preventDefault();
        });

        _$scope.on('click', _sel.tabBtn, function() {
            const $this = $(this);

            if (!$this.hasClass(_mod.headingTabActive)) {
                _switchTab($this.data('tab'));
            }
        });

        Moff.event.on('saved-vehicles.add', event => _updateSavedVehicles(event.vuids, event.withAjax, 'saved-vehicles'));
        Moff.event.on('saved-vehicles.remove', event => _updateSavedVehicles(event.vuids, event.withAjax, 'saved-vehicles'));
        Moff.event.on('viewed-vehicles.remove', event => _updateSavedVehicles(event.vuids, event.withAjax, 'recently-viewed'));

        _$scope.on('click', _sel.compareVehicleCheckmark, _handleCompareVehicle);
        _$scope.on('click', _sel.clearVehiclesCheckmark, _handleClearAllComparedVehicles);

        _$scope.on('click', _sel.compareVehiclesLink, event => {
            if (!_isClickCompareVehiclesAllowed) {
                event.preventDefault();
            }
        });
    };

    function _initHint() {
        if (_module.config.tooltipDisplay &&
            _module.config.tooltipDisplay !== 'notShow' &&
            !_isHintInited &&
            !_$overlayWrapper.hasClass(_mod.hidden)) {
            if (!_$hint.length) {
                return;
            }

            _isHintInited = true;

            switch (_module.config.tooltipDisplay) {
                case 'showForThreeSeconds':
                    setTimeout(_hideHint, 3000);
                    break;
                case 'showUntilPageview':
                    $(window).on('beforeunload', _hideHint);
                    break;
            }

            _module.$find(_sel.hideHint).on('click', event => {
                _hideHint();
                event.preventDefault();
            });
        }
    }

    function _hideHint() {
        Moff.cookie.set('saved_vehicles_got_it', 1, {
            expires: 365 * 24 * 60 * 60,
            path: '/',
        });

        _fixedModule.destroyFixed(_$hint);
        _$hint.remove();
    }

    function _initFixed() {
        if (_$overlayWrapper.length && !_$overlayWrapper.hasClass(_mod.hidden)) {
            _fixedModule.initFixed(_$overlay, {
                position: _position,
                margin: 15
            });

            if (_$hint.length) {
                _fixedModule.initFixed(_$hint, {
                    position: _position,
                    ghost: true,
                    margin: 15
                });
                _$hint.removeClass(_mod.hintTransparent);
            }
        }
    }

    function _loadImages() {
        _lazyImagesModule.load({
            $scope: $(_module.scope)
        });
    }

    function _handleCompareVehicle(event, vehicleVuid = false) {
        const $checkmark = $(event.currentTarget);
        const $vehicleToCompare = $checkmark.closest(_sel.vehicleToCompare);
        const $compareVehicleLink = _module.$find(_sel.compareVehiclesLink);
        const vuid = vehicleVuid || $checkmark.closest(_sel.vehicleToCompare).data('vehicle-vuid');
        const selectedVehiclesCount = Number(_module.$find(_sel.compareSelectedNumber).text());
        const vuids = $compareVehicleLink.data('vuids');

        let resultVuids = [];

        resultVuids = resultVuids.concat(vuids).filter(el => el);

        _isClickCompareVehiclesAllowed = true;

        if ($vehicleToCompare.hasClass(_mod.compareSelected)) {
            _module.$find(_sel.compareSelectedNumber).text(selectedVehiclesCount - 1);
            resultVuids.splice(resultVuids.indexOf(vuid), 1);
        } else {
            _module.$find(_sel.compareSelectedNumber).text(selectedVehiclesCount + 1);
            resultVuids.push(vuid);
        }

        $compareVehicleLink.data('vuids', resultVuids);
        _module.$find(`${_sel.vehicleToCompare}[data-vehicle-vuid=${vuid}]`).toggleClass(_mod.compareSelected);

        if (resultVuids.length < 2) {
            _isClickCompareVehiclesAllowed = false;
            $compareVehicleLink.addClass(_mod.compareDisabled);
        } else {
            $compareVehicleLink.removeClass(_mod.compareDisabled);
        }

        const compareLink = new URL($compareVehicleLink.attr('href'));

        $compareVehicleLink.attr('href', `${compareLink.origin}${compareLink.pathname}?vuids=${resultVuids}`);
    }

    function _handleClearAllComparedVehicles() {
        const $compareVehicleLink = _module.$find(_sel.compareVehiclesLink);
        const $vehicles = _module.$find(_sel.vehicleToCompare);

        $vehicles.removeClass(_mod.compareSelected);
        _module.$find(_sel.compareSelectedNumber).text('0');
        $compareVehicleLink.data('vuids', '');
        $compareVehicleLink.addClass(_mod.compareDisabled);
        _isClickCompareVehiclesAllowed = false;
    }

    function _reselectComparedVehicles() {
        const $compareVehicleLink = _module.$find(_sel.compareVehiclesLink);
        const vuids = $compareVehicleLink.data('vuids');

        for (let i = 0; i < vuids.length; i++) {
            _module.$find(`${_sel.vehicleToCompare}[data-vehicle-vuid=${vuids[i]}]`).toggleClass(_mod.compareSelected);
        }
    }

    function _updateSavedVehicles(vuids, withAjax = true, typeAction = 'saved-vehicles') {
        const vuidsCount = vuids.length;

        if (!vuidsCount || (typeAction === 'recently-viewed' && !_$scope.find(`${_sel.vehicleList}[data-list="recently-viewed"]`).find(_sel.vehicleItem).length)) {
            _switchTab(typeAction === 'saved-vehicles' ? 'recently-viewed' : 'saved-vehicles');
            _$scope.find(`${_sel.tabBtn}[data-tab="${typeAction}"]`).remove();
        }

        const isRecentlyViewedEnable = _isRecentlyViewedTabEnabled && _$scope.find(`${_sel.tabBtn}[data-tab="recently-viewed"]`).length;
        const isSavedVehicleEnable = !!_$scope.find(`${_sel.tabBtn}[data-tab="saved-vehicles"]`).length;
        const isCompareVehiclesEnabled = !!_$scope.find(_sel.comparePanel).length;

        _module.$find(typeAction === 'saved-vehicles' ? _sel.savedCount : _sel.viewedCount).text(vuidsCount);

        if (!vuidsCount && !isRecentlyViewedEnable && !isSavedVehicleEnable) {
            _fixedModule.destroyFixed(_$overlay);
            if (_$hint.length) {
                _fixedModule.destroyFixed(_$hint);
            }
            _$overlayWrapper.addClass(_mod.hidden);
            Moff.event.trigger('fly-out-panel.hide', 'savedVehicles');

            return;
        }

        _switchSavedViewedOverlayInfo(vuidsCount && typeAction === 'saved-vehicles' ? 'saved-vehicles' : 'recently-viewed');
        _$overlayWrapper.removeClass(_mod.hidden);
        _initHint();
        _initFixed();

        if (withAjax) {
            _module.ajaxRequest({
                action: 'getSavedVehicles',
                pushState: false,
                preventRequest: true,
                preloader: {
                    show() {
                        Moff.ajaxSystem.showPreloader(_sel.vehicleList);
                    },
                    hide() {
                        Moff.ajaxSystem.hidePreloader(_sel.vehicleList);
                    },
                },
                success(html) {
                    const $html = $(html);

                    _$scope.find(`${_sel.vehicleList}[data-list="saved-vehicles"]`).replaceWith($html.find(`${_sel.vehicleList}[data-list="saved-vehicles"]`));

                    if (!isSavedVehicleEnable) {
                        _$scope.find(_sel.vehicleTabs).prepend($html.find(`${_sel.tabBtn}[data-tab="saved-vehicles"]`));
                    }

                    if (vuidsCount || isRecentlyViewedEnable) {
                        _switchTab(vuidsCount ? 'saved-vehicles' : 'recently-viewed');
                    }

                    if (isCompareVehiclesEnabled) {
                        _reselectComparedVehicles();
                    }

                    _loadImages();
                },
            });
        }
    }

    function _switchTab(currentTab) {
        _$scope.find(_sel.tabBtn).removeClass(_mod.headingTabActive);
        _$scope.find(`${_sel.tabBtn}[data-tab="${currentTab}"]`).addClass(_mod.headingTabActive);
        _$scope.find(_sel.vehicleList).removeClass(_mod.listActive);
        _$scope.find(`${_sel.vehicleList}[data-list="${currentTab}"]`).toggleClass(_mod.listActive);
    }

    function _switchSavedViewedOverlayInfo(currentMarker) {
        _$overlay.find(_sel.overlayMarker).removeClass(_mod.markerActive);
        _$overlay.find(`${_sel.overlayMarker}[data-marker="${currentMarker}"]`).addClass(_mod.markerActive);
    }
});
Moff.modules.initByConfig('SavedVehiclesTheme1');