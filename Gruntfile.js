'use strict';

module.exports = function(grunt) {

  var config = {

    pkg: grunt.file.readJSON('package.json'),

    checkDependencies: {
      options: {
          checkGitUrls: true,
          install: false
      },
      build: {}
    },
      
    stylus: {
      build: {
        options: {
          sourcemap: {inline: true},
          compress: false,
          'include css': true
        },
        files: {
          'dist/app.min.css': ['src/styles/**/*.styl']
        }
      }
    },
  
    browserify: {
      options: {
        watch: true,
        transform: [
          ['hbsfy', {'extensions': ['hbs']}],
          ['babelify', {presets: ['es2015'], plugins: ['transform-class-properties']}]
        ]
      },
      dev: {
        options: {
          browserifyOptions: {debug: true},
          plugin: [
            ['minifyify', {map: 'app.min.map', output: 'dist/app.min.map'}]
          ]
        },
        files: {'dist/app.min.js': 'src/js/main.js'}
      },
      prod: {
        options: {
          plugin: [
            ['minifyify', {map: false}]
          ]
        },
        files: {'dist/app.min.js': 'src/js/main.js'}
      }
    },

    clean: {
      build: ['dist/**/*.*']
    },

    watch: {
      options: {

      },
      stylus: {
        files: ['src/styles/**/*.+(styl|css)'], tasks: 'stylus'
      },
      rebuild: {
        files: ['Gruntfile.js'], tasks: 'build:dev'
      },
      justreload: { 
        files: ['dist/app.min.js', 'test/*.html'], tasks: []
      }
    }
  };

  require('load-grunt-tasks')(grunt);

  grunt.initConfig(config);
  grunt.registerTask('build:dev',  ['checkDependencies', 'clean', 'stylus:build', 'browserify:dev']);
  grunt.registerTask('build:prod', ['checkDependencies', 'clean', 'stylus:build', 'browserify:prod']);
  grunt.registerTask('watchers', ['build:dev', 'watch']); 

};
