/**
 * DEPLOY
 *
 * Deploy tasks
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const copy = require('gulp-copy');



/**
 * Task specific modules
 */

// SSH transfer
// https://github.com/popomore/gulp-scp2
const scp = require('gulp-scp2');

/*
Read credentials from an external config file like so:

var config = {
  host: 'host.url',
  username: 'username',
  password: 'password'
};
exports.config = config;
*/
const gulpssh = require('../ssh_config.js');



module.exports = function () {

  gulp.task('deploy', function (callback) {
    runSequence(
      'deploy:css',
      'jekyll',
      'weather',
      callback
    )
  });


  // Deploy styleguide to the web host
  gulp.task('deploy:sg', function () {
    return gulp.src('styleguide/public/**')
      .pipe(scp({
        host: gulpssh.config.host,
        username: gulpssh.config.username,
        password: gulpssh.config.password,
        dest: 'build.pekkos.com/public_html'
      }))
      .on('error', function (err) {
        console.log(err);
      })
      .on('end', function () {
        console.log('Styleguide deployed to your web host.')
      });
  });


  // Deploy CSS from Styleguide to Jekyll
  gulp.task('deploy:css', function () {
    return gulp.src('styleguide/static/assets/css/*.css')
      .pipe(copy('assets/css', { prefix: 4 }))
      .on('end', function () {
        console.log('CSS files deployed from Styleguide to Jekyll.')
      });
  });

};
