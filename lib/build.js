const path = require('path');
const fse = require('fs-extra');
const utils = require('./utils');
const ReactDOMServer = require('react-dom/server');
const chalk = __non_webpack_require__('chalk');

import React from 'react';

import Home from '../website/home';
import Docs from '../website/docs';

let manifest = require('../.temp-script/assets-manifest-dist.json');

let {
  formatPrefix,
  getNavLinks,
  getDocsOutline
} = utils;

bdd();
function bdd(){

  const siteCfg =  __non_webpack_require__(path.resolve('./SiteCfg.js'));

  let {sideBar, navLink} = siteCfg;

  const prefix = formatPrefix(siteCfg.pathPrefix);

  // lk 每个header link 配置对象
  siteCfg.navLink.forEach(lk=>{

    if(!lk.page) return;

    if(lk.page === 'index'){

      let filename = path.resolve('./page/index.md');

      let {name, parsedData, mdHtml} = getRenderData(filename);

      let compHtml = ReactDOMServer.renderToString(
        <Home
          {...{
            content: mdHtml,
            navLink: getNavLinks(navLink, sideBar, lk.page, prefix),
          }}
        />
      );

      let tempData = {
        content: compHtml,
        title: parsedData.title,
        // vendorJS: '../assets/' +  manifest['vendor.js'],
        // pageJS: '../assets/' + manifest['docs.js'],
        vendorCSS:  manifest['vendor.css'],
        pageCSS: manifest['home.css'],
      };

      // 渲染模板的内容
      let outputFileContent = utils.renderFile(path.resolve(__dirname, '../website/template/prod.html'), tempData);

      let outputPath = path.resolve( './dist', name +'.html');
      if(process.env.pg_command === 'preview'){
        outputPath = path.join(process.cwd(), 'dist', prefix,  name +'.html')
      }
      outPutFile( outputPath, outputFileContent);

    }

    if(lk.page === 'docs'){

      utils.traverseDoc(path.resolve( './docs', lk.type), f=>{

        let {name, parsedData, mdHtml} = getRenderData(f);

        // 渲染组件, 相当于页面
        let compHtml = ReactDOMServer.renderToString(
          <Docs
            {...{
              article: mdHtml,
              navLink: getNavLinks(navLink, sideBar, lk.page, prefix),
              docs: getDocsOutline(sideBar[lk.type], lk.type, name, prefix)
            }}
          ></Docs>
        );

        let tempData = {
          content: compHtml,
          title: parsedData.title,
          // vendorJS: '../assets/' +  manifest['vendor.js'],
          // pageJS: '../assets/' + manifest['docs.js'],
          vendorCSS: manifest['vendor.css'],
          pageCSS: manifest['docs.css'],
        };

        // 渲染模板的内容
        let outputFileContent = utils.renderFile(path.resolve(__dirname, '../website/template/prod.html'), tempData);

        let outputPath = path.resolve( './dist', lk.type, name +'.html');
        if(process.env.pg_command === 'preview'){
          outputPath = path.join(process.cwd(), './dist', prefix, lk.type, name +'.html');
        }

        outPutFile( outputPath, outputFileContent);
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
  console.log(chalk.green(`生成页面: ${fileName}` ));
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
