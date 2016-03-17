'use strict';

var path = require('path');
var webpack = require('webpack');

var config = {
  entry:  __dirname + '/assets/javascripts/app.js',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'main.js'
  },

  module: {
    loaders: [
      { test: /.js$/, loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },

  resolve: {
    root: path.join(__dirname, 'assets', 'javascripts'),
    extensions: ['', '.js', '.jsx', '.coffee', '.js.coffee', '.jsx.coffee','.js.jsx.coffee'],
    modulesDirectories: ["node_modules", "javascripts"]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "React": 'react',
      "_": 'underscore'
    })
  ]
};

config.output.publicPath = './dist';
config.devtool = 'cheap-module-eval-source-map';

module.exports = config;
