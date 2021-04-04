import React from 'react';
import { Component } from 'react';
import { geoPropTypes } from 'react-geolocated';
import { useHistory } from 'react-router';
import fire from '../config';
const Signup_client_Fields=()=> {
    function signUp(){
        const name = document.querySelector('#SignName').value;
        const email = document.querySelector('#SignEmail').value;
        const password = document.querySelector('#SignPassword').value;
        const confirmPass= document.querySelector('#SignConfirm').value;

        if(name.length<2){
            alert('name field is required and must be 3 or more characters long!')
        }
        if(!(password.match(/[0-9]/g)) || !(password.match(/[a-z]/g)) || !(password.match(/[A-Z]/g)) || password.length<8){
            alert('password must be at least 8 characters , at least one capital and one small letter')
        }
        else if(password===confirmPass ){
            fire.auth().createUserWithEmailAndPassword(email,password).then((u)=>{
        fire.firestore().collection('User').add({
            email: email,
            name:name,
            password:password,
            type:'client-in'})
       .then((u)=>{
           var user=fire.auth().currentUser;
           user.sendEmailVerification().then(()=>{
           alert('please check your email')
           })
           .catch((err)=>{
            alert(err.toString());
           })
        })
        .catch((err)=>{
            alert(err.toString());
        }); 
        } )
        .catch((err)=>{
            alert(err.toString())
        })}
        else {
            alert("password does not match");
        }
    }
    return (
        <div>
            <div className="form-container sign-up-container">
                <form className='form' action="#">
                    <h2 className='h2' >Signup as Client</h2>

                    <input className='input' type="text" placeholder="Name" id='SignName' required/>
                    <input className='input' type="email" placeholder="Email" id='SignEmail' required/>
                    <input className='input' type="password" placeholder="Password" id='SignPassword' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                    <input className='input' type="password" placeholder="Confirm Password" id='SignConfirm' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>

                    <button type='submit' className="bt button" onClick={signUp}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default Signup_client_Fields;