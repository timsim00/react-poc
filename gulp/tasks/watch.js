var gulp = require('gulp'),
	config = require('../config'),
	browserSync = require('browser-sync');

gulp.task('watch', ['browsersync'], function () {
	gulp.watch(config.less.watch, ['less', browserSync.reload]);
	//gulp.watch(config.images.src, ['build', browserSync.reload]);
	gulp.watch([config.scripts.watch], ['browserify', browserSync.reload]);
	//gulp.watch([config.jekyll.data, config.jekyll.includes, config.jekyll.layouts, config.jekyll.pages, config.jekyll.posts], ['build', browserSync.reload]);
});
