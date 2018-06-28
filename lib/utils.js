const fs = require('fs');
const swig = require('swig');
const path = require('path');
const markdownIt = require('markdown-it');
const rd = require('rd');

let md = markdownIt({
  html: true,
  langPrefix: 'code-'
});


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
    let i = name.length - path.extname(name).length;
    return name.slice(0, i);
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


  },

  traverseDoc(dir,cb){
    rd.eachFileFilterSync(dir, /\.md$/, cb);
  }

};
