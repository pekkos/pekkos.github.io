/**
 *
 * Concatenate SVG icons into a SVG sprite file
 *
 */


module.exports = {

  // https://github.com/FWeinb/grunt-svgstore
  options: {
    prefix : 'icon--', // This will prefix each ID
    includeTitleElement: false,
    svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
      viewBox : '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    }
  },
  default: {
    files: {
      'patterns/source/css/icons/icons.svg': ['patterns/source/css/icons/svg/*.svg']
    }
  }

};

