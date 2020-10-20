import React from './react';
import ReactDOM from './react-dom';
// import React from 'react';
// import ReactDOM from 'react-dom';

const ele = (
    <div
        className="active"
        style={{width:1000,height:200}}
        title='myTitle'
        onClick={() => { }}>
        hello <span>react-jsx</span>
    </div>
)
function Home(props) { 
    return (<div className='home-component' {...props}>Functional Component</div>);
}
class Foo extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            num:1
        }
    }
    componentWillMount() { 
        console.log('componentWillMount组件将要挂载');
    }
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps组件将要更新Props');
    }
    componentWillUpdate() { 
        console.log('componentWillUpdate组件将要更新');
    }
    componentDidUpdate() { 
        console.log('componentDidUpdate组件更新完了');
    }
    componentDidMount() { 
        console.log('componentDidMount组件挂载完成');
    }
    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        const {num} = this.state;
        return (
            <div className='foo-component'>
                <div>Class Component</div>
                <div>Num: {num} <button onClick={this.handleClick.bind(this)}>点击+1</button></div>
            </div>
        )
    }
}
// ReactDOM.render(undefined,document.getElementById('root'));
// ReactDOM.render('react',document.getElementById('root'));
// ReactDOM.render(ele,document.getElementById('root'));
// ReactDOM.render(<Home name='home'/>,document.getElementById('root'));
ReactDOM.render(<Foo/>,document.getElementById('root'));
/*
var ele = React.createElement("div",
    {
        className: "active",
        title: "myTitle"
    },
    "hello,",
    React.createElement("span", null, "react-jsx"));
*/