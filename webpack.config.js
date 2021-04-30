module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/, // this just tells use raw-loader to load *.htm files
                use: 'raw-loader'
            }
        ]
    }
};