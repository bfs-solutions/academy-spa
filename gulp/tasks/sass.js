
'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      moduleImporter = require('sass-module-importer');

module.exports = (config)=> [()=>
    gulp.src(config.src)
        .pipe(sass({ importer: moduleImporter() }).on('error', sass.logError))
        .pipe(gulp.dest(config.dest))
];