const fs = require('fs');
const swig = require('swig');
const path = require('path');
const markdownIt = require('markdown-it');
const rd = require('rd');
const hljs = require('highlight.js');
const taskLists = require('markdown-it-task-lists');
const emoji = require('markdown-it-emoji');

let md = markdownIt({
  html: true,
  langPrefix: 'code-',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

md.use(taskLists, {
  // enabled: true
});
md.use(emoji);

swig.setDefaults({
  cache: false,
});

module.exports = {
  // 模板渲染
  renderFile(fileName, data){
    return swig.render(fs.readFileSync(fileName).toString(),{
      autoescape: false,
      locals: data
    })
  },

  // 把 md 语法转换成 html
  md2Html(content='') {
    return md.render(content);
  },

  // 获取文件名, 不包括后缀
  stripExt(name='') {
    return path.parse(name).name
  },

  // 解析 md 内容和元数据
  parseMeta(filename) {

    let content = '';

    try {
      content = fs.readFileSync(filename).toString();
    } catch (e) {
      console.log(`
        文件不存在!!
        文件位置: ${filename}
      `);
      return null;
    }

    let reg = /---\n((.+:.+\n)+)---\n([^]*)/g;

    let rut = reg.exec(content);

    if(rut===null) {
      console.log(`
        文件格式错误!!
        文件位置: ${filename}
        确保文件头部类似以下格式:

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

      data.source = rut[3];

      return data;

    }catch(e){
      return null;
    }


  },

  traverseDoc(dir,cb){
    rd.eachFileFilterSync(dir, /\.md$/, cb);
  },

  formatPrefix(prefix='/', isPublicPath=false){
    let outfix = '/';

    if(path.join(prefix) === '/') return outfix;

    outfix = path.join('/', prefix, '/');

    if(!isPublicPath){
      outfix = outfix.slice(0, outfix.length-1);
    }

    return outfix;
  },

  // curtLink 用于判断 是否 active
  getNavLinks(navLink, sideBar, curtLink, prefix){
    return navLink.map(link=>{

      let url = '';
      let active = false;

      if(link.page==='docs'){
        // 取出第 0 个文档的 link
        let {list, level} = sideBar[link.type][0];
        url = path.join(prefix, `/${link.type}/${level}-${list[0][0]}.html`);
        active = link.type === curtLink;
      }else if(link.href){
        url = link.href
      }else if(link.page==='index'){
        url = prefix ;

        active = link.page === curtLink;
      }else{
        url = `/${link.page}.html`;
        active = link.page === curtLink;
      }

      link.pageUrl = url;
      link.active = active;

      return link;

    });
  },

  // docName 用于判断 是否 active
  getDocsOutline(docTypes, docType, docName, prefix){
    return docTypes.map(elt=>{
      let links = elt.list.map(item=>{
        return {
          url: path.join(prefix, `/${docType}/${elt.level}-${item[0]}.html`),
          active: `${elt.level}-${item[0]}` === docName
        }
      });

      elt.links = links;

      return elt;
    })
  },

};
