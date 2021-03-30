// JavaScript Document
import React, { Component } from 'react';
import "./navbar.css";
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import fire from './config';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { positionAdmin:true };
	}

	render() {
		return (
			<div className="navbar">
				<input id="nav-toggle" type="checkbox" />
				<img className="logo" src="https://i.ibb.co/Dg4r5Gt/logo.png" alt="LOGO" />

				<ul className="nav-list">
					<NavLink exact to="/" className="item">Home</NavLink>
					<NavLink to="/Profile" className="item">Profile</NavLink>
					<NavLink to="/Favorite" className="item">Favorates</NavLink>
					<NavLink to="/Map" className="item">Map</NavLink>
						{!this.props.isLoggedIn?<NavLink to="/SignIn" className="item">Sign In</NavLink>:(null)}
					
					<NavLink to="/about" className="item">About</NavLink>
					{this.props.isLoggedIn?
					(<div className="dropdown" id='List'>
					<button className="item">User Name</button>

					{this.state.positionAdmin ?
					(<div className="dropdown-content">
					<NavLink exact to="/AccountApproval" className="admin-item">Account Approval</NavLink>
					<NavLink to="/AddPlace" className="admin-item">Add fixed places</NavLink>
					<NavLink to="/AddNewAdmin" className="admin-item">Add new admin</NavLink>
					<NavLink to="/" className="admin-item">Log Out</NavLink>
				</div>):(<div className="dropdown-content">
				<NavLink to="/" className="admin-item" >Log Out</NavLink>
						</div>)}
					
				</div>):null}
					
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
function mapStateToProps(state){
  return{
	  isLoggedIn:state.isLoggedIn
  }
}
export default connect(mapStateToProps)(Navbar);