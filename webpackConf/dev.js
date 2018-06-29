const baseCfg = require('./base');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(baseCfg, {
  mode: 'development',

  entry: {
    home: './website/home.dev.js',
    docs: './website/docs.dev.js'
  },

  output: {
    path: path.resolve(__dirname, '../.temp-script'),
    filename: '[name]_[hash].js',
    publicPath: '/'
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
      fileName: path.resolve('./assets-manifest-dev.json')
    }),
  ]

});
