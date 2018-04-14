/**
 *
 * Copy asset files to Jekyll
 *
 */


module.exports = {

  css: {
    expand: true,
    cwd: 'patterns/source/css',
    src: '**/*.min.css',
    dest: 'css'
  },

  gfx: {
    expand: true,
    cwd: 'patterns/source/css/gfx',
    src: '**/*',
    dest: 'css/gfx'
  },

  icons: {
    expand: true,
    cwd: 'patterns/source/css/icons',
    src: '*.svg',
    dest: 'css/icons'
  },

  type: {
    expand: true,
    cwd: 'patterns/source/css/type',
    src: '**/*',
    dest: 'css/type'
  },

  js: {
    expand: true,
    cwd: 'patterns/source/js',
    src: '*.js',
    dest: 'js'
  }
};
