(function() {
    'use strict';

    Moff.detect.isInIframe = window.top !== window.self;
    Moff.detect.flashSupport = (function() {
        let support;

        try {
            support = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
        } catch (exception) {
            support = (typeof navigator.mimeTypes['application/x-shockwave-flash'] !== 'undefined');
        }

        return support;
    }());
}());