import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navbar">
            <img className="logo" src="https://i.ibb.co/Dg4r5Gt/logo.png" alt = "LOGO"/>

            <ul className="nav-list">
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/Profile">Profile</NavLink>
                <NavLink to="/Favorates">Favorates</NavLink>
                <NavLink to="/Map">Map</NavLink>
                <NavLink to="/SignIn">Sign In</NavLink>
                <NavLink to="/about">About</NavLink>
            </ul>
        </div>
    );
}

export default Nav;