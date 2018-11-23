/**
 * JEKYLL
 *
 * Build or serve the Jekyll site
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const shell = require('gulp-shell')



module.exports = function () {

  // Build Jekyll with the 20 latest posts (faster build time at development)
  gulp.task('jekyll', shell.task('bundle exec jekyll build --limit_posts 20'));


  // Build Jekyll with all posts and pages
  gulp.task('jekyll:full', shell.task('bundle exec jekyll build'));

};
