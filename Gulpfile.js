var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    config = {
        // destinations
        tmp: '.tmp',
        app: 'app',
        dist: 'dist',
        // globs
        sass: 'app/**/*.scss',
    };


gulp.task('sass', function() {
    return gulp.src(config.sass)
               .pipe($.plumber())
               .pipe($.sass())
               .pipe($.autoprefixer())
               /*.pipe($.minifyCss())*/
               .pipe(gulp.dest(config.tmp))
               .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
    return browserSync({
        server: {
            baseDir: [config.tmp, config.app]
        }
    })
});

gulp.task('watch', function() {
    $.watch({glob: config.sass, name: 'Sass'}, ['sass']);
});

gulp.task('default', ['sass', 'watch', 'browser-sync']);
