var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');

var firstFile = './index.js';
var outFile = 'bundle.js';

//gulp.task('browserify', function() {
gulp.task('release', function() {
  browserify(firstFile, { debug: false }) //debug: true is for sourcemap
    .transform(babelify)
    //.external('react')
    //.external('react-dom')
    //.require('react')
    //.require('react-dom')
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(outFile))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('dev', function() {
  browserify(firstFile, { debug: true }) //debug: true is for sourcemap
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(outFile))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
  //gulp.watch(/.jsx?$/, ['browserify'])
  //gulp.watch('./*.jsx', ['browserify'])
  gulp.watch('**/*.jsx', ['release'])
});

gulp.task('web', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['bro', 'watch', 'web']);
