import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import "./style/Profile&favorite(out).css";

class Favorite extends Component {
    signIn = () => {
        this.props.history.push('/SignIn/');
    }
    render() {
        return (
            <div className='out'>
                <p className='title'><b>Please log in</b></p>
                <p className='content'>Please log in to the system to allow you to add or view your favorite places.</p>
                <button className="signBtn" onClick={this.signIn}><b>Sign in</b></button>
            </div>
        );
    }
}

export default Favorite;