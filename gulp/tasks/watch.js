
"use strict";

const gulp = require('gulp');

module.exports = (targets)=> [()=> {
    targets.forEach((target)=> gulp.watch.apply(gulp, target));
}];