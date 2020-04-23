//
// == Installation ==
//
// Install the grunt command-line tool (-g puts it in /usr/local/bin):
// % sudo npm install -g grunt-cli
//
// Install all the packages required to build this:
// (Packages will be installed in ./node_modules - don't accidentally commit this)
// % cd wp-content/themes/theme-name
// % npm install
//
// == Building ==
//
// % grunt
//
// Watch for changes:
// % grunt watch
//
// Compress images (not done by the above tasks):
// % grunt img
//

module.exports = function (grunt) {
    'use strict';

    const sass = require('node-sass')

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            production: {
                src: [
                    'build/'
                ]
          }
        },

        sass: {
            options: {
                implementation: sass,
                outputStyle: 'compressed',
                sourceMap: true,
                includePaths: ['node_modules/'],
            },
            production: {
                files: {
                    'build/main.min.css': 'assets/css/main.scss',
                    'build/admin.min.css': 'assets/css/admin.scss',
                }
            }
        },

        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
            production: {
                files: {
                    'build/main.min.js': 'assets/js/main.js'
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    preserveComments: 'some',
                    compress: false,
                    sourceMap: 'build/main.min.js.map',
                    sourceMappingURL: 'main.min.js.map',
                    sourceMapRoot: '../',
                },
                files: {
                    'build/main.min.js': [
                        'assets/js/plugins/*.js',
                        'node_modules/jquery-placeholder/jquery.placeholder.js',
                        'node_modules/bowser/bundled.js',
                        'node_modules/url-polyfill/url-polyfill.js',
                        'node_modules/es6-promise/dist/es6-promise.auto.js',
                        'node_modules/govuk-frontend/govuk/all.js',
                        'assets/js/main.js',
                        'assets/js/comments.js'
                    ],
                },
            },
        },

        copy: {
            dist: {
                files: [
                    {
                        src: [
                            'node_modules/bootstrap/img/glyphicons-halflings.png',
                            'node_modules/bootstrap/img/glyphicons-halflings-white.png',
                            'node_modules/govuk-frontend/govuk/assets/fonts/*',
                            'node_modules/govuk-frontend/govuk/assets/images/*',
                            'govuk_template/assets/stylesheets/fonts.css',
                            'govuk_template/assets/stylesheets/govuk-template.css',
                            'govuk_template/assets/stylesheets/govuk-template-print.css',
                            'govuk_template/assets/javascripts/govuk-template.js',
                            'govuk_template/assets/images/favicon.ico',
                        ],
                        dest: 'build/',
                    },
                ],
            },
        },

        image: {
          dynamic: {
            files: [{
              expand: true,
              cwd: 'assets/img',
              src: ['**/*.{png,jpg,gif,svg}'],
              dest: 'assets/img'
            }]
          }
        },

        _watch: {
            css: {
                files: ['assets/css/**/*.scss'],
                tasks: ['sass'],
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['uglify'],
            },
        },
    })

    grunt.loadNpmTasks('grunt-sass')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-image')
    grunt.loadNpmTasks('grunt-contrib-clean')

    grunt.renameTask('watch', '_watch')
    grunt.registerTask('watch', [
        'default',
        '_watch',
    ])

    grunt.registerTask('default', [
        'clean',
        'copy',
        'sass',
        'browserify',
    ])

}
