/**
 * SASS
 *
 * Compile SCSS files into CSS
 * https://www.npmjs.com/package/gulp-sass
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');


/**
 * Task specific modules
 */

const concat = require('gulp-concat');
const scss = require('gulp-sass');

// Glob Sass files
// https://www.npmjs.com/package/gulp-sass-glob
const sassGlob = require('gulp-sass-glob');


module.exports = function () {

  gulp.task('sass', function (callback) {
    runSequence(
      'scss2css',
      'sass-done',
      callback
    )
  });


  gulp.task('scss2css', function () {
    return gulp.src([
      'styleguide/source/css/sass/*.scss'
    ])
      .pipe(sassGlob())
      .pipe(scss({ outputStyle: 'expanded' }))
      .pipe(gulp.dest('styleguide/source/css'))
  });


  gulp.task('sass-done', function () {
    console.log('SCSS compiled to CSS.');
  });

};
