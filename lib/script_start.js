const webpack = require('webpack');
const Koa = require('koa');
const Router = require('koa-router');
const devMiddleware = require('koa-webpack-dev-middleware');
const config = require('../webpackConf/dev');
const openBrowser = require('react-dev-utils/openBrowser');
const swig = require('swig');
const fs = require('fs');
const path = require('path');
const {sideBar} = require('../SiteCfg');
const {
  renderFile,
  md2Html,
  stripExt,
  parseMeta
} = require('../helper/contentHandle');
console.log('hereTO');
swig.setDefaults({
  cache: false,
});

let templatePath = path.resolve(__dirname, '../website/template/index.html');

const app = new Koa();
const router = new Router();

let compiler = webpack(config);

let devMid = devMiddleware(compiler, {
  publicPath: '/',
  stats: {colors: true}
});


app.use(devMid);
app.use(async (ctx, next)=>{
  ctx.manifest = JSON.parse(devMid.fileSystem.readFileSync(path.resolve(__dirname, '../assets-manifest.json')));
  await next();

});
app.use(router.routes());

router.get('/', (ctx)=>{

  let {manifest} = ctx;

  let tpData = {
    pageScript: manifest['home.js'],
    vendorScript: manifest['vendor.js'],
    initData: JSON.stringify({
      curtLink: 'home'
    })
  };

  let html = renderFile(templatePath, tpData);

  ctx.body = html;

});

router.get('/:docType/:level/:file', ctx=>{
  let {manifest, params} = ctx;

  let {docType, level, file} = params;

  let name = stripExt(file);

  let fileName = path.resolve(__dirname, '../docs', docType, `${level}-${name}.md`);

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
    pageScript: manifest['docs.js'],
    vendorScript: manifest['vendor.js'],
    title: sourceData.title,
    initData: JSON.stringify({
      article,
      curtLink: docType,
      docs: sideBar[docType].map(elt=>{
        let links = elt.list.map(item=>{
          return {
            url: `/${docType}/${elt.level}/${item[0]}.html`,
            active: item[0] === name
          }
        } );

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
