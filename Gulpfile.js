var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


gulp.task('styles', function() {
    gulp.src('app/**/*.scss')
        .pipe($.watch(function(files) {
            files.pipe($.sass())
                 .pipe($.autoprefixer())
                 .pipe($.minifyCss())
                 .pipe(gulp.dest('./dist'))
                 .pipe($.livereload());
        }));
});

gulp.task('copy', function() {
    gulp.src('app/**/*.html')
        .pipe($.watch())
        .pipe($.embedlr())
        .pipe(gulp.dest('./dist'))
});

gulp.task('serve', $.serve({
    root: ['dist', 'app'],
    port: 9000
}));

gulp.task('livereload', $.livereload)

gulp.task('default', ['styles', 'copy', 'serve', 'livereload']);
