const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map', 
  devServer: {
    contentBase: './build',
    proxy: {
      "/users": {
        target: "https://localhost:4443",
        secure: false
      },
      "/institutions": {
        target: "https://localhost:4443",
        secure: false
      },
      "/courses": {
        target: "https://localhost:4443",
        secure: false
      },
      "/editions": {
        target: "https://localhost:4443",
        secure: false
      },
      "/groups": {
        target: "https://localhost:4443",
        secure: false
      },
      "/students": {
        target: "https://localhost:4443",
        secure: false
      },
      "/subjects": {
        target: "https://localhost:4443",
        secure: false
      },
      "/halfs": {
        target: "https://localhost:4443",
        secure: false
      },
      "/partials": {
        target: "https://localhost:4443",
        secure: false
      },
      "/components": {
        target: "https://localhost:4443",
        secure: false
      },
      "/enrollments": {
        target: "https://localhost:4443",
        secure: false
      },
      "/grades": {
        target: "https://localhost:4443",
        secure: false
      },
      "/teachings": {
        target: "https://localhost:4443",
        secure: false
      }
    }
  }, 
  entry: {
    app: [
      './src/main.js',
      './src/styles/smart-academy.sass'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCSSExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/fixtures", to: "fixtures" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)s$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(css|sass)$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        use: "url-loader?limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        use: "file-loader" 
      }
    ]
  }
};