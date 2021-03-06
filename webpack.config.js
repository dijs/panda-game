var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/basic',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'basic.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: "./src"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.(frag|vert)$/,
        include: path.join(__dirname, 'src'),
        loader: 'raw-loader',
      }
    ]
  },
  debug: true
};
