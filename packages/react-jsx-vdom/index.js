import React from './react';

const ele = (
    <div className="active" title='mytitle'>
        hello,<span>react-jsx</span>
    </div>
)
console.log(ele);
/*
var ele = React.createElement("div",
    {
        className: "active",
        title: "mytitle"
    },
    "hello,",
    React.createElement("span", null, "react-jsx"));
*/