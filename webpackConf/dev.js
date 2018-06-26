const baseCfg = require('./base');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');

module.exports = merge(baseCfg, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(c|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new ManifestPlugin({
      fileName: '../assets-manifest-dev.json'
    }),
  ]

});
