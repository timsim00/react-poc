var gulp = require('gulp'),
	  plumber = require('gulp-plumber'),
	  fonts = require('../config.js').fonts,
		images = require('../config.js').images,
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

gulp.task('images', function () {
	gulp.src(images.src)
		.pipe(plumber())
		.pipe(gulp.dest(images.dest));
});


gulp.task('deploy', function() {
  gulp.src('./build/**/*.*')
	.pipe(gulp.dest('./heroku'));
});
