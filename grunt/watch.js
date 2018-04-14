/**
 *
 * Watch for changes
 *
 */


module.exports = {

      // Watch to see if we change this gruntfile

      gruntfile: {
        files: ['gruntfile.js']
      },



      // Live Reload

      options: {
        livereload: true,
      },



      // Compile to CSS when changes occur in Sass files

      css: {
        files: [
          'patterns/source/css/scss/*.scss',
          'patterns/source/css/scss/**/*.scss'
        ],
        tasks: [
          'sass',                   // compile Sass to CSS
          'newer:postcss',          // post process CSS
          'css_mqpacker',           // pack media queries
          'cssmin',                 // minify css files for production
          'shell:patternlab_build', // generate patterns
          'notify:watch'
        ],
        options: {
          spawn: false
        }
      },



      // Watch for changes in JS files and concatenate

      scripts: {
        files: [ 'patterns/source/js/**/*.js' ],
        tasks: [
          'newer:concat',
          'shell:patternlab_build',
          'notify:watch' ],
        options: {
          spawn: false,
        }
      }
};
