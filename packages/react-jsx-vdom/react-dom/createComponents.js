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
    if (component.base) { // 说明已经挂载了组件，可以开始更新了
        // 即将更新
        if (component.componentWillUpdate) { 
            component.componentWillUpdate();
        }
        if (component.componentDidUpdate) { 
            component.componentDidUpdate();
        }
        // 更新视图JSX
        if (component.base.parentNode) {
            component.base.parentNode.replaceChild(base, component.base);
        }
    }
    else if (component.componentDidMount) { 
        component.componentDidMount();
    }
    component.base = base;
}
// 更新props
export function updateComponentProps(component, props, _render) {
    if (!component.base) { // 说明没挂载任何东西
        if (component.componentWillMount) {
            component.componentWillMount();
        }
        else if (component.componentWillReceiveProps) { 
            component.componentWillReceiveProps();
        }
    }
    component.props = props;
    renderComponent(component, _render);
}