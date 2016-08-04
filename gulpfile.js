'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

function browserSyncInit(port, baseDir) {
    var browser = browserSync.create();
    browser.init({
        port: port,
        server: {
            baseDir: baseDir
        },
        browser: "google chrome",
        localOnly: true,
        notify: false
    });
    return browser;
}

// Default Gulp task
gulp.task('default', ['browser-sync'], function () {

});

//// Sass compile
gulp.task('sass', function () {
    return gulp.src('app/src/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ['nodemon'],function() {
    browserSync.init({
        proxy: "localhost:9000",
        port: 9001,
        browser: "google chrome",
        localOnly: true,
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