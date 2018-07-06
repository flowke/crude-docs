const webpack = require('webpack');
const Router = require('koa-router');
const config = require('../webpackConf/dev');
const path = require('path');
const chokidar = require('chokidar');
const Koa = require('koa');
const koaWebpack = require('koa-webpack');
const stringify = require('json-stringify-safe');
const WebSocket = require('ws');
const fs = require('fs');
const chalk = require('chalk');

const {open} = require('./tools');

const siteCfg = {sideBar} = require(path.resolve('./SiteCfg'));
const {
  renderFile,
  md2Html,
  stripExt,
  parseMeta
} = require('./utils');

let templatePath = path.resolve(__dirname, '../website/template/dev.html');

const app = new Koa();

let compiler = webpack(config);

koaWebpack({
  compiler,
  devMiddleware: {
    logLevel: 'info'
  },
  hotClient: {
    reload: false,
    hmr: true,
    allEntries: true,
    host: 'localhost',
    port: 3002,
  }
})
.then((mw)=>{
  let {hotClient, devMiddleware, close} = mw;
  app.use(mw);
  addFun(app, compiler);

  // 开启浏览器
  open(3001);

  // 监控 md 文件的变化
  const watcher = chokidar.watch([
    path.resolve(process.cwd(), 'docs'),
    path.resolve(process.cwd(), 'page')
  ]);
  const socket = new WebSocket('ws://localhost:3002');
  watcher.on('change', () => {
    const data = {
      type: 'broadcast',
      data: {
        type: 'window-reload',
        data: {},
      },
    };

    socket.send(stringify(data));
  });
  devMiddleware.on('close', () => {
    watcher.close();
  });

});

app.listen(3001);

function addFun(app, compiler){

  app.use(async (ctx, next)=>{

    ctx.manifest = JSON.parse(compiler.outputFileSystem.readFileSync(path.resolve(__dirname, '../.temp-script/assets-manifest-dev.json')));

    await next();
  });

  const router = new Router();

  app.use(router.routes());

  router.get('/:page?', (ctx)=>{

    let {manifest, params} = ctx;
    let {page} = params;

    if(!page) page = 'index';

    let name = stripExt(page);
    let fileName = path.resolve('./page', `${name}.md`);

    if(!fs.existsSync(fileName)){
      console.log();
      console.log(chalk.red('遇到一个未期望的请求!!'));
      console.log(chalk.red(`/${page}`));
      console.log();
      return;
    }


    let sourceData = parseMeta(fileName);

    let article = md2Html(sourceData.source);

    let tpData = {
      pageJS: manifest['home.js'],
      title: sourceData.title,
      initData: JSON.stringify({
        curtLink: '/',
        content: article,
        siteCfg,
      })
    };

    let html = renderFile(templatePath, tpData);

    ctx.body = html;

  });

  router.get('/:docType/:file', ctx=>{
    let {manifest, params} = ctx;

    let {docType, file} = params;

    let name = stripExt(file);
    let fileName = path.resolve('./docs', docType, `${name}.md`);

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
      pageJS: manifest['docs.js'],
      title: sourceData.title,
      initData: JSON.stringify({
        article,
        curtLink: docType,
        siteCfg,
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
