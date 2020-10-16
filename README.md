# react-source
react源码学习

# 目录
- [1.JSX和虚拟DOM](#JSX和虚拟DOM)
- [2.手写React](#手写React)
    - [第一步：实现React.createElement](#实现React.createElement)

# JSX和虚拟DOM

## 环境搭建

### 使用babel支持jsx语法
```
yarn add @babel/core @babel/plugin-transform-react-jsx @babel/preset-env -D

@babel/plugin-transform-react-jsx -- 用来解析jsx语法
```
```js
// .babelrc
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-transform-react-jsx"]
}
```

### 使用parcel来打包和起服务
```js
yarn global add parcel-bundler
yarn add parcel-bundler -D

// 使用
parcel index.html

http://localhost:1234 
```

## 手写React
### 实现React.createElement
#### jsx --> React.createElement
```js
// index.js
import React from './react';

const ele = (
    <div className="active" title='mytitle'>
        hello,<span>react-jsx</span>
    </div>
)
console.log(ele);

// react/index.js
const React = {
    createElement
}
function createElement(tag, attrs, children) { 
    return {
        tag, attrs, children
    }
}
export default React;
```

