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
        css: 'app/**/*.less',
    };


gulp.task('css', function() {
    return gulp.src(config.css)
               .pipe($.plumber())
               .pipe($.less())
               .pipe($.autoprefixer())
               .pipe($.minifyCss())
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
  return $.watch(config.css, function(files, cb){
    gulp.start('css', cb);
  });
});

gulp.task('default', ['css', 'watch', 'browser-sync']);
