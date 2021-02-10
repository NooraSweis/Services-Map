import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';

import Nav from './components/Nav';
import Profile from './components/Profile';
import Favorates from './components/Favorates';
import Search from './components/Search';
import SignIn from './components/SignIn';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Nav/>
        <Route path="/About" component= {About} />
        <Route exact path="/" component= {Home} />
        <Route exact path="/Profile" component= {Profile} />
        <Route exact path="/Favorates" component= {Favorates} />
        <Route exact path="/Search" component= {Search} />
        <Route exact path="/SignIn" component= {SignIn} />
      </div>
      </BrowserRouter>
    );
    }
}
export default App;
