const Koa = require('koa');
const koaRouter = require('koa-router');
const serveStatic = require('serve-static');
const path = require('path');

const fs = require('fs');

const {
  renderFile,
  parseMeta,
  md2Html,
  stripExt
} = require('../helper/contentHandle');


module.exports = function(dir='.'){

  const app = new Koa();
  const router = new koaRouter();

  router.use('/assets', serveStatic(path.resolve(dir,'assets')));

  router
  .get('/documents/*', async ctx=>{
    let name = stripExt(ctx.params[0]);

    let file = path.resolve(dir, 'docs', name + '.md');

    try {
      let html = await new Promise(function(resolve, reject) {
        fs.readFile(file, (err, content)=>{
          if(err) reject(new Error('文件没有找到'));

          let data = parseMeta(content.toString(), file);

          if(!data) resolve('页面出错!!');

          try {
              data.content = md2Html(data.source);
              resolve(html);
          } catch (e) {
            reject(new Error('解析文件出错'))
          }
        });
      });

      ctx.body = html;

    } catch (e) {
      if(e.message==='文件没有找到'){
        ctx.body = '文件没有找到';
      }
    }




  })
  .get('/', ctx=>{
    ctx.body = '文章列表'
  })

  app.use(router.routes());

  app.listen(3000);

};
