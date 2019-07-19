import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { api31Call } from './helpers';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }
  
  componentWillMount() {
    api31Call('GET', '/user')
    .then(user =>{
      this.setState({user: JSON.stringify(user, null, 2)})
    })
  }
  
  render() {
    return (
      <>
        <p>Application!</p>
        <p>User API!</p>
        <p>{this.state.user}</p>
      </>
      )
    }
  }
  
  window.addEventListener('load', () => {
    ReactDOM.render( <App />, document.getElementById('app-container'));
  }, false); 
  