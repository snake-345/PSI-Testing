import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './in-viewport.es6-46373fca6273eaaff5ee5a19e4f7af58.js';
import './popup.es6-8290332e54a599fbafb8b172623fba67.js';
import './forms.es6-b471db36b899d086b3b2d1651d0af73c.js';
import './buttons.es6-e28702c41869c0e4a8d4a9083dc4340a.js';
import './carousel.es6-bb6b2e70c2d5e620dc33b287106ed0e0.js';
import './lazy-images.es6-f3d2d5879c24445f20d29f9137175fe2.js';
import './carousel-helpers.es6-b3509b7c577fb47ac4c19448bd50bbaa.js';
import './jquery.jcarousel-lazyloading-80bb5433360ca85c8e40b3adc1842d86.js';

/**
 * @module FeaturedVehicles
 */
Moff.modules.create('FeaturedVehiclesTheme1', function() {
    'use strict';

    const _module = this;
    const _sel = {
        carousel: '.js-featured-carousel',
        monthlyPayment: '.js-monthly-payment',
        title: '.js-title',
        price: '.js-price',
    };

    let _$carousel,
        _adjustHeight,
        _autoRotationInterval;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        _$carousel = _module.$find(_sel.carousel);
        _adjustHeight = Moff.modules.getByName('CarouselHelpers')[0].adjustHeight;
        _autoRotationInterval = +_module.config.autoRotationInterval;

        _initMonthlyPayment();
        _module.afterCssLoaded(() => {
            _initSlider();
        });
        _module.updateViewOnSuccessAjaxEvent('eprice-unlock.update', _initSlider);
    };

    function _initMonthlyPayment() {
        if (!Moff.modules.getByName('PaymentConfiguration').length) {
            return;
        }

        _module.$find(_sel.monthlyPayment).on('click', event => {
            Moff.event.trigger('paymentConfiguration.show');
            event.preventDefault();
        });

        Moff.event.on('paymentConfiguration.updatePayments', data => {
            $.each(_module.$find(_sel.monthlyPayment), function() {
                const el = $(this);
                const pattern = el.data('pattern');

                let monthlyPayment = (el.data('price') - data.dp) * data.modifier;

                monthlyPayment = monthlyPayment > 0 ? pattern.replace('{n}', _module.numberFormat(monthlyPayment, 0)) : el.data('na');
                el.text(monthlyPayment);
            });
        });
    }

    function _initSlider() {
        const carousel = Moff.modules.getByName('CarouselFactory')[0].create({
            name: 'FeaturedVehiclesTheme1',
            $carousel: _$carousel,
            options: {
                autoScroll: _autoRotationInterval !== 0,
                autoScrollInterval: _autoRotationInterval * 1000,
                horizontalAlignment: _module.config.carouselHorizontalAlignment,
                lazyLoading: true,
                itemWidth: {
                    xs: 130,
                    sm: 156,
                    md: 131,
                    lg: 195,
                },
                margin: {
                    min: 30,
                    max: 30,
                },
            },
        });

        carousel
            .on('afterinit resize', () => {
                _updateElementsHeight();
            })
            .init();
    }

    function _updateElementsHeight() {
        _adjustHeight(_module.$find(_sel.title));
        _adjustHeight(_module.$find(_sel.price));
    }
});
Moff.modules.initByConfig('FeaturedVehiclesTheme1');