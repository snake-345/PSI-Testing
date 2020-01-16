System.register(['./heavy-es6.js', './heavy1-es6.js', './heavy2-es6.js', './heavy3-es6.js', './heavy4-es6.js'], function () {
	'use strict';
	return {
		setters: [function () {}, function () {}, function () {}, function () {}, function () {}],
		execute: function () {

			console.log('hello from entry 1');

		}
	};
});
