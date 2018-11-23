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


/**
 * Task specific modules
 */

const scss = require('gulp-sass');

// Glob Sass files
// https://www.npmjs.com/package/gulp-sass-glob
const sassGlob = require('gulp-sass-glob');


module.exports = function () {

  gulp.task('sass', function () {
    return gulp.src([
      'styleguide/source/css/sass/*.scss'
    ])
      .pipe(sassGlob())
      .pipe(scss({ outputStyle: 'expanded' }))
      .pipe(gulp.dest('styleguide/source/css'))
      .on('end', function () {
        console.log('SCSS compiled to CSS.');
      })
  });

};
