const startServer = require('universal-webpack/server');
const settings = require('../webpackConf/universal-webpack-settings.json');
const webpackCfg = require('../webpackConf/build');


module.exports = function () {
  startServer(webpackCfg, settings)
}
