var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var headerfooter = require('gulp-headerfooter');

var jshint = require('gulp-jshint');
    
gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function(){
    gulp.src([
        'src/**/*module.js',
        'src/**/*.js'])
        .pipe(headerfooter(
            '(function() {\n    \'use strict\';\n\n',
            '\n\n})();'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});
 
 
 gulp.task('copy', function(){
     gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));
        
 });
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
 //s     open: true,
      path : "/dist",
      fallback: "index.html"
    }));
});
gulp.task('watchSrc', function(){
    gulp.watch('src/**/*', ['jshint','copy', 'concat']);
});


gulp.task('default', ['watchSrc', 'webserver']);