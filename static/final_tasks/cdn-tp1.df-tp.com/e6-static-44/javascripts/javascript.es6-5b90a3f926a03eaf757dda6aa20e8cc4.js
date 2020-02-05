/**
 * @module Disclaimer
 */
Moff.modules.create('Disclaimer', function() {
    'use strict';

    const SEL = {
        disclaimerRef: '.js-disclaimer-ref',
    };

    const MODULE = this;

    this.init = function() {
        _initDisclaimers();
    };

    function _initDisclaimers() {
        $(MODULE.scope).on('click', SEL.disclaimerRef, function(event) {
            event.preventDefault();
            Moff.event.trigger('disclaimer.clickOnRef', $(this));
        });
    }
});

// Initialize Disclaimers

Moff.modules.initClass('Disclaimer', {
    scopeSelector: 'body',
});