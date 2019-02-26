import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home.js';
import Game from './components/Game.js';

class App extends Component {


  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/game/:id' component={Game}/>
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
