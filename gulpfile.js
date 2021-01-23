/* Gulp task runner settings */

'use strict';

const path = require('path');
const gulp = require('gulp');
const FwdRef = require('undertaker-forward-reference');

// provide an alternate gulp task registry to allow forward definitions
gulp.registry(FwdRef());

const config = {
    // base gulp stream source
    _src: "./src/",

    // common gulp stream destination
    _dest: "./build",
};

config.default = gulp.parallel('sass', 'html', 'copy', 'browserify');

config.sass = {
    src: [path.join(config._src, "./**/*.sass")],
    dest: config._dest
};

config.html = {
    src: [path.join(config._src, "./index.html")],
    dest: config._dest
};

config.copy = {
    src: [
        path.join(config._src, "./**/*.jpg"),
        path.join(config._src, "./**/*.png"),
        path.join(config._src, "./**/*.json"),
        path.join(
            path.dirname(require.resolve('font-awesome/package.json')),
            '**/*.woff2'
        ),
        path.join(
            path.dirname(require.resolve('font-awesome/package.json')),
            '**/*.woff'
        ),
        path.join(
            path.dirname(require.resolve('font-awesome/package.json')),
            '**/*.ttf'
        )
    ],
    dest: config._dest
};

config.browserify = {
    base: config._src,
    src: [
        path.join(config._src, "./main.js")
    ],
    dest: path.join(config._dest)
};

config.watch = [
    [config.copy.src, gulp.series("copy")],
    [config.sass.src, gulp.series("sass")],
    [config.html.src, gulp.series("html")],
    [[
        ...config.browserify.src,
        path.join(config._src, "./**/*.js"),
        path.join(config._src, "./**/*.html")
    ], gulp.series("browserify")]
];

config.server = {
    root: config._dest,
    port: 4040,
    proxies: [
        { path: "/users", target: "https://localhost:4443" },
        { path: "/institutions", target: "https://localhost:4443" },
        { path: "/courses", target: "https://localhost:4443" },
        { path: "/editions", target: "https://localhost:4443" },
        { path: "/groups", target: "https://localhost:4443" },
        { path: "/students", target: "https://localhost:4443" },
        { path: "/subjects", target: "https://localhost:4443" },
        { path: "/halfs", target: "https://localhost:4443" },
        { path: "/partials", target: "https://localhost:4443" },
        { path: "/components", target: "https://localhost:4443" },
        { path: "/enrollments", target: "https://localhost:4443" },
        { path: "/grades", target: "https://localhost:4443" },
        { path: "/teachings", target: "https://localhost:4443" }
    ]
};

const tasks = require('require-dir')('./gulp/tasks');

// register all tasks
Object.keys(tasks).forEach(
    (name)=> gulp.task.apply(gulp, [name].concat(tasks[name](config[name])))
);