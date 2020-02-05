// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/javascripts/in-viewport/in-viewport.es6.js';
// import '../../../../../../../assets/javascripts/popup.es6.js';
// import '../../../../../../../assets/javascripts/forms.es6.js';
// import '../../../../../../../assets/components/buttons/buttons.es6.js';
// import '../../../../../../../assets/javascripts/carousel.es6.js';
// import '../../../../../../../assets/javascripts/lazy-images/lazy-images.es6.js';
// import '../../../../../../../assets/components/carousel/carousel-helpers.es6.js';
// import '../../../../../../../assets/vendor/jcarousel-lazyLoading/dist/jquery.jcarousel-lazyloading.js';

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