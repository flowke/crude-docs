---
title: crude intro
---

# crude 介绍

`import ReactDOM from 'react-dom'`;

## 接口总览

- render()
- hydrate()
- unmountComponentAtNode()
- findDOMNode()
- createPortal()

## 接口参考

#### render()

```js
ReactDOM.render(element, container[, callback])
```

把 react element 渲染到容器内. fff

> 如果已经被渲染过, 再次调用会触发更新, 会进行 DOM 的  diff.

#### hydrate()

```js
ReactDOM.hydrate(element, container[, callback])
```

和 `render()` 一样, 但它是把 `ReactDOMServer` 渲染的HTML内容 插入到容器内.

React将尝试将事件监听器附保留到现有的标记.
