const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {

  context: path.resolve(__dirname, '..'),


  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },

    ]
  }

};
