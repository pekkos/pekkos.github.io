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



const scp = require('gulp-scp2');
const gulpssh = require('../ssh_config.js');

/*
var config = {
  host: 'host.url',
  username: 'username',
  password: 'password'
};
exports.config = config;
*/





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
//      'stylelint',  // stylelint.js
      'cssmin',      // cssmin.js
      callback
    )
  });


  gulp.task('sgdeploy', function () {
    return gulp.src('styleguide/public/**')
      .pipe(scp({
        host: gulpssh.config.host,
        username: gulpssh.config.username,
        password: gulpssh.config.password,
        dest: 'build.pekkos.com/public_html'
      }))
      .on('error', function (err) {
        console.log(err);
      });
  });



  gulp.task('done', function () {
    console.log('All tasks done. Now what?');
  });

};







