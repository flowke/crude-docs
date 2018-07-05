const baseCfg = require('./base');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');
const path = require('path');

const merge = require('webpack-merge');


const config = merge(baseCfg, {
  mode: 'production',

  entry: {
    home: './website/home.js',
    docs: './website/docs.js'
  },

  output: {
    path: path.resolve('./dist/assets'),
    filename: 'js/[name]_[hash].js'
  },

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
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
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
});

if(process.env.npm_lifecycle_event === 'build:assets'){
  config.plugins.push(
    new ManifestPlugin({
      fileName: path.resolve(__dirname, '../assets-manifest-dist.json')
    }),
    // new Html({
    //   filename: path.resolve(__dirname, '../.temp-script/prod.html'),
    //   template: './website/template/prod.html'
    // })
  )
}

module.exports = config;
