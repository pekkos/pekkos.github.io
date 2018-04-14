/**
 *
 * Concatenate js files from each folder to corresponding files
 *
 */


module.exports = {

  vendor_libs: {
    src: [
      'patterns/source/js/vendor-libs/*.js'
    ],
    dest: 'patterns/source/js/vendor.libs.js'
  },
  vendor_modules: {
    src: [
      'patterns/source/js/vendor-modules/*.js'
    ],
    dest: 'patterns/source/js/vendor.modules.js'
  },
  vendor_polyfills: {
    src: [
      'patterns/source/js/polyfills/*.js'
    ],
    dest: 'patterns/source/js/polyfills.js'
  },
  modules: {
    src: [
      'patterns/source/js/modules/*.js'
    ],
    dest: 'patterns/source/js/modules.js'
 //  },
 //  maps: {
 //    src: [
 //      'source/js/maps/*.js'
 //    ],
 //    dest: 'source/js/maps.js'
 //  },
 //  maps_json: {
 //    src: [
 //      'source/js/maps/maps.google.branches.json'
 //    ],
 //    dest: 'source/js/maps.google.branches.json'
  }
};

