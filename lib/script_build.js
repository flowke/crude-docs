const path = require('path');
const fse = require('fs-extra');
const utils = require('./utils');
const {navLink, sideBar} = require('../SiteCfg');
const ReactDOMServer = require('react-dom/server');
console.log('in');
module.exports = function() {
  navLink.forEach(lk=>{
    if(!page) return;

    let PageComp = require(path.resolve(__dirname, '../website', lk.page));



    if(lk.page = 'docs') {
      utils.traverseDoc(path.resolve(__dirname, '../docs', lk.type), f=>{
        let md = fse.readFileSync(f);
        let name = utils.stripExt(f);
        let parsedData = utils.parseMeta(md);

        // markdown 主题转成 html的内容
        let mdHtml = utils.md2Html(parsedData.source);

        // 渲染组件, 相当于页面
        let compHtml = ReactDOMServer.renderToString(
          <PageComp
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
          ></PageComp>
        );


        let tempData = {
          initData: '',
          content: compHtml,
          title: parsedData.title

        }

        // 渲染模板的内容
        let outputFileContent = utils.renderFile(path.resolve(__dirname, '../website/template/index.html'), tempData);

        outPutFile( path.resolve(__dirname, '../dist', lk.type, name+'.html') ,outputFileContent);
      })
    }







    //
    // // 用于模板的渲染数据
    // let renderData = {
    //   content: mainTemp,
    //   initData: ''
    // }
    //
    // // 渲染模板的内容
    // let content = utils.renderFile(path.resolve(__dirname, '../website/template/index.html'), renderData);
    //
    // outPutFile(path.resolve(__dirname, '../dist', lk.page));


  })
};


function outPutFile(fileName, content) {
  console.log('生成页面: %s', filename);
  fse.outputFileSync(fileName, content);
}
