var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var express = require('express');

var mainfile = './src/color-robin.js';

// Link
gulp.task('link', function() {
    return browserify(mainfile)
    .bundle()
    .pipe(source('color-robin.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('color-robin.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// Watch
gulp.task('watch', ['link'], function() {
    gulp.watch('./src/**/*.js', ['link']);
});

// Serve
gulp.task('serve', function() {
    const app = express();
    app.use(express.static('./example'));
    app.use(express.static('./dist'));
    app.listen(3000, () => console.log('Example app listening on port 3000!'));
});