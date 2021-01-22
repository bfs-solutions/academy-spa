/* Gulp task runner settings */

"use strict";

const gulp = require('gulp'),
      config = require("./gulp/config"),
      tasks = require('require-dir')('./gulp/tasks');

// register all tasks
Object.keys(tasks).forEach(
    (name)=> gulp.task.apply(gulp, [name].concat(tasks[name](config[name])))
);