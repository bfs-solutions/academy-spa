/* HTML Gulp task */

'use strict';

const gulp = require('gulp');
const changed = require("gulp-changed");
const replace = require('gulp-replace');

module.exports = (config)=> ()=> gulp.src(config.src)
    .pipe(changed(config.dest))
    // replace sass files by its counterparts on destination
    .pipe(replace('.sass', '.css'))
    // replace javascript files by its minified counterparts on destination
    .pipe(replace('.js', '.min.js'))
    .pipe(gulp.dest(config.dest));