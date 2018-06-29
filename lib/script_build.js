const cfg = require('../webpackConf/server.babel');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const path = require('path');


const compiler = webpack(cfg);

compiler.run((err, stats)=>{
  if(!err){

    require('../.temp-script/server');
  }
});
