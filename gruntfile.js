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
      }
    },

  });




  /**
   *
   * Load packages
   *
   */

  grunt.loadNpmTasks('grunt-dev-update');
  grunt.loadNpmTasks('grunt-shell');





  /**
   *
   * Register tasks
   *
   */

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['shell:weather', 'devUpdate']);

};
