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
       },

      //  minified: {
      //    options: {
      //      sourcemap: 'none',
      //      outputStyle: 'compressed',
      //      lineComments: false,
      //      debugInfo: false,
      //      noCache: true
      //    },
       //
      //    files: [{
      //      expand: true,
      //      cwd: 'patterns/source/css/scss',
      //      src: ['*.min.scss'],
      //      dest: 'patterns/source/css',
      //      ext: '.min.css'
      //    }]
      //  }

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
      * Minify CSS
      *
      */

     cssmin: {
       css:{
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
      * Gzip
      * Calculates Gzipped CSS file sizes
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

       type: {
         expand: true,
         cwd: 'patterns/source/css/type',
         src: '**/*',
         dest: 'css/type'
       }
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
          'sass',           // compile Sass to CSS
          'newer:postcss'   // post process CSS
        ],
        options: {
          spawn: false
        }
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');






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
  grunt.registerTask('j', ['shell:jekyll_build_limited']);

  // Build Jekyll site with updated assets from Pattern Lab using 'grunt jekyll'
  grunt.registerTask('jekyll', ['copy', 'shell:jekyll_build_full']);




  /* CSS tasks */

  // Compile Sass to CSS using 'grunt scss'
  grunt.registerTask('scss', ['sass', 'notify:done']);

  // Run PostCSS processes on CSS with 'grunt post'
  grunt.registerTask('post', ['postcss', 'notify:done']);

  // Minify CSS files using 'grunt min'
  grunt.registerTask('min', ['cssmin', 'gzip', 'notify:done']);

  // Run complete CSS workflow with 'grunt css'
  grunt.registerTask('css', ['sass', 'postcss', 'cssmin', 'gzip', 'notify:done']);



  // End of file.
};
