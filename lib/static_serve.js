var StaticServer = require('static-server');
const chalk = require('chalk');

module.exports = function(port, root){

  console.log(chalk.yellow(`静态服务根路径: ${root}`));

  return new StaticServer({
    rootPath: root,
    port: port,
    name: 'my-http-server',
    host: 'localhost',
    cors: '*',
  });
};
