# crude-docs

一个简单的文档生成器. 通过一些简单的配置和命令, 便可以进行文档写作和生成你的今天文档网站.


## 概念


- `crude-docs` 项目: 一个安装了 `crude-docs` 模块的项目. 大多时候这个项目有一些预先配置好的文件和目录.

## 安装

`crude-docs` 是一个合法的 [npm](https://www.npmjs.com) 包. 在工作之初, 大多时候你不需要手动安装 `crude-docs`;

我发布了另外一个工具: `crude-docs-init` :sunny::sunny:. 你可以用它来生成你的 `crude-docs` 项目:

**使用** `yarn`:

```bash
# 在全局安装 crude-docs-init
yarn global add crude-docs-init
# 使用 crude-docs-init 生成项目
# my-doc 是你项目的名字, 你可以自己命名
crude-docs-init my-doc
```

**或使用** `npm`:

```bash
# 在全局安装 crude-docs-init
npm i -g crude-docs-init
# 使用 crude-docs-init 生成项目
# my-doc 是你项目的名字, 你可以自己命名
crude-docs-init my-doc
```
一旦你使用了 `crude-docs-init` 初始化了一个项目, 便会帮你自动安装 `crude-docs`, 并且我已经为你进行了一些模板配置, 你可以直接在上面进行修改和继续工作.

## 使用

> 如果你还没有安装`crude-docs-init` , 你应该先安装 `crude-docs-init`, 并生成一个 `crude-docs` 项目.

#### 目录结构

...待更新:frowning::frowning:

#### 命令

如果你在全局安装了 `crude-docs`, 那么你可以直接在 `CMD` 使用 `crude` 命令.

如果只在项目里安装了 `crude-docs`, 那么你应该在 `npm scripts` 里使用 `crude` 命令.

`crude -h`: 查看可用的命令

`crude start`: 开始在你的 markdown 上编写内容, 并在浏览器查看结果.

`crude build`: 生成你的静态网站, 文件会输出在 项目的 `dist/` 文件夹下.

`crude preview`: 生成你的今天网站, 并打开浏览器预览. 如果觉得没问题, 可直接使用 `dist/` 下的文件部署.

#### 可配置文件

...待更新:frowning::frowning:

#### markdown 格式

  在编写 markdown 的时候, 需要使用预定义的格式, 以便解析元数据.

...待更新:frowning::frowning:

## Q1 Todo

- [x] 基于 react 的页面模板调试
- [x] 可配置模板页
- [x] 可配置文档目录
- [x] 写作模式
- [x] 生成网站
- [x] 预览模式
- [x] 定制路径前缀
- [x] markdown主题样式
- [x] 代码语法高亮
- [ ] favicon
- [ ] 避开调试服务器端口冲突
- [x] md跳转

## Q2 Todo

- [ ] 可收缩文档目录
- [ ] 可选 markdown 主题
- [ ] 可选代码语法高亮
- [ ] 响应式页面
- [ ] 移除 antd
- [ ] 可使用 vue 或 html 作为页面模板

## Q3 Todo

- [ ] 多语言支持
