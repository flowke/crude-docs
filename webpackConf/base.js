const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {

  context: path.resolve(__dirname, '..'),

  entry: {
    docs: './website/docs.js',
    home: './website/home.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.resolve(__dirname,'../node_modules')
        ]
      },

    ]
  },

  plugins: [

    // new CleanWebpackPlugin(['dist/*'], {
    //   root: path.resolve(__dirname, '../')
    // }),
  ],

  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};
