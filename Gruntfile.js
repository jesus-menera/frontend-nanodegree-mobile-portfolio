module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        files: {
          'js/dist/perfmatters.min.js':'js/perfmatters.js'
        }
      },
      views_js: {
        files: {
          'views/dist/js/main.min.js':'views/js/main.js'
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css'],
          dest: 'css/dist',
          ext: '.min.css'
        }]
      },
      views_css: {
        files: {
          'views/dist/css/pizza.min.css': ['views/css/style.css','views/css/bootstrap-grid.css']
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      app_css: {
        src: ['css/dist/style.min.css','css/dist/google*.css'],
        dest: 'css/dist/app.min.css',
      }
    },
    clean: {
      build: {
        src: ["build/*", "build/"]
      },
      css: {
        src: ["css/dist/*", "css/dist"]
      },
      html: {
        src: ["dist/*","dist/"]
      },
      js: {
        src: ["js/dist/*", "js/dist"]
      },
      views: {
        src: ["views/dist/*", "views/dist"]
      },
      pre_build_clean_css: {
        src: ["css/dist/style.min.css","css/dist/google-font-open-sans.min.css"]
      }
    },
    htmlmin: {
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'index.html',
          'dist/project-2048.html': 'project-2048.html',
          'dist/project-mobile.html': 'project-mobile.html',
          'dist/project-webperf.html': 'project-webperf.html',
          'views/dist/pizza.html':'views/pizza.html'
        }
      }
    },
    copy: {
      css: {
        files:[
          {expand:true, flatten:true, src:['css/dist/*.css'], dest:'build/css', filter:'isFile'}
        ]
      },
      js: {
        files:[
          {expand:true, flatten:true, src:['js/dist/*.js'], dest:'build/js', filter:'isFile'}
        ]
      },
      html: {
        files:[
          {expand:true, flatten:true, src:['dist/*.html'], dest:'build/', filter:'isFile'}
        ]
      },
      views: {
        files:[
          {expand: true, cwd: 'views/dist/', src: ['**'], dest: 'build/views/'}
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');


  // Default task(s).
  grunt.registerTask('default', ['uglify','cssmin','concat','clean','htmlmin']);
  grunt.registerTask('build', ['uglify','cssmin','concat','clean']);
  grunt.registerTask('build-copy', ['clean','cssmin','concat','clean:pre_build_clean_css',
    'uglify','htmlmin','copy','clean:css','clean:html','clean:js','clean:views']);//['copy']


};