import React, {Component, Suspense} from 'react'
import ReactDOM from 'react-dom';
import { api31Call } from './helpers';
import { BrowserRouter, Route } from "react-router-dom";

const Home = React.lazy(() => import('./components/pages/home.js'))
const Admin = React.lazy(() => import('./components/pages/admin.js'))

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
      <div>
        <h1>My Application</h1>
        <div>{this.state.user}</div>
        <BrowserRouter basename={'/applications/'+window.lookerMetadata.app.id}>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
          </Suspense>
        </BrowserRouter>
      </div>
      )
    }
  }
  window.addEventListener('load', () => {
    ReactDOM.render( <App />, document.getElementById('app-container'));
  }, false); 
  