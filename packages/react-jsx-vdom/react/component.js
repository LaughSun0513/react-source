
import { renderComponent } from '../react-dom/createComponents';
import { _render } from '../react-dom/render';
class Component { 
    constructor(props) { 
        this.state = {};
        this.props = props;
    }
    setState(newState) { 
        Object.assign(this.state, newState);
        renderComponent(this, _render);
    }
}
export default Component;