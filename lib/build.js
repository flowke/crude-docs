const path = require('path');
const fse = require('fs-extra');
const utils = require('./utils');
const {navLink, sideBar} = require('../SiteCfg');
const ReactDOMServer = require('react-dom/server');

import React from 'react';

import Home from '../website/home';
import Docs from '../website/docs';

let manifest = require('../assets-manifest-dist.json');

bdd();

function bdd(){

  // lk 每个header link 配置对象
  navLink.forEach(lk=>{

    if(!lk.page) return;

    if(lk.page === 'index'){

      let filename = path.resolve('./page/index.md');

      let {name, parsedData, mdHtml} = getRenderData(filename);

      let compHtml = ReactDOMServer.renderToString(
        <Home
          {...{
            content: mdHtml,
            curtLink: '/'
          }}
        />
      );

      let tempData = {
        content: compHtml,
        title: parsedData.title,
        vendorJS: '../assets/' +  manifest['vendor.js'],
        pageJS: '../assets/' + manifest['docs.js'],
        vendorCSS: '../assets/' +  manifest['vendor.css'],
        pageCSS: '../assets/' +  manifest['home.css'],
      };

      // 渲染模板的内容
      let outputFileContent = utils.renderFile(path.resolve(__dirname, '../website/template/prod.html'), tempData);

      outPutFile( path.resolve( './dist', name +'.html'), outputFileContent);

    }

    if(lk.page === 'docs'){

      utils.traverseDoc(path.resolve('./docs', lk.type), f=>{

        let {name, parsedData, mdHtml} = getRenderData(f);

        // 渲染组件, 相当于页面
        let compHtml = ReactDOMServer.renderToString(
          <Docs
            {...{
              article: mdHtml,
              // curtlink 就是headerlink
              curtLink: lk.type,
              docs: sideBar[lk.type].map(elt=>{
                let links = elt.list.map(item=>{
                  return {
                    url: `/${lk.type}/${elt.level}-${item[0]}.html`,
                    active: `${elt.level}-${item[0]}` === name
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
          title: parsedData.title,
          vendorJS: '../assets/' +  manifest['vendor.js'],
          pageJS: '../assets/' + manifest['docs.js'],
          vendorCSS: '../assets/' +  manifest['vendor.css'],
          pageCSS: '../assets/' +  manifest['docs.css'],
        };

        // 渲染模板的内容
        let outputFileContent = utils.renderFile(path.resolve(__dirname, '../website/template/prod.html'), tempData);

        outPutFile( path.resolve( './dist', lk.type, name +'.html'), outputFileContent);
      })
    }
  })
};

/**
 * 产出静态HTML文件
 * @method outPutFile
 * @param  {[type]}   fileName 文件路径名
 * @param  {[type]}   content  文件内容
 */
function outPutFile(fileName, content) {
  console.log('生成页面: %s', fileName);
  fse.outputFileSync(fileName, content);
}


function getRenderData(f){
  let name = utils.stripExt( f );

  let parsedData = utils.parseMeta(f);
  // markdown 主题转成 html的内容
  let mdHtml = utils.md2Html(parsedData.source);

  return {
    name,
    parsedData,
    mdHtml
  }
}
