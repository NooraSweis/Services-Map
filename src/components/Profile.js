import React, { Component } from 'react';
import MainComp from './Profiles/MainComp';
import './style/Profile&favorite(out).css';
import './style/MainCompProfile.css';
import SP from './Profiles/SPprofile';
import {connect} from 'react-redux';

class Profile extends Component {
  
  signIn = () => {
    this.props.history.push('/SignIn/');
  }

  render() {
    var position = this.props.position;
    if(position==null)
    position='client-out';
    switch (position) {
      case 'client-out':
        return (
          <div className='out'>
            <p className='title'><b>Please log in</b></p>
            <p className='content'>Please log in to the system to allow you show profile and edit it.</p>
            <button className="signBtn" onClick={this.signIn}><b>Sign in</b></button>
          </div>
        );
      case 'ADMIN':
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

        default :
        return(<div></div>)

    }

  }
}
function mapStateToProps(state){
  return{
	     position:state.position
  }
}
export default connect(mapStateToProps)(Profile);