// JavaScript Document
import React,{Component} from 'react';
import style from './navbar.css';
import {NavLink} from 'react-router-dom';

class Navbar extends React.Component{
	render(){
		return(
	  <div className="navbar">
			
			<input id="nav-toggle" type="checkbox"/>
            <img className="logo" src="https://i.ibb.co/Dg4r5Gt/logo.png" alt = "LOGO"/>

            <ul className="nav-list">
                <NavLink exact to="/" className="item">Home</NavLink>
                <NavLink to="/Profile" className="item">Profile</NavLink>
                <NavLink to="/Favorates" className="item">Favorates</NavLink>
                <NavLink to="/Map" className="item">Map</NavLink>
                <NavLink to="/SignIn" className="item">Sign In</NavLink>
                <NavLink to="/about" className="item">About</NavLink>
            </ul>
			<label for="nav-toggle" className="icon-burger">
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
			</label>
       </div>
			  );
	}
}
export default Navbar;