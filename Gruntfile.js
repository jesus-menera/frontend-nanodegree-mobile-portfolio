module.exports = function(grunt) {

  var mozjpeg = require('imagemin-mozjpeg');
  var pngquant = require('imagemin-pngquant');

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
      },
      img: {
        src: ["img/dist/*","img/dist/"]
      },
      views_img: {
        src: ["views/images/dist/*","views/images/dist/"]
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
      },
      img: {
        files:[
          {expand: true, cwd: 'img/dist/', src: ['**'], dest: 'build/img/'}
        ]
      },
      views_img: {
        files:[
          {expand: true, cwd: 'views/images/dist/', src: ['**'], dest: 'build/views/images/'}
        ]
      }
    },
    imagemin: {
    png: {
      options: {
        optimizationLevel: 7
      },
      files: [
        {
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: 'img/',
          src: ['**/*.png'],
          // Could also match cwd line above. i.e. project-directory/img/
          dest: 'img/dist/',
          ext: '.png'
        }
      ]
    },
    jpg: {
      options: {
        progressive: true
      },
      files: [
        {
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: 'img/',
          src: ['**/*.jpg'],
          // Could also match cwd. i.e. project-directory/img/
          dest: 'img/dist/',
          ext: '.jpg'
        }
      ]
    },
    views_png: {
      options: {
        optimizationLevel: 7
      },
      files: [
        {
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: 'views/images/',
          src: ['**/*.png'],
          // Could also match cwd line above. i.e. project-directory/img/
          dest: 'views/images/dist/',
          ext: '.png'
        }
      ]
    },
    views_jpg: {
      options: {
        progressive: true
      },
      files: [
        {
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: 'views/images/',
          src: ['**/*.jpg'],
          // Could also match cwd. i.e. project-directory/img/
          dest: 'views/images/dist/',
          ext: '.jpg'
        }
      ]
    }
  }/*
    imagemin: {
      static: {                          // Target
      options: {                       // Target options
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }],
        use: [mozjpeg(),pngquant()]
      },
      files: {                         // Dictionary of files
        'img/dist/profilepic.jpg': 'img/profilepic.jpg',
        'img/dist/2048.png': 'img/2048.png',
        'img/dist/cam_be_like.jpg': 'img/cam_be_like.jpg',
        'img/dist/mobilewebdev.jpg': 'img/mobilewebdev.jpg',
        'views/images/dist/pizza.png': 'views/images/pizza.png'
        // 'destination': 'source'
      }
    }
    }*/
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // Default task(s).
  grunt.registerTask('default', ['uglify','cssmin','concat','clean','htmlmin']);
  grunt.registerTask('build', ['uglify','cssmin','concat','clean']);
  grunt.registerTask('build-copy', ['clean','cssmin','concat','clean:pre_build_clean_css',
    'uglify','imagemin','htmlmin','copy','clean:css','clean:html','clean:js','clean:views','clean:img','clean:views_img']);//['copy']


};