'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Default Gulp task
gulp.task('default', ['nodemon'], function () {

});

//// Sass compile
gulp.task('sass', function () {
    return gulp.src('app/src/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.stream());
});

//gulp.task('browser-sync', ['nodemon'], function() {
//    browserSync.init({
//        //server: {
//        //    baseDir: "./app"
//        //},
//        proxy: 'localhost:3000',
//        browser: "google chrome"
//    });
//});

gulp.task('nodemon', function (cb) {
    var started = false;

    browserSync.init({
        //server: {
        //    baseDir: "./app"
        //},
        proxy: 'localhost:9000',
        browser: "google chrome"
    });

    gulp.watch('app/src/scss/**/*.+(scss|sass)', ['sass']);
    gulp.watch('/**/*.html', browserSync.reload());
    gulp.watch('app/**/*.js', browserSync.reload());

    return nodemon({
        script: 'server.js',
        ignore: [
            '.gitignore',
            'gitignore',
            'app/data/**',
            'node_modules/**'
        ]
    }).on('start', function () {
        // single nodemon start
        if (!started) {
            cb();
            started = true;
        }
    });
});