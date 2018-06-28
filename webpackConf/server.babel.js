const merge = require('webpack-merge');
const config = require('./prod');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = merge.strategy({
  entry: 'replace',
  output: 'replace',
  optimization: 'replace'
})(config, {

  target: 'node',

  entry: './lib/build',

  output: {
    path: path.resolve(__dirname, '../.temp-script'),
    filename: 'server.js'
  },

  node: {
    process: false,
    global: false,
    __filename: false,
    __dirname: false,
    fs: false
  },

  plugins: [

    // new CleanWebpackPlugin(['dist/*', '.temp-script/*'], {
    //   root: path.resolve(__dirname, '../')
    // }),
  ],

  optimization: {
    minimize: false,
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
