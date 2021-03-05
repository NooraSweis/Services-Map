import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Favorite from './components/Favorite';
import Map from './components/Map';
import SignIn from './components/SignIn';
import About from './components/About';
import AdminMenu from "./components/AddPlace";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Route exact path='/' component={Home} />
			<Route exact path='/Profile' component={Profile} />
			<Route exact path='/Favorite' component={Favorite} />
			<Route exact path='/Map' component={Map} />
			<Route exact path='/SignIn' component={SignIn} />
			<Route exact path='/About' component={About} />
			
		</BrowserRouter>
	);
}

export default App;
