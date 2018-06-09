const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const config = require('../webpackConf/dev');
const openBrowser = require('react-dev-utils/openBrowser');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();

let compiler = webpack(config);


app.use(devMiddleware(compiler, {
  publicPath: '/',
  stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler))


app.listen(3001,()=>{
  let open = openBrowser('http://localhost:3001');

  if(open){
    console.log('浏览器已经打开');
  }

});
