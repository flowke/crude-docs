const baseCfg = require('./base');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const merge = require('webpack-merge');

module.exports = merge(baseCfg, {
  mode: 'development',

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
    new CleanWebpackPlugin(['dist/*', 'temp-script/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new ManifestPlugin({
      fileName: '../assets-manifest-dist.json'
    }),
    new MiniCssExtractPlugin({
      fileName: '[name].css',
      chunkFilename: '[name].css'
    })
  ],

  optimization: {
    // splitChunks: {
    //   automaticNameDelimiter: '-',
    //   chunks: 'all',
    //   cacheGroups: {
    //     default: false,
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: "vendor",
    //       chunks: "all"
    //     }
    //   }
    // }
  }

});
