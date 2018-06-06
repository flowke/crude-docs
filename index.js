
const Koa = require('koa');
const Router = require('koa-router');
const React = require('react');


const RDS = require('react-dom/server');


const app = new Koa();
const router = new Router();

router.get('/', ctx=>{

  ctx.body =RDS.renderToString(
    <div>
      <p>dslfj</p>
      <em>fff</em>
    </div>
  );
});

app.use(router.routes());



app.listen(3000);
