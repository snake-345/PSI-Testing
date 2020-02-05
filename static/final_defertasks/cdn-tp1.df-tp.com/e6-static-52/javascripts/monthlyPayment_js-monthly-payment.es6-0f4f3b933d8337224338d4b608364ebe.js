/**
 * @module MonthlyPayment
 */
Moff.modules.create('MonthlyPayment', function() {
    'use strict';

    const MODULE = this;
    const SEL = {
        monthlyPayment: '.js-monthly-payment',
    };

    this.init = function() {
        $(MODULE.scope).on('click', SEL.monthlyPayment, event => {
            const vuid = $(event.currentTarget).data('vuid');
            const data = {};

            if (vuid) {
                data.vuid = vuid;
                Moff.event.trigger('dsa.showPaymentConfiguration', {
                    links: [`VehicleObject_${vuid}`],
                });
            }

            Moff.event.trigger('paymentConfiguration.show', data);
            event.preventDefault();
        });

        Moff.event.on('paymentConfiguration.updatePayments', data => {
            if (data.vuid) {
                Moff.event.trigger('dsa.updatePaymentConfiguration', {
                    links: [`VehicleObject_${data.vuid}`],
                });
            }

            $.each(MODULE.$find(SEL.monthlyPayment), function() {
                const $el = $(this);
                const pattern = $el.data('pattern');

                let monthlyPayment = MODULE.calculateMonthlyPayment($el.data('price'), data.dp, data.apr, data.loan);

                monthlyPayment = monthlyPayment > 0 ? pattern.replace('{n}', MODULE.numberFormat(monthlyPayment, 0)) : $el.data('na');
                $el.text(monthlyPayment);
            });
        });
    };

    this.calculateMonthlyPayment = function(price, downPayment, apr, term) {
        const modifier = ((apr / 100) / 12) / (1 - ((1 + (apr / 100) / 12) ** -term));

        return (price - downPayment) * modifier;
    };
});

Moff.modules.initClass('MonthlyPayment', {
    scopeSelector: 'body',
});