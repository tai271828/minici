/*
 * Copyright (C) 2016-2017 Canonical Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var babel = require("gulp-babel");
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');
var inline = require('gulp-inline')

var path = {
  BASE: 'app/',
  SRC: 'app/',
  BUILD: 'build/',
	DIST: 'static/'
};

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

// Compile the Vanilla SASS files into the CSS folder
gulp.task('sass', function () {
    gulp.src(path.BASE + 'sass/*.scss')
        .pipe(sass().on('error', sass.logError))
				.pipe(uglifycss())
        .pipe(gulp.dest(path.DIST + 'css'));
});

// Compile the JSX/ES6 files to Javascript in the build directory
gulp.task('compile_components', function(){
    return gulp.src(path.SRC + 'components/*.js')
        .pipe(babel())
        .pipe(gulp.dest(path.BUILD + 'components/'));
});

gulp.task('compile_app', ['compile_components'], function(){
    return gulp.src(path.SRC + '*.js')
        .pipe(babel())
        .pipe(gulp.dest(path.BUILD));
});

// Clean the build files
gulp.task('clean', ['build', 'sass'], function() {
    del([path.BUILD + '**/*']);
});

gulp.task('build', ['compile_app'], function(){
  return gulp.src([path.BUILD + 'app.js'])
    .pipe(browserify({}))
    .on('prebundle', function(bundler) {
        // Make React available externally for dev tools
        bundler.require('react');
    })
    .pipe(rename('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.DIST + 'js/'));
});

gulp.task('index.html', ['build'], function() {
  return gulp.src([path.DIST + 'index.html'])
  .pipe(inline({
    base: './',
    js: uglify,
    css: uglifycss,
    disabledTypes: [],
    ignore: []
  }))
  .pipe(gulp.dest('./'));
})

// Default: remember that these tasks get run asynchronously
gulp.task('default', ['set-prod-node-env', 'index.html', 'sass', 'clean']);
