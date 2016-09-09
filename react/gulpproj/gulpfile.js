var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');

var inFile = './app/src/index.js';
var outFile = './app/dist/index.bundle.js';

//gulp.task('browserify', function() {
gulp.task('release', function() {
  process.env.NODE_ENV = 'production';
  browserify(inFile, { debug: false }) //debug: true is for sourcemap
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
  browserify(inFile, { debug: true }) //debug: true is for sourcemap
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(outFile))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
  //gulp.watch(/.jsx?$/, ['browserify'])
  //gulp.watch('./*.jsx', ['browserify'])
  gulp.watch('**/*.jsx', ['dev'])
});

gulp.task('web', function() {
  gulp.src('app')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('do', ['dev', 'watch', 'web']);
gulp.task('default', ['release', 'watch', 'web']);
