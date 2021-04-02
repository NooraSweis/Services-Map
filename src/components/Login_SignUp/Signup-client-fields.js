import React from 'react'
import { Component } from 'react';
import fire from '../config';
class Signup_client_Fields extends Component {
    signUp=()=> {
        const name = document.querySelector('#SignName').value;
        const email = document.querySelector('#SignEmail').value;
        const password = document.querySelector('#SignPassword').value;
        const confirmPass= document.querySelector('#SignConfirm').value;
        if(password===confirmPass){
            fire.auth().createUserWithEmailAndPassword(email,password).then((u)=>{
        fire.firestore().collection('User').add({
            email: email,
            name:name,
            password:password,
            type:'client-in'})
       .then((u)=>{
           {console.log('done')}
            
        })
        .catch((err)=>{
            console.log(err.toString());
        }); })
        .catch((err)=>{
            console.log(err.toString())
        })}
    }
    render(){
    return (
        <div>
            <div className="form-container sign-up-container">
                <form className='form' action="#">
                    <h2 className='h2' >Signup as Client</h2>

                    <input className='input' type="text" placeholder="Name" id='SignName'/>
                    <input className='input' type="email" placeholder="Email" id='SignEmail'/>
                    <input className='input' type="password" placeholder="Password" id='SignPassword'/>
                    <input className='input' type="password" placeholder="Confirm Password" id='SignConfirm'/>

                    <button className="bt button" onClick={this.signUp}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}}
export default Signup_client_Fields;