const merge = require('webpack-merge');
const config = require('./prod');
const path = require('path');

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


  optimization: {
    minimize: false
  }

});
