import React, {Component} from 'react'
import ReactDOM from 'react-dom';


class App extends Component {
    render() {
        return (
          <p>Application!</p>
        )
    }
}

window.addEventListener('load', () => {
    ReactDOM.render( <App />, document.getElementById('app-container'));
  }, false); 
  