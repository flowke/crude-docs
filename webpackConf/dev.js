const path = require('path');
const IsoPlugin = require('webpack-isomorphic-tools/plugin');
const Html = require('html-webpack-plugin');

let config = {
  assets: {
    images: {extensions: ['png']}
  }
}


module.exports = {

  entry: './website/app.js',
  output: {
    filename: 'main.js',
    publicPath: '/'
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
    new Html({
      template: 'website/index.html'
    })
  ]
};
