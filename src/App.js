import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Favorite from './components/Favorite';
import Map from './components/map/Map';
import SignIn from './components/SignIn';
import About from './components/About';
import AccountApproval from './components/admin_menu/AccountApproval';
import AddPlace from './components/admin_menu/AddPlace';
import AddNewAdmin from './components/admin_menu/AddNewAdmin';
import Show_SP_Fields from './components/Login_SignUp/Show-SP-fields';
import Show_client_Fields from './components/Login_SignUp/Show-client-fields';

class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<Navbar />
				<Route exact path='/' component={Home} />
				<Route exact path='/Profile' component={Profile} />
				<Route exact path='/Favorite' component={Favorite} />
				<Route exact path='/Map' component={Map} />
				<Route exact path='/SignIn' component={SignIn} />
				<Route exact path='/About' component={About} />
				<Route exact path='/AccountApproval' component={AccountApproval} />
				<Route exact path='/AddPlace' component={AddPlace} />
				<Route exact path='/AddNewAdmin' component={AddNewAdmin} />
				<Route exact path='/Show-SP-Fields' component={Show_SP_Fields} />
				<Route exact path='/Show-Client-Fields' component={Show_client_Fields} />
			</BrowserRouter>
		);
	}
}
export default App;
