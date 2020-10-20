# react-source
react源码学习

# 目录
- [1.JSX和虚拟DOM](#JSX和虚拟DOM)
- [2.手写React](#手写React)
    - [第一步：实现React.createElement](#实现React.createElement)
    - [第二步：实现ReactDOM.render](#实现ReactDOM.render)
        - [区分函数组件还是类组件](#区分类组件/函数组件)

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
function createElement(tag, attrs, ...children) { 
    return {
        tag, attrs, children
    }
}
export default React;
```
### 实现ReactDOM.render
- render函数的实现
    - vnode的类型 undefined string dom对象
    - dom对象
        - 创建元素
        - 创建属性
        - 创建子节点
- DOM节点属性的设置
```js
const ReactDOM = {
    render
}
function render(vnode, container) {
    // 1
    if (vnode === undefined) { 
        throw new Error('vnode传的数据类型不对');
    }
    // 2
    if (typeof vnode === 'string') { 
        const newText = document.createTextNode(vnode);
        return container.appendChild(newText);
    }
    // 3
    const { tag, attrs, children } = vnode;
    // 3-1 创建元素 div
    const newDOM = document.createElement(tag);

    // 3-2 创建属性
    if (attrs) { 
        // class='xxx'
        // style='xxx'
        // onclick='xxx'
        Object.keys(attrs).forEach(key => {
            const value = attrs[key];
            setAttributes(newDOM, key, value)
        });
    }
    // 3-3 递归创建子节点
    if (children) { 
        children.forEach(child => render(child, newDOM));
    }
    return container.appendChild(newDOM);
}
```
```js
/**
 * DOM节点属性的设置
 * className --> class
 * onXXXX --> onxxx
 * style='xxx' style={{width:20,height:'20'}}
 */
function setAttributes(dom, key, value) {
    if (key === 'className') { 
        key = 'class';
    }
    if (/on\w+/.test(key)) { 
        key = key.toLowerCase();
    }
    if (key === 'style') {
        if (typeof key === 'string' || !value) {
            dom.style.cssText = value || '';
        }
        if (value && typeof value === 'object') {
            // {{width:20,height:20}}
            for (let k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px'; // 20px
                }
                else {
                    dom.style[k] = value[k]; // '20'
                }
            }
        }
    } else { 
        if (key in dom) { 
            dom[key] = value || '';
        }
        if (value) {
            // 更新值
            dom.setAttribute(key, value);
        }
        else {
            // 移除没用的属性
            dom.removeAttribute(key);
        }
    }
}
```

#### 区分类组件/函数组件
- ReactDOM.render(类组件/函数组件,根节点)
    - 区分类组件/函数组件
        - 类组件 直接实例化
        - 函数组件 
            - 转换为类组件
            - 添加render方法
            - 调用render方法生成JSX对象 并挂载到当前的组件实例上 component.base

```js
// 类组件 -- 有prototype 和 render方法
if (component.prototype && component.prototype.render) {
    // 直接实例化
else {
    // 函数组件
    xxx
}
```
```js
// createComponents.js
class FuncComp2ClassComp { 
    constructor(props) { 
        this.state = {};
        this.props = props;
    }
}
/**
 * 类组件 直接创建组件
 * 函数组件 转换为类组件并挂上render方法
 */
export function createComponent(component, props) {
    let currentComponent;
    // 类组件 -- 有prototype 和 render方法
    if (component.prototype && component.prototype.render) {
        currentComponent = new component(props);
    }
    // 函数组件
    else {
        currentComponent = new FuncComp2ClassComp(props);
        currentComponent.constructor = component;
        // 定义render方法 this.constructor === component 返回函数组件jsx
        currentComponent.render = function () {
            // 相当于component(props)
            return this.constructor(props);
        }
    }
    return currentComponent;
}
// 函数组件创建jsx对象之后渲染
export function renderComponent(component, _render) { 
    let base;
    const componentJSXObject = component.render();
    base = _render(componentJSXObject);
    return base;
}
// 函数组件更新props
export function updateComponentProps(component, props, _render){ 
    component.props = props;
    renderComponent(component, _render);
}
```
```js
const { tag, attrs, children } = vnode;
if (typeof vnode.tag === 'function') {
    const currentComponent = createComponent(tag, attrs);
    updateComponentProps(currentComponent, attrs, _render);
    currentComponent.base = renderComponent(currentComponent, _render);
    return currentComponent.base;
}
```