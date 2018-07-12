const path = require('path');

module.exports = {

  context: path.resolve(__dirname, '..'),


  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ],
        include: [
          /crude-docs/
        ]
      },
    ]
  }

};
