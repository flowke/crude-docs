const cfg = require('../webpackConf/server.babel');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');

const compiler = webpack(cfg);


console.log(chalk.cyan('开始生成页面...'));
console.log();

compiler.run((err, stats)=>{
  if(!err){

    require('../.temp-script/server');
  }
});
