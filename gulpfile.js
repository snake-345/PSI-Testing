'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

function serve() {
	return browserSync.init({
		server: {
			baseDir: "./",
		},
		tunnel: true,
	});
}

exports.serve = serve;
exports.default = gulp.series(serve);
