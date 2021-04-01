import React, { Component } from 'react';
import MainComp from './Profiles/MainComp';
import './style/Profile&favorite(out).css';
import './style/MainCompProfile.css';
import SP from './Profiles/SPprofile';
import Nav from './navbar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { position: 'SP' };
  }
  signIn = () => {
    this.props.history.push('/SignIn/');
  }

  render() {
    const position = this.state.position;
    <Nav position={this.state}></Nav>
    switch (position) {
      case 'client-out':
        return (
          <div className='out'>
            <p className='title'><b>Please log in</b></p>
            <p className='content'>Please log in to the system to allow you show profile and edit it.</p>
            <button className="signBtn" onClick={this.signIn}><b>Sign in</b></button>
          </div>
        );
      case 'Admin':
      case 'client-in':
        return (
          <div >
            <MainComp />
          </div>
        );
      case 'SP':
        return (
          <div >
            <SP />
          </div>
        );
      default:
    }

  }
}

export default Profile;