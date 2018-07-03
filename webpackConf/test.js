const Html = require('html-webpack-plugin');

module.exports = {

  entry: './website/docs.dev.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new Html({
      template: './website/template/dev.html'
    })
  ]
};
