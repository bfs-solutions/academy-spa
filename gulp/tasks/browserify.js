
"use strict";

const gulp = require('gulp')
const tap = require('gulp-tap');
const browserify = require('browserify');
const babelify = require('babelify');
const stringify = require('stringify');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');

module.exports = ({ base, src, dest })=> ()=> gulp.src(src, { read: false, base })
    .pipe(tap(function (file) {
        
        // replace file contents with browserify's bundle stream
        file.contents = browserify(file.path, { debug: true,  })
            .transform(babelify.configure({
                presets: ['@babel/env'],
                plugins: ['@babel/transform-runtime']
            }))
            .transform(stringify, {
                appliesTo: { includeExtensions: ['.html', '.txt'] }
            })
            .bundle();

        file.path = file.path.replace(".js", ".min.js");

    }))

    .pipe(buffer())

    .pipe(sourcemaps.init({
        loadMaps: true // Load the sourcemaps browserify already generated
    }))

    .pipe(ngAnnotate())

    .pipe(uglify())

    .pipe(sourcemaps.write('./', {
        includeContent: true
    }))

    .pipe(gulp.dest(dest));