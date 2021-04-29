import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
import NotFound from './components/NotFound';

class App extends Component {
constructor(props){
	super(props);
	this.state = {
		user: firebase.auth().currentUser
	}
	if(localStorage.getItem('isLoggedIn')===null){
		localStorage.setItem('user name','')
		localStorage.setItem('isLoggedIn',false)
		localStorage.setItem('position','client-out')
	  }
}
	render() {
		return (
			<BrowserRouter>
				<Navbar />
				<Switch>
					{console.log(this.props.isLoggedIn)}
					<Route exact path='/' component={Home} />
					<Route exact path='/Profile' component={Profile} />
					<Route exact path='/Map' component={Map} />
					<Route exact path='/SignIn' component={SignIn} />
					<Route exact path='/Show-SP-Fields' component={Show_SP_Fields} />
					<Route exact path='/Show-Client-Fields' component={Show_client_Fields} />
					<Route exact path='/SignIn' render={() => (
						!this.props.isLoggedIn ? <SignIn /> : <Redirect to='/Profile' />
					)} />
					<Route exact path='/About' component={About} />
					{this.props.isLoggedIn ?
						<Route exact path='/Favorite' component={Favorite} /> : null
					}
					{this.props.position === "ADMIN" ? <Route exact path='/AccountApproval' component={AccountApproval} /> : null}
					{this.props.position === "ADMIN" ? <Route exact path='/AddPlace' component={AddPlace} /> : null}
					{this.props.position === "ADMIN" ? <Route path='/AddNewAdmin' component={AddNewAdmin} /> : null}
					<Route exact path='/password-reset' component={PasswordReset} />
					<Route component={NotFound} />
				</Switch>
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

