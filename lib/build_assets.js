const cfg = require('../webpackConf/prod');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const path = require('path');
const chalk = require('chalk');

const compiler = webpack(cfg);

compiler.run((err, stats)=>{
  if(!err){
    console.log(chalk.cyan('assets 生成完成!'));
  }
});
