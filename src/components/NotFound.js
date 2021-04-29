import React from 'react';
import './style/NotFound.css';

const NotFound = () => (
    <div style={{ textAlign: 'center' }}>
        <img className="error-404"
            src="https://i.ibb.co/8mWZ0LB/error404.gif"
            alt="404"
        />
        <a href="/">Go Home?</a>
    </div>
);

export default NotFound;