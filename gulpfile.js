'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

var BROWSER_SYNC_RELOAD_DELAY = 500;
var options = {
    src: {
        root: '',
        rootApp: 'app/',
        assets: 'app/assets/',
        css: 'app/assets/css/',
        fonts: 'app/assets/fonts/',
        icons: 'app/assets/icons/',
        images: 'app/assets/images/',
        lang: 'app/lang/',
        data: 'data/',
        server: 'server/'
    },
    dist: {
        root: 'dist/',
        rootApp: 'dist/app/',
        assets: 'dist/app/assets/',
        css: 'dist/app/assets/css/',
        fonts: 'dist/app/assets/fonts/',
        icons: 'dist/app/assets/icons/',
        images: 'dist/app/assets/images/',
        lang: 'dist/app/lang/',
        data: 'dist/data/',
        server: 'dist/server/'
    }

};

// NODEMON TASK
// =====================================================================================================================
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ignore: [
            '.gitignore',
            'gitignore',
            'app/**',
            'data/**',
            'node_modules/**'
        ],
        watch: ['app.js', '/server/**/*.js']
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) {
                cb();
            }
            called = true;
        })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

// BROWSER SYNC
// =====================================================================================================================
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync({
        proxy: 'http://localhost:9000',
        port: 4000,
        notify: false,
        browser: 'google chrome',
        reloadDelay: 500
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// SASS
// =====================================================================================================================
gulp.task('sass', function () {
    var sassFiles = [
        'app/assets/css/**/*.+(scss|sass)',
        'app/actionButtonComponent/scss/*.+(scss|sass)'
    ];
    return gulp.src(sassFiles)
        .pipe(sass())
        .pipe(autoprefixer(['last 2 versions', '> 1%'], {cascade: true}))
        .pipe(gulp.dest(options.dist.css))
        .pipe(browserSync.stream());
});

// HTML Templates
// =====================================================================================================================
gulp.task('templates', function () {
    var templates = [
        options.src.root + '**/*.html',
        '!' + options.src.root + 'dist/**/*',
        '!' + options.src.root + 'node_modules/**/*'
    ];
    // console.log(templates);
    return gulp.src(templates)
        .pipe(gulp.dest(options.dist.root));
});

// BABEL
// =====================================================================================================================
gulp.task('babel', function () {
    return gulp.src(options.src.rootApp + '**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(options.dist.rootApp));
});


// DEFAULT
// =====================================================================================================================
gulp.task('default', ['browser-sync'], function () {
    var fonts, images, icons, lang;
    fonts = gulp.src(options.src.fonts + '**/*')
        .pipe(gulp.dest(options.dist.fonts));

    images = gulp.src(options.src.images + '**/*')
        .pipe(gulp.dest(options.dist.images));

    icons = gulp.src(options.src.icons + '**/*')
        .pipe(gulp.dest(options.dist.icons));

    lang = gulp.src(options.src.lang + '**/*')
        .pipe(gulp.dest(options.dist.lang));

    gulp.watch('app/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/**/*.js', ['babel', 'bs-reload']);
    gulp.watch('app/**/*.html', ['templates', 'bs-reload']);

});

// GULP BUILD
// =====================================================================================================================
gulp.task('build', ['sass', 'templates', 'babel'], function () {
    var fonts, images, icons, lang, server, data, app;
    fonts = gulp.src(options.src.fonts + '**/*')
        .pipe(gulp.dest(options.dist.fonts));

    images = gulp.src(options.src.images + '**/*')
        .pipe(gulp.dest(options.dist.images));

    icons = gulp.src(options.src.icons + '**/*')
        .pipe(gulp.dest(options.dist.icons));

    lang = gulp.src(options.src.lang + '**/*')
        .pipe(gulp.dest(options.dist.lang));

    data = gulp.src(options.src.data+ '**/*')
        .pipe(gulp.dest(options.dist.data));

    app = gulp.src(options.src.root+ 'app.js')
        .pipe(gulp.dest(options.dist.root));

    server = gulp.src(options.src.server + '**/*')
        .pipe(gulp.dest(options.dist.server));

});