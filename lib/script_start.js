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

          let data = parseMeta(content.toString(), file);

          if(!data) resolve('页面出错!!');

          try {
              let html = md2Html(data.source);
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


function parseMeta(content, filename) {
  let reg = /---\n([^]*)---\n([^]*)/g;

  let rut = reg.exec(content);

  if(rut===null) {
    console.log(`
      文件格式错误!!
      文件位置: ${filename}
      确保文件头部为以下格式:

      ---
      title: <文件头部>
      data: <时间>
      ---

    `);
    return null;
  }

  try {

    let data = {};

    data = rut[1].split('\n').reduce((accu, elt)=>{

      if(!elt.trim()) return accu;
      let [key, value] = elt.split(':');

      try {
        accu[key.trim()] = value.trim();
      } catch (e) {

        return accu;
      }

      return accu;

    },{});

    data.source = rut[2];

    return data;

  }catch(e){
    return null;
  }


}
