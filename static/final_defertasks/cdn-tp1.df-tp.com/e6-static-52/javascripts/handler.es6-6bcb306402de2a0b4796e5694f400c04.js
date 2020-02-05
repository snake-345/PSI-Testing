// import '../../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../../assets/javascripts/global.es6.js';
// import '../base-handler.es6.js';
/**
 * Live Analytics Handlers
 * @module LiveHandler
 */
// lint js_unique_name_placeholder disable
/* eslint-disable no-param-reassign */
Moff.modules.create('LiveHandler', function() {
    'use strict';

    /**
     * @inheritDoc
     */
    this.handlers = {
        slideshowClick(data) {
            data.providerEvent = data.providerEvent.replace('(n)', `(${data.providerData.UIObject.slideIndex})`);
            delete data.providerData.UIObject.slideIndex;

            return data;
        },
    };
}, Moff.modules.getClass('BaseHandler').constructor);

Moff.modules.initClass('LiveHandler');
/* eslint-enable no-param-reassign */