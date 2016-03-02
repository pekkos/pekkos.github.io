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
      jekyll_build: {
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

       minified: {
         options: {
           sourcemap: 'none',
           outputStyle: 'compressed',
           lineComments: false,
           debugInfo: false,
           noCache: true
         },

         files: [{
           expand: true,
           cwd: 'patterns/source/css/scss',
           src: ['*.min.scss'],
           dest: 'patterns/source/css',
           ext: '.min.css'
         }]
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

  // Real stuff :)
  grunt.loadNpmTasks('grunt-sass');





  /**
   *
   * Register tasks
   *
   */

  // Default task
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['shell:weather', 'devUpdate']);

  // Build Jekyll site using assets from Pattern Lab
  grunt.registerTask('jekyll', ['copy', 'shell:jekyll_build']);

  // Update packages
  grunt.registerTask('update', ['devUpdate']);

  // Compile Sass to CSS
  grunt.registerTask('css', ['sass', 'notify:done']);


};
