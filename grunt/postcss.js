/**
 *
 * Process CSS with PostCSS plugins
 *
 */


module.exports = {

  files: {
    options: {
      map: false, // inline sourcemaps

      processors: [
        require('postcss-discard-duplicates'), // removes duplicate rules
        require('postcss-merge-rules'), // merge adjacent css rules
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: ['last 3 versions', 'ie 8', 'ie 9', '> 1%']}) // add vendor prefixes
      ]
    },
    src: 'patterns/source/css/**/*.css'
  }

};



