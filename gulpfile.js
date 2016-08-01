'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Default Gulp task
gulp.task('default', ['browser-sync'], function () {

});

//// Sass compile
gulp.task('sass', function () {
    return gulp.src('app/src/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ['nodemon'], function () {

    //browserSync.init(null, {
    //    proxy: "localhost:8000",
    //    files: ["./**/*.*"],
    //    browser: "google chrome",
    //    port: 8000
    //});

    browserSync({
        proxy: "localhost:8000",
        files: ["./**/*.*"],
        browser: "google chrome",
        port: 8000,
        notify: false
    });
});
gulp.task('nodemon', function (cb) {
    var started = false;

    gulp.watch('app/src/scss/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);

    return nodemon({
        script: 'server.js',
        ignore: [
            '.gitignore',
            'gitignore',
            'app/data/**',
            'node_modules/**',
            'gulpfile.js'
        ]
    }).on('start', function () {

        // single nodemon start
        if (!started) {
            cb();
            started = true;
        }
    });
});