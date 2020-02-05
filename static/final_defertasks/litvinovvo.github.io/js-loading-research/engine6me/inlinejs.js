(function() {
    'use strict';

    window.inlineJS.forEach(run);
    window.inlineJS.push = run;

    function run(func) {
        setTimeout(() => {
            func();
        }, 0);
    }
}());