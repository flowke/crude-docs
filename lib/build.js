const path = require('path');
const fse = require('fs-extra');
const utils = require('./utils');
const {navLink, sideBar} = require('../SiteCfg');
const ReactDOMServer = require('react-dom/server');

import Home from '../website/home';
import Docs from '../website/docs';

module.exports = function(param) {
  console.log(param.chunks());
  navLink.forEach(lk=>{

    if(!lk.page) return;

    if(lk.page = 'docs') {
      utils.traverseDoc(path.resolve(__dirname, '../docs', lk.type), f=>{
        let md = fse.readFileSync(f);
        let name = utils.stripExt( f );
        let parsedData = utils.parseMeta(md);

        // markdown 主题转成 html的内容
        let mdHtml = utils.md2Html(parsedData.source);

        // 渲染组件, 相当于页面
        let compHtml = ReactDOMServer.renderToString(
          <Docs
            {...{
              article: parsedData.mdHtml,
              curtLink: lk.type,
              docs: sideBar[lk.type].map(elt=>{
                let links = elt.list.map(item=>{
                  return {
                    url: `/${lk.type}/${elt.level}/${item[0]}.html`,
                    active: item[0] === name
                  }
                } );

                elt.links = links;

                return elt;
              })
            }}
          ></Docs>
        );

        let tempData = {
          content: compHtml,
          title: parsedData.title
        }

        // 渲染模板的内容
        let outputFileContent = utils.renderFile(path.resolve(__dirname, '../website/template/index.html'), tempData);

        outPutFile( path.resolve(__dirname, '../dist', lk.type, name+'.html') ,outputFileContent);
      })
    }
  })
};


function outPutFile(fileName, content) {
  console.log('生成页面: %s', filename);
  fse.outputFileSync(fileName, content);
}
