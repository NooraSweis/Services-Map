import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import style from './style/Profile&favorite(out).css';
class Profile extends Component {
    signIn=()=>{
        this.props.history.push('/SignIn/');

    }
    render(){
    return (
        <div className='out'>
            <p className='title'><b>Please log in</b></p>
            <p className='content'>Please log in to the system to allow you show profile and edit it.</p>
            <button className="ghost" onClick={this.signIn}><b>Sign in</b></button>
        </div>
    );
    }
}

export default Profile;