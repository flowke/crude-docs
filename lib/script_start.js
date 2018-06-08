const Koa = require('koa');
const koaRouter = require('koa-router');
const serveStatic = require('serve-static');
const path = require('path');
const markdownIt = require('markdown-it');
const fs = require('fs');

let md = markdownIt({
  html: true,
  langPrefix: 'code-'
});


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

          try {
              let html = md2Html(content.toString());
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

function md2Html(content='') {
  return md.render(content);
}

function stripExt(name='') {
  let i = name.length - path.extname(name).length;
  return name.slice(0, i);
}
