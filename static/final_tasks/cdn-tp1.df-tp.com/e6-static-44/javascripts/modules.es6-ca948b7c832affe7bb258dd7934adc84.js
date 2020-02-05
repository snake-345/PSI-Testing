(function() {
    'use strict';

    let modulesInited = 0;

    let modules = [];

    let shouldBeInited = 0;
    const inlineJS = window.inlineJS || [];

    Moff.modules.loadConfig = function(config) {
        if (!Array.isArray(config)) {
            return;
        }

        modules = config;
        shouldBeInited = modules
            .reduce((count, moduleConfig) => (!(moduleConfig.data && moduleConfig.data.allowLazyInit) ? count + 1 : count), 0);
    };

    Moff.modules.getById = function(id) {
        return Moff.modules.getBy('id', +id)[0];
    };

    Moff.modules.getByName = function(name) {
        const all = Moff.modules.getAll();
        const result = [];

        Moff.each(all, (className, object) => {
            if (className.indexOf(name) !== -1) {
                result.push(object);
            }
        });

        return result;
    };

    // Moff.modules.initClass = function(...params) {
    // 	setTimeout(() => {
    // 		Moff.modules.initClass(...params);
    // 	}, window.initDelay);
    // };

    // Moff.modules.get('InViewport').once({
    // 	$elements: $(MODULE.scope),
    // 	inCallback() {
    // 		// SetTimeout because our Analytics initialize too late, and yes, we should change it
    // 		setTimeout(() => Moff.event.trigger('dsa.mapShown'), 0);
    // 		_initAutoComplete();
    // 	},
    // });

    Moff.modules.initByConfig = function(moduleName) {
        console.log('create', moduleName); // eslint-disable-line no-console


        modules.forEach(config => {
            if (config.name === moduleName) {
                console.log('init', moduleName); // eslint-disable-line no-console
                if (config.data && config.data.allowLazyInit) {
                    Moff.modules.get('InViewport').once({
                        $elements: $(config.scopeSelector),
                        inCallback() {
                            console.log('lazy init'); // eslint-disable-line no-console
                            initModule(moduleName, config);
                        },
                    });
                } else {
                    setTimeout(() => {
                        initModule(moduleName, config);
                    }, 0);
                }
            }
        }, 0);

        function initModule(name, config) {
            Moff.modules.initClass(name, config);
            config.inited = true; // eslint-disable-line no-param-reassign
            modulesInited++;
            console.log('modules counts', modulesInited, shouldBeInited); // eslint-disable-line no-console
            if (modulesInited === shouldBeInited) {
                onModulesInited();
            }
        }
    };

    function onModulesInited() {
        function a(fn) {
            setTimeout(() => fn());
            // fn();
        }

        inlineJS.forEach(a);
        inlineJS.push = a;
    }
}());