import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navbar">
            <a href="#" className="logo"> LOGO </a>
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