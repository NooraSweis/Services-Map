import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navbar">
            <img className="logo" src="https://i.ibb.co/4F9X66H/logo-1.jpg" alt = "LOGO"/>

            <ul className="nav-list">
                <NavLink to="/about">About</NavLink>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/Profile">Profile</NavLink>
                <NavLink to="/Favorates">Favorates</NavLink>
                <NavLink to="/Search">Search</NavLink>
                <NavLink to="/SignIn">SignIn</NavLink>
            </ul>
        </div>
    );
}

export default Nav;