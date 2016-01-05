var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var headerfooter = require('gulp-headerfooter');
var html2Js = require('gulp-ng-html2js');

var jshint = require('gulp-jshint');
    
gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function(){
    gulp.src([
        'src/**/*module.js',
        'src/**/*.js',
        'build/partials/**/*.js'])
        .pipe(headerfooter(
            '(function() {\n    \'use strict\';\n\n',
            '\n\n})();'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});
 gulp.task('partials',function(){
     gulp.src("./src/**/*partial.html")
        .pipe(html2Js({
            moduleName: "HtmlPartials",
            prefix: "",
            rename: function(templateUrl, templateFile){
                return templateUrl.replace(/^.*[\\\/]/, '');
            }
        }))
        .pipe(gulp.dest("./build/partials"));
 });
 
 gulp.task('copy', ['partials'], function(){
     gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));
        
 });
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false, // With this off it opens index.html otherwise issues
//      open: true
    }));
});
gulp.task('watchSrc', function(){
    gulp.watch(['src/**/*','dist/css/my.css'], ['jshint','copy', 'concat']);
});


gulp.task('default', ['watchSrc', 'webserver']);