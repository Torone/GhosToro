'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times.
  require('time-grunt')(grunt);

  // Configurable paths for the theme application.
  var appConfig = {
    temp:       '.tmp/',
    devimg:     'assets/images/',
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
          '<%= toro.dist %>/assets'
        ]
      },
      css: {
        options: {
          force: true
        },
        src: [
          '<%= toro.distcss %>'
        ]
      },
      js: {
        options: {
          force: true
        },
        src: [
          '<%= toro.temp %>',
          '<%= toro.distjs %>'
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
      options: {
        mangle: false
      },
      all: {
        src: '<%= toro.temp %>/main.tmp.js',
        dest: '<%= toro.distjs %>/main.js'
      }
    },

    // Less Compiler.
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

    // Always check if all SASS files are clean and well written.
    lesslint: {
      all: ['<%= toro.devless %>/main.less'],
      options: {
        csslint: {
          'box-sizing': false,
          'font-sizes': false,
          'known-properties': false,
          'unique-headings': false,
          'universal-selector': false
        }
      }
    },

    // Parse CSS and add vendor-prefixed CSS properties.
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      all: {
        src: '<%= toro.distcss %>/main.css'
      }
    },

    copy: {
      all: {
        files: [{
          expand: true,
          src: ['<%= toro.devimg %>/**/*.png', '**/*.hbs'],
          dest: '<%= toro.dist %>',
          filter: 'isFile'
        }]
      }
    },

    // Watches files for changes and runs tasks based on the changed files.
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['<%= toro.devjs %>/**/*.js'],
        tasks: ['clean:js', 'jshint', 'concat', 'uglify']
      },
      css: {
        files: ['<%= toro.devless %>/**/*.less'],
        tasks: ['clean:css', 'less', 'autoprefixer', 'lesslint']
      },
      hbs: {
        files: ['**/*.hbs'],
        tasks: ['handlebarsmin']
      }
    },

    // Minify all Handlebars files for production
    handlebarsmin: {
      all: {
        expand: true,
        src: '**/*.hbs',
        dest: '<%= toro.dist %>'
      }
    }

  });

	grunt.registerTask('default', [
    'clean:all',
    'jshint',
    'concat',
    'uglify',
		'less',
    'autoprefixer',
    'lesslint',
    'copy',
    //'handlebarsmin', Currently disabled because it cause error with new Ghost version 0.5.2.
    'watch'
	]);

};