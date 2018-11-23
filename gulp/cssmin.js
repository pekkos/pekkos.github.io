/**
 * CSSMIN
 *
 * Minify CSS files and measure sizes
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');



/**
 * Task specific modules
 */

// CSS Minification
// https://github.com/pdehaan/gulp-cssmin
const cssmin = require('gulp-cssmin');

// Size measuring
// https://github.com/sindresorhus/gulp-size
const cssSize = require('gulp-size');




module.exports = function () {

  gulp.task('cssmin', function (callback) {
    runSequence(
      'cssMinify',
      'cssMeasureSize', // Get main unminified CSS file size
      'cssCalculateGzip', // Get main minified CSS file gzipped
      'cssmin-done',
      callback
    )
  });


  gulp.task('cssMinify', function () {
    return gulp.src([
      'styleguide/source/css/*.css',
      '!styleguide/source/css/*.min.css' // If any minified CSS files in the source foolder
    ])
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('styleguide/static/assets/css')); // Put production ready files in /static/
  });



  gulp.task('cssMeasureSize', function () {
    return gulp.src('styleguide/source/css/*.css')
      .pipe(cssSize({ showFiles: true, title: 'Compiled and optimized CSS: ' }));
  });


  gulp.task('cssCalculateGzip', function () {
    return gulp.src('styleguide/static/assets/css/*.css')
      .pipe(cssSize({ gzip: true, showFiles: true, title: 'Minified and Gzipped CSS: ' }));
  });


  gulp.task('cssmin-done', function () {
    console.log('CSS files minified and sized up');
  });

};
