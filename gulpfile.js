var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    reload  = browserSync.reload;

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('less', function () {
    return gulp.src('less/*')
        .pipe(less()) // Using gulp-less
        .pipe(cleanCSS())
        .pipe(gulp.dest('css/'))
        .pipe(autoprefixer())
});

gulp.task('minify-css', () => {
    return gulp.src('less/*.less')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
    gulp.watch('less/*.less', gulp.series('less'));
    gulp.watch("css/*.css").on('change', browserSync.reload);
});

gulp.task('autoprefixer', function () {
    return gulp.src('css/custom.css')
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 version'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'));
});


