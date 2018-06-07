const Koa = require('koa');
const koaRouter = require('koa-router');
const serveStatic = require('serve-static');
const path = require('path');
module.exports = function(dir='.'){

  const app = new Koa();
  const router = new koaRouter();


  router.use('/assets', serveStatic(path.resolve(dir,'assets')));

  router
  .get('/posts/*', ctx=>{
    ctx.body = ctx.params[0];
  })
  .get('/', ctx=>{
    ctx.body = '文章列表'
  })

  app.use(router.routes());

  app.listen(3000);

};
