const path = require('path');
const fse = require('fs-extra');

module.exports = function(dir){

  if(dir===undefined){
    console.log(`
      你需要制定一个路径名, 以便生成文档模板.
      如果您想在当前目录生成文档, 使用: '.'
    `);
    return;
  }

  try{
    // 创建目录
    // fse.mkdirsSync(path.resolve(dir, 'docs/docs'));
    // fse.mkdirsSync(path.resolve(dir, 'page'));

    fse.copySync(path.resolve(__dirname, '../example'), dir);

    console.log('创建成功');
  }catch(e){
    console.log('创建失败!');
  }

};
