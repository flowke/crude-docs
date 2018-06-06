const Koa = require('koa');
const Router = require('koa-router');
const React = require('react');

const ReactDOMServer = require('react-dom/server');


const app = new Koa();
const router = new Router();

router.get('/', ctx=>{

});

app.use(router.routes());



app.listen(3000);
