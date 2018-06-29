const sideBar = require('./sideBar');

module.exports = {
  navLink: [
    {label: '首页', page: 'index'},
    {label: '文档', page: 'docs', type: 'docs'},
    {label: 'API', page: 'docs', type: 'api'},
    {label: 'GitHub', href: 'https://github.com/flowke/rude-docs'},
  ],

  sideBar
};
