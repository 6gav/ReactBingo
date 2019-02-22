import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home.js';

class App extends Component {


  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
