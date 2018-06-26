const baseCfg = require('./base');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

module.exports = merge(baseCfg, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      fileName: '[name].css',
      chunkFilename: '[name].css'
    })
  ]

});
