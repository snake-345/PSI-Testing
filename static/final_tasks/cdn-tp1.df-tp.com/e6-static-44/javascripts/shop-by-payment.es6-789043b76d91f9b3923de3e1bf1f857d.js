import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './in-viewport.es6-46373fca6273eaaff5ee5a19e4f7af58.js';
import './forms.es6-b471db36b899d086b3b2d1651d0af73c.js';
import './monthly-payment.es6-5112c902796ae235e84a08fa0cc7d145.js';
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