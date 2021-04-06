import React from 'react';
import { Component } from 'react';
import fire from '../config';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

class Signup_client_Fields extends Component {
    signUp() {
        const name = document.querySelector('#SignName').value;
        const email = document.querySelector('#SignEmail').value;
        const password = document.querySelector('#SignPassword').value;
        const confirmPass = document.querySelector('#SignConfirm').value;

        if (name !== "" && name.length < 2) {
            alert('name field is required and must be 3 or more characters long!')
        }
        if (password !== "" && !(password.match(/[0-9]/g)) || !(password.match(/[a-z]/g)) || !(password.match(/[A-Z]/g)) || password.length < 8) {
            alert('password must be at least 8 characters, at least one capital and one small letter')
        }
        else if (password === confirmPass) {
            fire.auth().createUserWithEmailAndPassword(email, password).then((u) => {
                fire.firestore().collection('User').add({
                    email: email,
                    name: name,
                    password: password,
                    type: 'client-in'
                })
                    .then((u) => {
                        var user = fire.auth().currentUser;
                        user.sendEmailVerification().then(() => {
                            alert('please check your email');
                            //////////////////////////////////////////////
                            /* fire.auth().onAuthStateChanged(user => {
                                 if (user) { this.setState({ isLoggedIn: true }) }
                                 else { this.setState({ isLoggedIn: false }) }
                             });
 
 */
                        })
                            .catch((err) => {
                                alert(err.toString());
                            })
                    })
                    .catch((err) => {
                        alert(err.toString());
                    });
            })
                .catch((err) => {
                    alert(err.toString())
                })
        }
        else {
            alert("password does not match");
        }

        <Link to="/"></Link>

    }

    render() {
        return (
            <div>
                <div className="form-container sign-up-container">
                    <form className='form' action="#">
                        <h2 className='h2' >Signup as Client</h2>

                        <input className='input' type="text" placeholder="Name" id='SignName' required />
                        <input className='input' type="email" placeholder="Email" id='SignEmail' required />
                        <input className='input' type="password" placeholder="Password" id='SignPassword' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required />
                        <input className='input' type="password" placeholder="Confirm Password" id='SignConfirm' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required />

                        <button type='submit' className="bt button" onClick={this.signUp}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}
=======
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
>>>>>>> 2af52bc26845daa577587447ed323c70e997a732
export default Signup_client_Fields;