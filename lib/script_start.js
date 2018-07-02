const webpack = require('webpack');
const Koa = require('koa');
const Router = require('koa-router');
const devMiddleware = require('koa-webpack-dev-middleware');
const config = require('../webpackConf/dev');
const openBrowser = require('react-dev-utils/openBrowser');
const fs = require('fs');
const path = require('path');
const {sideBar} = require('../SiteCfg');
const {
  renderFile,
  md2Html,
  stripExt,
  parseMeta
} = require('./utils');

let templatePath = path.resolve(__dirname, '../website/template/dev.html');

module.exports = function(){

  const app = new Koa();
  const router = new Router();

  let compiler = webpack(config);

  let devMid = devMiddleware(compiler, {
    publicPath: '/',
    stats: {colors: true}
  });


  app.use(devMid);

  app.use(async (ctx, next)=>{
    ctx.manifest = JSON.parse(devMid.fileSystem.readFileSync(path.resolve(__dirname, '../assets-manifest-dev.json')));
    await next();
  });
  app.use(router.routes());

  router.get('/', (ctx)=>{

    let {manifest} = ctx;

    let tpData = {
      pageJS: manifest['home.js'],
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
      pageJS: manifest['docs.js'],
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

  app.listen(3001,()=>{
    let open = openBrowser('http://localhost:3001');

    if(open){
      console.log('浏览器已经打开');
    }

  });
};
