/* SASS Gulp task */

"use strict";

const gulp = require('gulp');
const changed = require("gulp-changed");
const sass = require('gulp-sass');
const moduleImporter = require('sass-module-importer');

module.exports = (config) => () => gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(sass({ importer: moduleImporter() }).on('error', sass.logError))
    .pipe(gulp.dest(config.dest));