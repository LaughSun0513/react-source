/*
var ele = React.createElement(
    "div",
    {
        className: "active",
        title: "mytitle"
    },
    "hello,",
    React.createElement("span", null, "react-jsx"));
*/
import Component from "./component"
const React = {
    createElement,
    Component
}
function createElement(tag, attrs, ...children) { 
    return {
        tag, attrs, children
    }
}
export default React;