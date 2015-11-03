module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jscs: {
      gruntfile: ['Gruntfile.js'],
      js: ['index.js', 'Gruntfile.js', 'environment.js', 'manifest.js'],
      options: {
        config: '.jscsrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-jscs');

  // Default task(s).
  grunt.registerTask('default', ['jscs']);
};
