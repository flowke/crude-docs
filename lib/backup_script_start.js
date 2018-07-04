const webpack = require('webpack');
const webpackServe = require('webpack-serve');
const Router = require('koa-router');
const config = require('../webpackConf/dev');
const { execSync } = require('child_process');
const path = require('path');
const chokidar = require('chokidar');
const stringify = require('json-stringify-safe');
const WebSocket = require('ws');
const {sideBar} = require('../SiteCfg');
const {
  renderFile,
  md2Html,
  stripExt,
  parseMeta
} = require('./utils');


let templatePath = path.resolve(__dirname, '../website/template/dev.html');

module.exports = function(){

  webpackServe({
    // compiler: webpack(config),
    config: config,
    hot: {
      reload: false,
      hmr: true,
      allEntries: true,
      host: 'localhost',
      port: 3002,
    },
    dev: {
      publicPath: '/'
    },
    port: 3001,
    add: addFun
  })
  .then(server=>{
    server.on('listening', ({ server, options })=>{

      // 开启浏览器
      execSync('ps cax | grep "Google Chrome"');
      execSync(
        `osascript chrome.applescript "${encodeURI(
          `http://localhost:${options.port}`
        )}"`,
        {
          cwd: __dirname,
          stdio: 'ignore',
        }
      );
      console.log(options.compiler, '---in server on');
      // 监控 md 文件的变化
      const socket = new WebSocket(`ws://localhost:${3002}`);
      const watcher = chokidar.watch([
        path.resolve(process.cwd(), 'docs'),
        path.resolve(process.cwd(), 'page')
      ]);
      watcher.on('change', () => {
        options.compiler.invalidate();
      });
      server.on('close', () => {
        watcher.close();
      });

    })
  });
};

function addFun(app, middleware, op){
  middleware.webpack();
  middleware.content();

  console.log(op.compiler, '--compiler');


  const router = new Router();

  app.use(async (ctx, next)=>{
    // ctx.manifest = JSON.parse(op.compiler.outputFileSystem.readFileSync(path.resolve(__dirname, '../assets-manifest-dev.json')));
    ctx.manifest = {}
    console.log(ctx.manifest);
    await next();
  });

  app.use(router.routes());

  router.get('/', (ctx)=>{

    let {manifest} = ctx;



    let tpData = {
      pageJS: '/home.js',
      initData: JSON.stringify({
        curtLink: '/',
        content: '从这里开始'
      })
    };

    let html = renderFile(templatePath, tpData);

    ctx.body = html;

  });

  router.get('/:docType/:file', ctx=>{
    let {manifest, params} = ctx;

    let {docType, file} = params;

    let name = stripExt(file);
    let fileName = path.resolve(__dirname, '../docs', docType, `${name}.md`);

    // 从md文件解析出的元数据
    let sourceData = parseMeta(fileName);

    if(!sourceData){
      ctx.body = '404';
      return;
    }

    // 文档内容
    let article = md2Html(sourceData.source);

    // 模板文件的数据
    let tpData = {
      pageJS: '/docs.js',
      title: sourceData.title,
      initData: JSON.stringify({
        article,
        curtLink: docType,
        docs: sideBar[docType].map(elt=>{
          let links = elt.list.map(item=>{
            return {
              url: `/${docType}/${elt.level}-${item[0]}.html`,
              active: `${elt.level}-${item[0]}` === name
            }
          });

          elt.links = links;

          return elt;
        })
      })
    };

    let html = renderFile(templatePath, tpData);

    ctx.body = html;

  });
}
