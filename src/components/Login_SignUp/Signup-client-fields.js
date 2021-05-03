import React from 'react';
import { Component } from 'react';
import fire from '../config';
import { withRouter } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
var loading = false;

class Signup_client_Fields extends Component {

    signUp = (e) => {
        e.preventDefault();
        loading = true;
        this.setState({ ...this.setState })
        const name = document.querySelector('#SignName').value;
        const email = document.querySelector('#SignEmail').value.trim();
        const password = document.querySelector('#SignPassword').value;
        const confirmPass = document.querySelector('#SignConfirm').value;

        if (name.length < 2 || !(password.match(/[0-9]/g)) || !(password.match(/[a-z]/g)) || !(password.match(/[A-Z]/g)) || password.length < 8) {
            if (name.length < 2)
                this.alertError('name field is required and must be 3 or more characters long!')
            else
                this.alertError('password must be at least 8 characters, at least one capital and one small letter')
        }

        else if (password === confirmPass) {
            fire.auth().createUserWithEmailAndPassword(email, password).then((u) => {
                fire.firestore().collection('User').add({
                    email: email,
                    name: name,
                    password: password,
                    type: 'client-in',
                    path: []
                })
                    .then((u) => {
                        var user = fire.auth().currentUser;
                        user.sendEmailVerification().then(() => {
                            loading = false;
                            this.setState({ ...this.setState });
                            this.props.history.push("/SignIn");
                            MySwal.fire({
                                position: 'center',
                                imageUrl: 'https://i.ibb.co/TcQ7sQX/email.gif',
                                imageWidth: 100,
                                imageHeight: 100,
                                text: 'Please check your email',
                                width: 400,
                                showConfirmButton: false,
                                timer: 3000
                            })
                        })
                    })
            })
                .catch((err) => {
                    this.alertError(err.toString())
                })
        }
        else {
            this.alertError("password does not match");
        }
    }

    alertError(e) {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/R06Zrjb/animation-200-ko7omjl5.gif',
            imageWidth: 100,
            imageHeight: 100,
            text: e,
            width: 400,
            showConfirmButton: true
        })
    }

    render() {
        return (
            <div>
                <div className="form-container sign-up-container">
                    <form className='form' action="#">
                        <h2 className='h2' >Signup as Client</h2>

                        <input className='input' type="text" placeholder="Name" id='SignName' />
                        <input className='input' type="email" placeholder="Email" id='SignEmail' />
                        <input className='input' type="password" placeholder="Password" id='SignPassword' />
                        <input className='input' type="password" placeholder="Confirm Password" id='SignConfirm' />


                        {loading ?
                            <div className="loading-sign" id="loading-client-signup">LOADING!</div> : null
                        }
                        <button className="bt button" onClick={this.signUp}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Signup_client_Fields);