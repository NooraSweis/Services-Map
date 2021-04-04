import React, { Component } from 'react';
import CustomDialogContent from './forget';
import { CustomDialog } from 'react-st-modal';
import fire from '../config';
import { connect } from 'react-redux';

class Login_Fields extends Component {
    
    login=()=> {
        
        const email = document.querySelector('#logEmail').value;
        const password = document.querySelector('#logPassword').value;
        fire.auth().signInWithEmailAndPassword(email,password).then((u)=>{
            fire.firestore().collection('User').where('email','==',email).get().then((snapshot)=>{
                snapshot.forEach((doc)=>{
                        this.props.login({type:'LOGIN'})
                        this.props.position({type:doc.data().type})
                        console.log("successfully login")
                        
            })
        })
 
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })
            
        })
          .catch((err)=>{
            console.log('Error: ' + err.toString());
          }) 
    }
render(){
    
    return (
        <div className="form-container sign-in-container">
            <form className='form' action="#">
                <h2 className='h2' >Sign in</h2>
                <input className='input' type="email" placeholder="Email" name='email' id='logEmail' />
                <input className='input' type="password" placeholder="Password"  id='logPassword'/>


                    <div className='forgot-remember-div' > <a className='a' style={{ cursor: 'pointer' }} onClick={async () => {
                        const result = await CustomDialog(<CustomDialogContent />, {
                            title: 'Reset password',
                            showCloseIcon: true,
                        });
                    }}>Forgot your password?</a>

                        <input className='input' type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>

                    </div>


                <button className="bt button" onClick={this.login}>Login</button>
            </form>
        </div>
    );
}}
function mapDispatchToProps(dispatch){
    return {
        login:(item)=>dispatch(item),
        position:(items)=>dispatch(items)
    }
  }

export default connect(null,mapDispatchToProps)(Login_Fields);
