var gulp = require('gulp'),
    browserifyTask = require('./browserifyTask');
//
// gulp.task('default', ['fonts', 'less', 'watch'], function () {});


gulp.task('dev', function () {

  browserifyTask({
    development: true,
    src: './app/main.js',
    dest: './build'
  });

  // cssTask({
  //   development: true,
  //   src: './styles/**/*.css',
  //   dest: './build'
  // });

});

gulp.task('default',['html','fonts','images','icons','less', 'watch'], function() {});
