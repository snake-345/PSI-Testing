// import '../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../assets/javascripts/global.es6.js';
// import '../../../../../../../assets/javascripts/forms.es6.js';
// import '../../../../../../../assets/components/fly-out-panel/fly-out-panel.es6.js';

/**
 * @module PaymentConfiguration
 */
Moff.modules.create('PaymentConfigurationTheme1', function() {
    'use strict';

    const MODULE = this;
    const SEL = {
        updatePayment: '.js-update-payment',
        aprSlider: '#aprSlider',
        aprChoice: '#aprChoice',
        loanSlider: '#loanSlider',
        loanChoice: '#loanChoice',
        dpSlider: '#dpSlider',
    };

    let _vuid = '';

    /**
     * Module initialization callback.
     * @method init
     */
    this.init = function() {
        syncFields();
        MODULE.$find(SEL.updatePayment).on('click', () => {
            const config = MODULE.getPaymentConfig();

            let expires = new Date();

            expires.setFullYear(expires.getFullYear() + 1);
            expires = expires.toUTCString();

            document.cookie = `payment=${encodeURIComponent(JSON.stringify(config))}; path=/; expires=${expires}`;

            if (_vuid !== '') {
                config.vuid = _vuid;
            }

            Moff.event.trigger('paymentConfiguration.updatePayments', config);
            Moff.event.trigger('fly-out-panel.hide', 'paymentConfiguration');
        });

        Moff.event.on('paymentConfiguration.show', data => {
            if (data && data.vuid) {
                _vuid = data.vuid;
            }

            Moff.event.trigger('fly-out-panel.show', 'paymentConfiguration');
        });

        Moff.event.on('fly-out-panel.hide', name => {
            if (name === 'paymentConfiguration') {
                _vuid = '';
                resetForm();
            }
        });
    };

    this.getPaymentConfig = function() {
        return {
            apr: +MODULE.$find('#aprChoice').val(),
            loan: +MODULE.$find('#loanChoice').val(),
            dp: +MODULE.$find('#dpSlider').val(),
        };
    };

    function resetForm() {
        let config = document.cookie.match(/payment=([^;]+)/);

        if (config) {
            config = JSON.parse(decodeURIComponent(config[1]));

            MODULE.$find(SEL.aprSlider).slider('setValue', +config.apr);
            MODULE.$find(SEL.aprChoice).val(+config.apr);
            MODULE.$find(SEL.loanSlider).slider('setValue', +config.loan);
            MODULE.$find(SEL.loanChoice).val(+config.loan);
            MODULE.$find(SEL.dpSlider).slider('setValue', +config.dp);
        }
    }

    function syncFields() {
        MODULE.$find(SEL.aprSlider).on('slideStop', event => MODULE.$find(SEL.aprChoice).val(event.value));
        MODULE.$find(SEL.loanSlider).on('slideStop', event => MODULE.$find(SEL.loanChoice).val(event.value));
        MODULE.$find(SEL.aprChoice).on('change', event => MODULE.$find(SEL.aprSlider).slider('setValue', +$(event.target).val()));
        MODULE.$find(SEL.loanChoice).on('change', event => MODULE.$find(SEL.loanSlider).slider('setValue', +$(event.target).val()));
    }
});
Moff.modules.initByConfig('PaymentConfigurationTheme1');