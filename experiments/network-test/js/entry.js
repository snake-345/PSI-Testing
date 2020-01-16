// import './heavy-es6.js';
// import './heavy1-es6.js';
// import './heavy2-es6.js';
// import './heavy3-es6.js';
// import './heavy4-es6.js';

// console.log('hello from entry 1');

console.log('hello from entry 1');

window.pageStructure.modules.forEach(moduleConfig => {
    import(`./${moduleConfig.name}-es6.js`)
        .then(module => {
            console.log('module', module);
        })
        .catch(error => {
            console.log('error', error);
        });
});