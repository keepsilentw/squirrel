'use strict';

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const DIST = path.join(__dirname, 'dist');

const common = {
  entry: [path.join(__dirname, '/src/app.js')],
  output: {path: DIST, filename: 'app.[hash].js'},
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')},
      {test: /\.(png|jpg)$/, loader: 'url?limit=32768'}
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.[chunkhash].css', {allChunks: true}),
    new HtmlWebpackPlugin({template: path.resolve('src', 'index.html'), inject: 'body'}),
  ]
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    entry: ['webpack/hot/dev-server', 'webpack/hot/only-dev-server'],
    devtool: 'eval-source-map',
    devServer: {
      contentBase: './src',
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: 'localhost',
      port: 3000
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({url: 'http://localhost:3000'})
    ]
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new CleanPlugin([DIST]),
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        output: {comments: false}
      })
    ]
  })
}
