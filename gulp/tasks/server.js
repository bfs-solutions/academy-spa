
"use strict";

const path = require("path");
const gulp = require('gulp');
const connect = require("gulp-connect");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (config)=> ()=> {
    connect.server({
        root: config.root,
        port: config.port,
        livereload: {
            port: 50000
        },
        fallback: config.root + '/index.html',
        middleware: function() {
            return config.proxies.map(
                item => createProxyMiddleware(item.path, {
                    target: item.target,
                    changeOrigin: true,
                    secure: false
                })
            );
        }
    });

    gulp.watch(path.join(config.root, "./**"), () => connect.reload());
};