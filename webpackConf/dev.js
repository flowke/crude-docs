const baseCfg = require('./base');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const path = require('path');
const Html = require('html-webpack-plugin');
const {pathPrefix} = require(path.resolve('./SiteCfg'));

const cfg = merge(baseCfg, {
  mode: 'development',


  entry: {
    home: ['./website/home.dev.js'],
    docs: ['./website/docs.dev.js']
  },

  output: {
    path: path.resolve(__dirname, '../.temp-script'),
    filename: '[name]_[name].js',
    publicPath: pathPrefix ? path.join('/', pathPrefix, '/') : '/',
  },

  module: {
    rules: [
      {
        test: /\.(c|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new ManifestPlugin({
      fileName: path.resolve(__dirname, '../.temp-script/assets-manifest-dev.json')
    })
  ]

});

module.exports = cfg;
