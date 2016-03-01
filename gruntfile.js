module.exports = function(grunt) {

  grunt.initConfig({

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
   * Load tasks
   *
   */

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['shell:weather']);

};
