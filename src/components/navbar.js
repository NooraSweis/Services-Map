// JavaScript Document
import React, { Component } from 'react';
import "./navbar.css";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from './config';

class Navbar extends Component {
	menu = React.createRef();
	state = {
		isLoggedIn: this.props.isLoggedIn,
		position: this.props.position
	}

	logout = (e) => {
		e.preventDefault();
		console.log('this.logout')
		auth.signOut();
		this.setState({
			isLoggedIn: false,
			position: 'client-out'
		}, function () {
			console.log(this.state);
		});
		window.location.reload(false)
	}

	render() {
		return (
			<div className="navbar">
				<input id="nav-toggle" type="checkbox" />
				<img className="logo" src="https://i.ibb.co/Dg4r5Gt/logo.png" alt="LOGO" />

				<ul className="nav-list">
					<NavLink exact to="/" className="item">Home</NavLink>
					<NavLink to="/Profile" className="item">Profile</NavLink>
					<NavLink to="/Map" className="item">Map</NavLink>
					{!this.props.isLoggedIn ? <NavLink to="/SignIn" className="item">Sign In</NavLink> : (null)}
					<NavLink to="/about" className="item">About</NavLink>

					{this.props.isLoggedIn ?
						(<div className="dropdown" id='List' ref={this.menu}>
							<button className="item">User Name</button>
							{this.props.position === 'ADMIN' ?
								(<div className="dropdown-content">
									<NavLink to="/Favorite" className="admin-item">Favorates</NavLink>
									<NavLink to="/AccountApproval" className="admin-item">Account Approval</NavLink>
									<NavLink to="/AddPlace" className="admin-item">Add fixed places</NavLink>
									<NavLink to="/AddNewAdmin" className="admin-item">Add new admin</NavLink>
									<NavLink onClick={this.logout} exact to="/" className="admin-item">Log Out</NavLink>
								</div>) : (<div className="dropdown-content">
									<NavLink to="/Favorite" className="admin-item">Favorates</NavLink>
									<NavLink onClick={this.logout} exact to="/" className="admin-item" >Log Out</NavLink>
								</div>)}

						</div>) : null}

				</ul>
				<label htmlFor="nav-toggle" className="icon-burger">
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
				</label>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		isLoggedIn: state.isLoggedIn,
		position: state.position
	}
}
function mapDispatchToProps(dispatch) {
	console.log('disp')
	return {
		logout: () => dispatch({ type: 'LOGOUT' })
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);