// JavaScript Document
import React, { Component } from 'react';
import "./navbar.css";
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
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
					<NavLink to="/SignIn" className="item">Sign In</NavLink>
					<NavLink to="/about" className="item">About</NavLink>
					<div className="dropdown">
						<button className="item">User Name</button>
						<div className="dropdown-content">
							<NavLink exact to="/" className="admin-item">Account Approval</NavLink>
							<NavLink to="/AddPlace" className="admin-item">Add fixed places</NavLink>
							<NavLink to="/AddNewAdmin" className="admin-item">Add new admin</NavLink>
							<NavLink to="/" className="admin-item">Log Out</NavLink>
						</div>
					</div>
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
export default Navbar;