const path = require('path');
const webpack = require('webpack');
const IsoPlugin = require('webpack-isomorphic-tools/plugin');
const Html = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

let config = {
  assets: {
    images: {extensions: ['png']}
  }
}


module.exports = {

  entry: {
    docs: './website/docs.js',
    home: './website/home.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve('__dirname', '../dist')
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.resolve(__dirname,'../node_modules')
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [

    new ManifestPlugin({
      fileName: '../assets-manifest.json'
    }),
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),

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
