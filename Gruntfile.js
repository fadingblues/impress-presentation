// Generated on 2015-01-27 using generator-impress 0.1.2
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    'index.html',
                    'js/*.js',
                    'css/*.css',
                    'steps/*.html',
                    'steps/list.json'
                ],
            },
        },
        copy: {
            fontawesome: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/fontawesome/css/',
                        src: 'font-awesome.css',
                        dest: 'css/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/fontawesome/fonts/',
                        src: '**/*',
                        dest: 'fonts/'
                    }
                ]
            },
            bootstrap: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css',
                        src: 'bootstrap.css',
                        dest: 'css/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/js',
                        src: 'bootstrap.js',
                        dest: 'js/'
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });

    grunt.registerTask('compile','sass:dist')
    grunt.registerTask('server', ['copy', 'connect:livereload', 'open', 'watch']);
    grunt.registerTask('default', 'server');
};
