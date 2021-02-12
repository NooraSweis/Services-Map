import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';

import Nav from './components/Nav';
import Profile from './components/Profile';
import Favorates from './components/Favorates';
import SignIn from './components/SignIn';
import Map from './components/Map';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Nav/>
        <Route exact path="/" component= {Home} />
        <Route exact path="/Profile" component= {Profile} />
        <Route exact path="/Favorates" component= {Favorates} />
        <Route exact path="/Map" component= {Map} />
        <Route exact path="/SignIn" component= {SignIn} />
        <Route path="/About" component= {About} />
      </div>
      </BrowserRouter>
    );
    }
}
export default App;
