'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times.
  require('time-grunt')(grunt);

  // Configurable paths for the theme application.
  var appConfig = {
    temp:       '.tmp/',
    devjs:      'assets/js/',
    devless:    'assets/less/',
    dist:       '../',
    distjs:     '../assets/js/',
    distcss:    '../assets/css/'
  };

	grunt.initConfig({

		// Project settings.
		toro: appConfig,

    // Clean dist and temporary folders to start fresh.
    clean: {
      all: {
        options: {
          force: true
        },
        src: [
          '<%= toro.temp %>',
          '<%= toro.distcss %>',
          '<%= toro.distjs %>',
          '<%= toro.dist %>/*.hbs',
          '<%= toro.dist %>/partials/*.hbs',
          '<%= toro.dist %>/assets',
          '<%= toro.dist %>/partials'
        ]
      } 
    },

    // Always check if javascript code is clean and well written.
    jshint: {
      uses_defaults: ['Gruntfile.js', '<%= toro.devjs %>/**/*.js', '!<%= toro.devjs %>/lib/**/*.js'],
      options: {
        globalstrict: true,
        curly: true,
        eqeqeq: true,
        unused: true,
        globals: {
          jQuery: true,
          Modernizr: true,
          console: true,
          module: true,
          require: true
        }
      }
    },

    // Concatenate all Javascript files (plugins and scripts).
    // The concatenated file is saved in a temporary directory.
    concat: {
      all: {
        src: [
          '<%= toro.devjs %>/lib/**/*.js',
          '<%= toro.devjs %>/**/*.js'
        ],
        dest:   '<%= toro.temp %>/main.tmp.js'
      }
    },

    // Minify the file from the JS temporary folder and save it for production.
    uglify: {
      all: {
        src: '<%= toro.temp %>/main.tmp.js',
        dest: '<%= toro.distjs %>/main.js'
      }
    },

    // Less Compiler
    less: {
      all: {
        options: {
          imports: {
            reference: [
              '<%= toro.devless %>/**/*.less',
              '!<%= toro.devless %>/main.less'
            ]
          },
          compress: true,
          optimization: 0
        },
        files: [
          {
            expand: true,
            cwd: '<%= toro.devless %>',
            src: ['main.less'],
            dest: '<%= toro.distcss %>',
            ext: '.css'
          }
        ]
      }
    },

    // Always check if all SASS files are clean and well written
    lesslint: {
      all: ['<%= toro.devless %>/main.less'],
      options: {
        csslint: {
          'font-sizes': false
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      all: {
        files: [{
          expand: true,
          src: ['**/*.hbs'],
          dest: '<%= toro.dist %>'
        }]
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= toro.devjs %>/**/*.js'],
        tasks: ['clean', 'jshint', 'concat', 'uglify'],
        options: {
          livereload: true
        }
      },
      
      css: {
        files: ['<%= toro.devless %>/**/*.less'],
        tasks: ['clean', 'less', 'lesslint'],
        options: {
          livereload: true
        }
      },

      hbs: {
        files: ['**/*.hbs'],
        tasks: ['clean', 'copy'],
        options: {
          livereload: true
        }
      }
    }

  });

	grunt.registerTask('default', [
    'clean',
    'jshint',
    'concat',
    'uglify',
		'less',
    'lesslint',
    'copy',
    'watch'
	]);

};