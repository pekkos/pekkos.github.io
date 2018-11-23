/**
 * STYLELINT
 *
 * Lint Sass and report errors
 * https://stylelint.io/
 *
 * Stylelint uses the rulesets defined in the .stylelintrc config file
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');


/**
 * Task specific modules
 */

const cssStylelint = require('gulp-stylelint');
const concat = require('gulp-concat');



module.exports = function () {

  gulp.task('stylelint', function (callback) {
    runSequence(
      'scss-lint',
      'stylelint-report',
      callback
    )
  });


  gulp.task("scss-lint", function () {
    return gulp.src(
      ['styleguide/source/css/sass/**/*.scss',
        '!styleguide/source/css/sass/*.scss'])
      .pipe(cssStylelint({
        failAfterError: false,
        reporters: [
          // { formatter: 'string', console: true },
          { formatter: 'json', save: 'styleguide/source/patterns/_hidden/stylelint-report/stylelint-description.txt' },
          { formatter: 'string', save: 'stylelint-report.txt' }
        ]
      })
      .on('end', function () {
        console.log('Styles linted and errors reported to stylelint-report.txt');
      })
    );
  });


  /**
   * Make the Stylelint report available to Fractal as a part of the
   * documentation section
   */

  gulp.task("stylelint-report", function () {
    return gulp.src('styleguide/source/patterns/_hidden/stylelint-report/*.txt')
      .pipe(concat('stylelint-report.config.json'))
      .pipe(gulp.dest('styleguide/source/patterns/_hidden/stylelint-report'))
      .on('end', function () {
        console.log('Stylelint report deployed to the Styleguide');
      })
  });

};
