
"use strict";

const gulp = require('gulp'),
      tap = require('gulp-tap'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      stringify = require('stringify'),
      buffer = require('gulp-buffer'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      ngAnnotate = require('gulp-ng-annotate');

module.exports = (config)=> [()=> {
    return gulp.src(config.src, { read: false })
        .pipe(tap(function (file) {

            // replace file contents with browserify's bundle stream
            file.contents = browserify(file.path, { debug: true,  })
                .transform(babelify.configure({
                    // You can configure babel here!
                    // https://babeljs.io/docs/usage/options/
                    presets: ["es2015"]
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

        // .pipe(uglify())

        .pipe(sourcemaps.write('./', {
            includeContent: true
        }))

        .pipe(gulp.dest(config.dest));
}];