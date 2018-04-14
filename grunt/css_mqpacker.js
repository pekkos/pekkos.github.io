/**
 *
 * Pack identical media queries together into single media query rule
 *
 */


module.exports = {

  options: {
    map: false,
    sort: true
  },
  main: {
    cwd: 'patterns/source/css/',
    dest: 'patterns/source/css/',
    expand: true,
    src: ['styles.css', 'styles-oldie.css']
  }

};

