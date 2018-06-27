const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {

  context: path.resolve(__dirname, '..'),


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


  ],


};
