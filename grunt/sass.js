/**
 *
 * Compile Sass to CSS
 *
 */


module.exports = {

  styles: {
    options: {
      sourcemap: 'none',
      outputStyle: 'expanded',
      lineComments: false,
      debugInfo: false,
      noCache: true
    },

    files: [{
      expand: true,
      cwd: 'patterns/source/css/scss',
      src: ['*.scss'],
      dest: 'patterns/source/css',
      ext: '.css'
    }]
  }

};

