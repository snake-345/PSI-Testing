import './jquery.es6-b551bb9e6a3b77457ff88edb30c28d9b.js';
import './bootstrap-119ed26af71fab3fcd706e91ecc4ba15.js';
import './popover-enhancement.es6-dc20943d240a651539295d0a8275aebb.js';
import './global.es6-d7b0ef82ece0e3d0193ff763947d7f2a.js';
import './forms.es6-b471db36b899d086b3b2d1651d0af73c.js';
import './fly-out-panel.es6-0f1452bd1f6a051a42f4afffa0233fee.js';

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