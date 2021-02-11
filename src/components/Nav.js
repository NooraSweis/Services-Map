import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navbar">
            <img className="logo" src="https://i.ibb.co/4F9X66H/logo-1.jpg" alt = "LOGO"/>

            <ul>
                <Link to="/about">About</Link>
                <Link to="/">Home</Link>
                <Link to="/Profile">Profile</Link>
                <Link to="/Favorates">Favorates</Link>
                <Link to="/Search">Search</Link>
                <Link to="/SignIn">SignIn</Link>
            </ul>
        </div>
    );
}

export default Nav;