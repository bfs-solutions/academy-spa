
"use strict";

const gulp = require('gulp'),
      changed = require("gulp-changed");

module.exports = (config)=> [()=>
    gulp.src(config.src)
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest))
];