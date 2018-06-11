const path = require('path');
const fse = require('fs-extra');
const utils = require('./utils');
const {navLink} = require('../SiteCfg');
const ReactDOMServer = require('react-dom/server');

module.exports = function() {
  navLink.forEach(lk=>{
    if(lk.page){
      let PageComp = require(path.resolve(__dirname, '../website', lk.page));

      let mainTemp = ReactDOMServer.renderToString(
        <PageComp></PageComp>
      );

      let renderData = {
        content: mainTemp
      }

      let content = utils.renderFile(path.resolve(__dirname, '../website/template/index.html'), renderData);

      


    }
  })
};
