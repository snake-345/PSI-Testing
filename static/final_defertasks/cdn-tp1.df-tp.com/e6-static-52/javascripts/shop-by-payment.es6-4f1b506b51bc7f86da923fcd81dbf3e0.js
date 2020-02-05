// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/javascripts/in-viewport/in-viewport.es6.js';
// import '../../../../../../../assets/javascripts/forms.es6.js';
// import '../../../../../../../assets/javascripts/monthly-payment/monthly-payment.es6.js';
/**
 * @module ShopByPayment
 */
Moff.modules.create('ShopByPaymentTheme1', function() {
    'use strict';

    const _module = this;
    const _template = '<div class="monthly-payment js-monthly-payment">${n} /mo</div>';
    const _naTemplate = '<div class="monthly-payment js-monthly-payment">$0 /mo</div>';

    let _paymentConfiguration = {};

    let _paymentConfigurationAvailable = false;

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        _module.$find('.js-find-button').on('click', event => {
            const glue = _module.data.baseUrl.indexOf('?') === -1 ? '?' : '&';

            window.location = `${_module.data.baseUrl}${glue}finalPrice=${_module.$find('.js-range-slider').val()}`;
            event.preventDefault();
        });
        paymentConfigurationLogic();
    };

    function paymentConfigurationLogic() {
        _paymentConfigurationAvailable = !!Moff.modules.getByName('PaymentConfiguration')[0];

        if (_paymentConfigurationAvailable) {
            _paymentConfiguration = Moff.modules.getByName('PaymentConfiguration')[0].getPaymentConfig();

            _module.$find('.js-payment-configuration-link').on('click', event => {
                Moff.event.trigger('paymentConfiguration.show');
                event.preventDefault();
            });

            Moff.event.on('paymentConfiguration.updatePayments', data => {
                const paymentData = _module.$find('.js-payment-data');
                const text = paymentData.data('pattern');

                _paymentConfiguration = data;
                paymentData.text(text
                    .replace('{apr}', data.apr)
                    .replace('{loan}', data.loan)
                    .replace('{dp}', _module.numberFormat(data.dp)));

                _module.$find('.js-monthly-payment').remove();
                appendMonthlyPayment(_module.$find('.js-range-slider').slider('getValue'));
            });

            _module.afterCssLoaded(() => {
                appendMonthlyPayment(_module.$find('.js-range-slider').slider('getValue'));
                _module.$find('.js-range-slider').on('slide slideStop', event => appendMonthlyPayment(event.value));
            });
        }
    }

    function appendMonthlyPayment(values) {
        const calculatedValues = $.map(values, value => {
            const calculatedValue = Moff.modules.get('MonthlyPayment').calculateMonthlyPayment(value, _paymentConfiguration.dp, _paymentConfiguration.apr, _paymentConfiguration.loan);

            return calculatedValue <= 0 ? _naTemplate : _template.replace('{n}', _module.numberFormat(calculatedValue));
        });

        _module.$find('.js-range-slider-min').append(calculatedValues[0]);
        _module.$find('.js-range-slider-max').append(calculatedValues[1]);
    }
});
Moff.modules.initByConfig('ShopByPaymentTheme1');