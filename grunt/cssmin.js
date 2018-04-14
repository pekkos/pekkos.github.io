/**
 *
 * Minify CSS
 *
 */


module.exports = {

  css: {
    options: {
      advanced: false
    },
    files: [{
      expand: true,
      cwd: 'patterns/source/css',
      src: ['*.css', '!pattern-scaffolding.css'],
      dest: 'patterns/source/css',
      flatten: true,
      ext: '.min.css'
    }]
  }

};


