import React from './react';
import ReactDOM from './react-dom';
// import React from 'react';
// import ReactDOM from 'react-dom';

const ele = (
    <div
        className="active"
        style={{width:1000,height:200}}
        title='mytitle'
        onClick={() => { }}>
        hello <span>react-jsx</span>
    </div>
)
function Home(props) { 
    return (<div className='home-component' {...props}>Home</div>);
}

// ReactDOM.render(undefined,document.getElementById('root'));
// ReactDOM.render('react',document.getElementById('root'));
// ReactDOM.render(ele,document.getElementById('root'));
ReactDOM.render(<Home name='home'/>,document.getElementById('root'));
/*
var ele = React.createElement("div",
    {
        className: "active",
        title: "mytitle"
    },
    "hello,",
    React.createElement("span", null, "react-jsx"));
*/