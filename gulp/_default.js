/**
 * DEFAULT TASK
 *
 * This is run with the '$ gulp' command
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');








module.exports = function () {

  gulp.task('default', function (callback) {
    runSequence(
      ['css'],
      'done',
      callback
    )
  });


  gulp.task('css', function (callback) {
    runSequence(
      'sass',       // sass.js
      'postcss',    // postcss.js
      'stylelint',  // stylelint.js
      'cssmin',      // cssmin.js
      callback
    )
  });


  gulp.task('done', function () {
    console.log('All tasks done. Now what?');
  });

};







