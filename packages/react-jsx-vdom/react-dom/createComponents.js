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