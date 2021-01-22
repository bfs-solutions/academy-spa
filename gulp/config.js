/* Configuration for tasks registered with the gulp task runner */

"use strict";

const path = require("path");

const config = {
    // base gulp stream source
    _src: "./src/",

    // common gulp stream destination
    _dest: "./build"
};

/* Configuration for the default task.
 *
 * The default task is the site build process. The configuration needed by the
 * default task is a list of subtasks that need to be run to build the site.
 */
config.default = ["copy", "style", "html", "browserify", "browserify_vendor"];

/* Configuration for the Style task.
 *
 * The configuration for the Style task is the list of concrete subtasks that
 * need to be performed to produce the Style content of the site.
 */
config.style = ["sass"];

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
    src: [
        path.join(config._src, "./app/smart-academy.module.js")
    ],
    dest: path.join(config._dest, "./app")
};

config.browserify_vendor = {
    src: [
        path.join(config._src, "./vendor.js")
    ],
    dest: config._dest
};

config.watch = [
    [config.copy.src, ["copy"]],
    [config.sass.src, ["sass"]],
    [config.html.src, ["html"]],
    [[
        ...config.browserify.src,
        path.join(config._src, "./**/*.js"),
        path.join(config._src, "./**/*.html")
    ], ["browserify"]],
    [config.browserify_vendor.src, ["browserify_vendor"]]
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

module.exports = config;