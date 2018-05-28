/**
 *
 * Cloudinary Upload
 *
 */


module.exports = {

  options: {
    replace: false,
    dir: 'imgs/',
    credentials: { // cloudinary credentials
      'api_key': '673534247882617',
      'api_secret': 'o4oa_20yIFh9LRrPeBbzWKzhv4Q',
      'cloud_name': 'pekkos'
    }
  },
  files: [{
    expand: true, // should be set to true to find whole path
    cwd: 'imgs/',
    src: [
      '**/*.jpg'
    ]
  }]

};


