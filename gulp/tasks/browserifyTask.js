var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    streamify = require('gulp-streamify'),
    gulpif = require('gulp-if'),
    config = require('../config').scripts;

var dependencies = config.deps;


gulp.task('browserify', function () {
  return browserify(config.src)
  .transform(babelify)
  .bundle()
  .pipe(plumber())
  .pipe(source('main.js'))
  .pipe(gulp.dest(config.dest));
});

var browserifyTask = function(options) {

    // Our app bundler
    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: options.development, // Gives us sourcemapping
        cache: {},
        packageCache: {},
        fullPaths: options.development // Requirement of watchify
    });

    // We set our dependencies as externals on our app bundler when developing
    (options.development ? dependencies : []).forEach(function(dep) {
        appBundler.external(dep);
    });

    // The rebundle process
    var rebundle = function() {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('main.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            //.pipe(gulpif(options.development, livereload()))
            .pipe(notify(function() {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();

    // We create a separate bundle for our dependencies as they
    // should not rebundle on file changes. This only happens when
    // we develop. When deploying the dependencies will be included
    // in the application bundle
    if (options.development) {
        // Remove react-addons when deploying, as it is only for
        // testing
        if (!options.development) {
            dependencies.splice(dependencies.indexOf('react-addons'), 1);
        }

        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });

        // Run the vendor bundle
        var start = new Date();
        console.log('Building VENDORS bundle');
        vendorsBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function() {
                console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
            }));

    }

}

module.exports = browserifyTask;
