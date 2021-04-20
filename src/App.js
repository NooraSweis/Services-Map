import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
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
import PasswordReset from './components/Login_SignUp/forget';

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import firebase from './components/config';
import { connect } from 'react-redux';

class App extends Component {

	state = {
		user: firebase.auth().currentUser
	}

	render() {
		return (
			<BrowserRouter>
				<Navbar />
				<Route exact path='/' component={Home} />
				<Route path='/Profile' component={Profile} />
				<Route path='/Map' component={Map} />
				<Route path='/SignIn' component={SignIn} />
				<Route path='/Show-SP-Fields' component={Show_SP_Fields} />
				<Route path='/Show-Client-Fields' component={Show_client_Fields} />
				<Route path='/SignIn' render={() => (
					!this.props.isLoggedIn ? <SignIn /> : <Redirect to='/Profile' />
				)} />
				<Route path='/About' component={About} />
				{ this.props.isLoggedIn ?
					<Route path='/Favorite' component={Favorite} /> : null
				}
				{ this.props.position === "ADMIN" ? <Route path='/AccountApproval' component={AccountApproval} /> : null}
				{ this.props.position === "ADMIN" ? <Route path='/AddPlace' component={AddPlace} /> : null}
				{ this.props.position === "ADMIN" ? <Route path='/AddNewAdmin' component={AddNewAdmin} /> : null}
				<Route path='/password-reset' component={PasswordReset} />
			</BrowserRouter>
		);
	}
}
function mapStateToProps(state) {
	return {
		isLoggedIn: state.isLoggedIn,
		position: state.position
	}
}
export default connect(mapStateToProps)(App);

