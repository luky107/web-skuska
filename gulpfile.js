const config = {
    delimiter: require('path').sep

};
config.devPath = config.delimiter + 'dev/';
config.cwd = lastPartOfPath(__dirname);

var gulp = require('gulp'),
    yui = require('gulp-yuicompressor'),
    myth = require('gulp-myth'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    haml = require('gulp-haml'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('init', function () {
    gulp.start('styles');
    gulp.start('scripts');
});

gulp.task('styles', function () {
    return gulp.src('dev/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(myth({
            browser: ['last 3 versions']
        }))
        .pipe(yui({
            type: 'css'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
        ;
});

gulp.task('scripts', function () {
    return gulp.src('dev/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(yui({
            type: 'js'
        }))

        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream())
        ;
});


gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: 'localhost/' + config.cwd,
        notify: false,
        open: true
    })
});


gulp.task('watch', function () {
    gulp.watch(['*.html'], []).on('change', change);
    gulp.watch(['dev/**/*.css'], ['styles']).on('change', function () {
        gulp.watch(['dev/**/*.js'], ['scripts']).on('change', change);

    });
})
gulp.task('default', ['watch'], function () {
    gulp.start('browser-sync');
});


function lastPartOfPath(path) {
    return path.substring(path.lastIndexOf(config.delimiter) + 1)
}

function change() {
    browserSync.reload();
}