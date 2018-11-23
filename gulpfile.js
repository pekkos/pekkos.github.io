
const gulp = require('gulp');
// const runSequence = require('run-sequence');
// const rename = require('gulp-rename');





  // gulp.task('cssmin', function (callback) {
  //   runSequence(
  //     'cssMinify',
  //     'cssMeasureSize', // Get main unminified CSS file size
  //     'cssCalculateGzip', // Get main minified CSS file gzipped
  //     'cssmin-done',
  //     callback
  //   )
  // });


  // gulp.task('cssMinify', function () {
  //   return gulp.src([
  //     'source/css/*.css',
  //     '!source/css/*.min.css' // If any minified CSS files in the source foolder
  //   ])
  //     .pipe(cssmin())
  //     .pipe(rename({ suffix: '.min' }))
  //     .pipe(gulp.dest('static/assets/css')); // Put production ready files in /static/
  // });



  // gulp.task('cssMeasureSize', function () {
  //   return gulp.src('source/css/*.css')
  //     .pipe(cssSize({ showFiles: true, title: 'Compiled and optimized CSS: ' }));
  // });


  // gulp.task('cssCalculateGzip', function () {
  //   return gulp.src('static/assets/css/*.css')
  //     .pipe(cssSize({ gzip: true, showFiles: true, title: 'Minified and Gzipped CSS: ' }));
  // });

// var sftp = require('gulp-sftp');

// gulp.task('ssh', function () {
//   return gulp.src('patterns/public/**')
//     .pipe(sftp({
//       host: 'ssh.binero.se',
//       auth: 'keyMain',
//       remotePath: 'build.pekkos.com/public_html/tmp'
//     }));
// });

// gulp.task('done', function () {
//   console.log('CSS files minified and sized up');
// });


var scp = require('gulp-scp2');

var gulpftp = require('./config.js');

gulp.task('scp2', function () {
  return gulp.src('patterns/public/**')
    .pipe(scp({
      host: gulpftp.config.host,
      username: gulpftp.config.username,
      password: gulpftp.config.password,
      dest: 'build.pekkos.com/public_html/tmp'
    }))
    .on('error', function (err) {
      console.log(err);
    });
});



