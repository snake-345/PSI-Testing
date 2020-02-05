// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/components/fly-out-panel/fly-out-panel.es6.js';

/**
 * @module VehiclePrice
 */
Moff.modules.create('VehiclePriceTheme1', function() {
    'use strict';

    const MODULE = this;
    const SEL = {
        vehiclePrice: '.js-vehicle-price',
        priceRulesLink: '.js-price-rules-link',
        priceRulesContent: '.js-price-rules-content',
        collapseTrigger: '.js-price-rules-collapse-trigger',
        collapseContent: '.js-price-rules-collapse-content',
        closeFlyoutBtn: '.js-price-rules-close-flyout',
        monthlyPayment: '.js-monthly-payment',
    };
    const MOD = {
        collapseOpened: 'collapse-block-opened',
    };
    const _flyoutWrapper = `<div class="mod-vehicle-price-theme1">
			<div class="fly-out-panel __lg __right __larger-width js-fly-out-panel" data-name="priceRules">
				<div class="fly-out-panel_overlay js-hide-fly-out-panel"></div>
				<div class="fly-out-panel_content js-price-rules-content"></div>
			</div>
		</div>`;

    let _$document,
        _previousVuid;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        _$document = $(document);
        $('body').append(_flyoutWrapper);

        _$document.on('click', SEL.priceRulesLink, event => {
            const $target = $(event.target);

            if ($target.hasClass(SEL.monthlyPayment.slice(1))) {
                return;
            }

            const $vehiclePrice = $target.closest(SEL.vehiclePrice);
            const vuid = $vehiclePrice.data('vuid');
            const profile = $vehiclePrice.data('profile');

            Moff.event.trigger('fly-out-panel.show', 'priceRules');

            if (_previousVuid !== vuid) {
                MODULE.ajaxRequest({
                    action: 'getPriceRulesPanel',
                    pushState: false,
                    preventRequest: true,
                    preloader: {
                        show() {
                            Moff.ajaxSystem.showPreloader(SEL.priceRulesContent);
                        },
                        hide() {
                            Moff.ajaxSystem.hidePreloader(SEL.priceRulesContent);
                        },
                    },
                    data: [{
                            name: 'vuid',
                            value: vuid,
                        },
                        {
                            name: 'profile',
                            value: profile,
                        },
                    ],
                    success(html) {
                        _$document.find(SEL.priceRulesContent).replaceWith($(html));
                    },
                });

                _previousVuid = vuid;
            }

            event.preventDefault();
        });

        _$document
            .on('click', SEL.collapseTrigger, function() {
                const $this = $(this);

                $this
                    .toggleClass(MOD.collapseOpened)
                    .siblings(SEL.collapseContent).collapse('toggle');
            })
            .on('click', SEL.closeFlyoutBtn, () => {
                Moff.event.trigger('fly-out-panel.hide', 'priceRules');
            });
    };
});
Moff.modules.initByConfig('VehiclePriceTheme1');