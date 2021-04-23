import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div style={{
        textAlign: 'center',
        color: 'red',
        border: '4px solid wheat',
        margin: '10% 6% 0 6%',
        paddingBottom: '10px',
        fontFamily: '-moz-initial'
    }}>
        <h1>404 <br /> Ooops, Page Not Found!</h1>
        <Link to="/">
            Go Home
        </Link>
    </div>
);

export default NotFound;