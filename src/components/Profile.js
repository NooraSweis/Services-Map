import React, { Component } from 'react';
import MainComp from './Profiles/MainComp';
import './style/Profile&favorite(out).css';
import './style/MainCompProfile.css';
import SP from './Profiles/SPprofile';
import Nav from './navbar';
import {connect} from 'react-redux';

class Profile extends Component {
  
  signIn = () => {
    this.props.history.push('/SignIn/');
  }

  render() {
    const position = this.props.position;
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
<<<<<<< HEAD
        default :
        return(<div></div>)
=======
      default:
>>>>>>> 76b699d720cae6147b9b9b73cee94e6275cebd7b
    }

  }
}
function mapStateToProps(state){
  return{
	     position:state.position
  }
}
export default connect(mapStateToProps)(Profile);