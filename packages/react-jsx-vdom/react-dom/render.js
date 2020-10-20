import {
    createComponent,
    renderComponent,
    updateComponentProps
} from './createComponents';

export function render(vnode, container) {
    return container.appendChild(_render(vnode));
}
// 返回JSX节点对象
export function _render(vnode) {
    // 1
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean' || vnode === '') { 
        throw new Error('vnode传的数据类型不对');
    }

    // 2
    if (typeof vnode === 'number') { 
        vnode = String(vnode);
    }
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode); // 创建文本节点
    }
    // 3 说明是组件 要把这个组件创建出来并显示
    const { tag, attrs, children } = vnode;
    if (typeof vnode.tag === 'function') {
        const currentComponent = createComponent(tag, attrs);
        updateComponentProps(currentComponent, attrs, _render);
        renderComponent(currentComponent, _render);
        return currentComponent.base;
    }
    // 4
    // 4-1 创建元素 div
    const newDOM = document.createElement(tag);

    // 4-2 创建属性
    if (attrs) { 
        // class='xxx'
        // style='xxx'
        // onclick='xxx'
        Object.keys(attrs).forEach(key => {
            const value = attrs[key];
            setAttributes(newDOM, key, value)
        });
    }
    // 4-3 递归创建子节点
    if (children) {
        children.forEach(child => render(child, newDOM));
    }
    return newDOM;
}
/**
 *
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
        dom[key] = value || '';
    }
    else if (key === 'style') {
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
    }
    else { 
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