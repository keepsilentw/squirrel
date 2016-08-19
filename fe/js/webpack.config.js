const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const vendor = [
  './node_modules/angular/angular.js',
  './node_modules/angular-animate/angular-animate.js',
  './node_modules/angular-chart.js/dist/angular-chart.js',
  './node_modules/angular-file-upload/dist/angular-file-upload.js',
  './node_modules/angular-h-sweetalert/dist/ngSweetAlert.js',
  './node_modules/angular-i18n/angular-locale_zh-cn.js',
  './node_modules/angular-loading-bar/build/loading-bar.js',
  './node_modules/angular-resource/angular-resource.js',
  './node_modules/angular-ui-bootstrap',
  './node_modules/angular-ui-router/release/angular-ui-router.js',
  './node_modules/angularjs-toaster/toaster.js'
];

const common = {
  entry: {vendor: vendor, app: './src/app.js'},
  output: {filename: '[name].[hash].js'},
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: [/node_modules/, /base\.js/]},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap')},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.(png|jpg)$/, loader: 'url?limit=32768'},
      {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]', exclude: /index\.html/},
      {test: /\.json$/, loader: 'json'},
      {test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  },
  resolve: {alias: {'jqueryDownload': 'jquery-file-download/src/Scripts/jquery.fileDownload.js'}},
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([{from: './src/base.js'}, {from: './src/base.js.etpl'}]),
    new ExtractTextPlugin('styles.[chunkhash].css', {allChunks: true}),
    new HtmlWebpackPlugin({template: path.resolve('src', 'index.html'), inject: 'body'}),
    new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'})
  ]
}

const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'dev') {
  module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
      contentBase: './src',
      historyApiFallback: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: 'localhost',
      port: 8000
    },
    plugins: [new OpenBrowserPlugin({url: 'http://localhost:8000'})]
  })
}

const DIST = path.join(__dirname, 'dist');

if (TARGET === 'dep') {
  module.exports = merge(common, {
    output: {path: DIST},
    plugins: [
      new CleanPlugin([DIST]),
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}})
    ]
  })
}
