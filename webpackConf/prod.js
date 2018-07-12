const baseCfg = require('./base');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');
const path = require('path');
const {pathPrefix} = require(path.resolve('./SiteCfg'));
const {formatPrefix} = require('../lib/utils');
const merge = require('webpack-merge');

let outputPath = '';
let publicPath = '';
let {pg_command} = process.env;


if(pg_command === 'build'){
  outputPath = path.join(process.cwd(), 'dist');
}
if(pg_command === 'preview'){
  outputPath = path.join(process.cwd(), 'dist', formatPrefix(pathPrefix));
}


const config = merge(baseCfg, {
  mode: 'production',

  entry: {
    home: './website/home.js',
    docs: './website/docs.js'
  },

  output: {
    path: outputPath,
    filename: 'assets/js/[name]_[hash].js',
    publicPath: formatPrefix(pathPrefix, true),
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
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/[name].css'
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

let {npm_lifecycle_event, script_cycle} = process.env;

let isAssetsCycle = npm_lifecycle_event === 'build:assets' || script_cycle === 'build:assets';

if(isAssetsCycle){
  config.plugins.push(
    new ManifestPlugin({
      fileName: path.resolve(__dirname, '../.temp-script/assets-manifest-dist.json')
    }),
    // new Html({
    //   filename: path.resolve(__dirname, '../.temp-script/prod.html'),
    //   template: './website/template/prod.html'
    // })
  )
}

module.exports = config;
