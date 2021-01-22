
"use strict";

const path = require("path"),
      connect = require("gulp-connect"),
      watch = require("gulp-watch"),
      proxy = require('http-proxy-middleware');

module.exports = (config)=> [['watch'], ()=> {
    connect.server({
        root: config.root,
        port: config.port,
        livereload: {
            port: 50000
        },
        fallback: config.root + '/index.html',
        middleware: function() {
            return config.proxies.map(
                item => proxy(item.path, {
                    target: item.target,
                    changeOrigin: true,
                    secure: false
                })
            );
        }
    });

    watch(path.join(config.root, "./**")).pipe(connect.reload());
}];