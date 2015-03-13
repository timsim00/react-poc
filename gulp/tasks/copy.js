var gulp = require('gulp'),
	  plumber = require('gulp-plumber'),
	  fonts = require('../config.js').fonts,
    icons = require('../config.js').icons,
	  html = require('../config.js').html;

gulp.task('fonts', function () {
	gulp.src(fonts.src)
		.pipe(plumber())
		.pipe(gulp.dest(fonts.dest));
});

gulp.task('icons', function () {
  gulp.src(icons.src)
    .pipe(plumber())
    .pipe(gulp.dest(icons.dest));
});


gulp.task('html', function () {
	gulp.src(html.src)
		.pipe(plumber())
		.pipe(gulp.dest(html.dest));
});
