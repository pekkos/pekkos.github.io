module.exports = function(grunt) {

  // after this script is run (or stopped after watching),
  // time for tasks longer than 1% of the total time are output
  require('time-grunt')(grunt);


  grunt.initConfig({


    /**
     *
     * Update packages automatically
     *
     */

    devUpdate: {
        main: {
            options: {
                updateType: 'force', // update outdated packages
                reportUpdated: false, //don't report up-to-date packages
                semver: true, //stay within semver when updating
                packages: {
                    devDependencies: true, //only check for devDependencies
                    dependencies: false
                },
                packageJson: null, //use matchdep default findup to locate package.json
                reportOnlyPkgs: [] //use updateType action on all packages
            }
        }
    },





    /**
     *
     * Execute shell commands
     *
     */

    shell: {

      // Show current weather
      weather: {
        command: "curl -s http://wttr.in/Gothenburg | head -7"
      },

      // Generate patterns @ Pattern Lab
      patternlab_build: {
        command: "php patterns/core/console --generate"
      },

      // Generate Jekyll site with only 10 posts
      jekyll_build_limited: {
        command: "bundle exec jekyll build --limit_posts 10"
      },

      // Generate full Jekyll site
      jekyll_build_full: {
        command: "bundle exec jekyll build"
      }
    },





    /**
     *
     * Compile Sass to CSS
     *
     */

     sass: {

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
     },





     /**
      *
      * Process CSS with PostCSS plugins
      *
      */

     postcss: {
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
     },





     /**
      *
      * Pack identical media queries together into single media query rule
      *
      */

     css_mqpacker: {
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
     },





     /**
      *
      * Minify CSS
      *
      */

     cssmin: {
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
     },





     /**
      *
      * Concatenate js files from each folder to corresponding files
      *
      */

     concat: {
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
     },




     /**
      *
      * Gzip
      * Calculates Gzipped asset file sizes
      *
      */

     gzip: {
       options: { detail: true },
       files: {
         // Target-specific file lists and/or options go here.
         src: [
           'patterns/source/css/styles.min.css'
         ]
       },
     },





      /**
       *
       * Notify task progress to developer
       *
       */

      notify: {
        done: {
          options: {
            title: 'pekkos.com: Done',
            message: 'OK, I did my stuff for you.'
          }
        },
        watch: {
          options: {
            title: 'pekkos.com: Watch',
            message: 'Now watching for changes'
          }
        },
        sass: {
          options: {
            title: 'pekkos.com: Working on Sass files',
            message: 'Sass files are being compiled to CSS'
          }
        }
      },





    /**
     *
     * Watch for changes
     *
     */

    watch: {

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
    },





    /**
     *
     * Concatenate SVG icons into a SVG sprite file
     *
     */

    svgstore: {
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
    },





    /**
     *
     * Copy asset files to Jekyll
     *
     */

    copy: {
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
    }



  });




  /**
   *
   * Load packages
   *
   */

  // Scaffolding packages
  grunt.loadNpmTasks('grunt-dev-update');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-gzip');

  // Real stuff :)
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks("grunt-css-mqpacker");
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-svgstore');








  /**
   *
   * Register tasks
   *
   */

  /* Default task */

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['shell:weather', 'devUpdate', 'watch']);

  // Update packages
  grunt.registerTask('update', ['devUpdate']);



  /* Pattern Lab */

  // Build Patterns in Pattern Lab
  grunt.registerTask('pl', ['shell:patternlab_build']);



  /* Jekyll */

  // Build Jekyll site using 'grunt j'
  grunt.registerTask('j', ['shell:jekyll_build_full']);

  // Build limited Jekyll site using 'grunt j10'
  grunt.registerTask('j10', ['shell:jekyll_build_limited']);

  // Build Jekyll site with updated assets from Pattern Lab using 'grunt jekyll'
  grunt.registerTask('jekyll', ['copy', 'shell:jekyll_build_full']);

  // Run CSS and JS workflow before Jekyll build
  grunt.registerTask('jekyll_build', ['css', 'js', 'copy', 'shell:jekyll_build_full']);



  /* CSS tasks */

  // Compile Sass to CSS using 'grunt scss'
  grunt.registerTask('scss', ['sass', 'notify:done']);

  // Run PostCSS processes on CSS with 'grunt post'
  grunt.registerTask('post', ['postcss', 'notify:done']);

  // Pack mediaqueries in CSS with 'grunt pack'
  grunt.registerTask('pack', ['css_mqpacker']);

  // Minify CSS files using 'grunt min'
  grunt.registerTask('min', ['cssmin', 'gzip', 'notify:done']);

  // Run complete CSS workflow with 'grunt css'
  grunt.registerTask('css', ['sass', 'postcss', 'css_mqpacker', 'cssmin', 'gzip', 'notify:done']);



  /* JS tasks */

  // Concatenate and bundle JS files
  grunt.registerTask('js', ['concat', 'notify:done']);



  /* SVG taks */

  // Concatenate SVG icons to sprite with 'grunt svg'
  grunt.registerTask('svg', ['svgstore']);



  // End of file.
};
