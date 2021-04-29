import React, { Component } from 'react';
import CustomDialogContent from './forget';
import { CustomDialog } from 'react-st-modal';
import fire from '../config';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { withRouter } from "react-router-dom";

var checked = false;
var loading = false;

class Login_Fields extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.login = this.login.bind(this);
        this.ChangeEmail = this.ChangeEmail.bind(this);
        this.ChangePass = this.ChangePass.bind(this);
    }
    login(e) {
        e.preventDefault();
        if (loading) {
            document.querySelector("#loading-login").innerHTML = "LOADING!";
            document.querySelector("#loading-login").style.color = "#1add08";
        }
        loading = true;
        this.setState({ ...this.state });
        //firebase login
        fire.auth().setPersistence(checked ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                fire.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password).then((u) => {
                    fire.firestore().collection('User').where('email', '==', this.state.email.trim()).get().then((snapshot) => {
                        snapshot.forEach((doc) => {
                            localStorage.setItem('user name',doc.data().name);
                            this.props.login({ type: 'LOGIN' })
                            this.props.position({ type: doc.data().type })
                            console.log(localStorage.getItem('user name'))
                            console.log("successfully login")
                        })
                    }).then(() => {
                        this.props.history.push("/Profile");
                    })
                        .catch((err) => {
                            document.querySelector("#loading-login").style.color = "#970808";
                            document.querySelector("#loading-login").innerHTML = err;
                        })

                })
                    .catch((err) => {
                        document.querySelector("#loading-login").style.color = "#970808";
                        document.querySelector("#loading-login").innerHTML = err;
                    });
            })
    }

    handleInputChange(e) {
        checked = !checked;
        console.log(checked)
    }
    ChangeEmail = (e) => {
        this.setState({ ...this.state, email: e.target.value });
        if (loading) document.querySelector("#loading-login").innerHTML = "";
    }
    ChangePass = (e) => {
        this.setState({ ...this.state, password: e.target.value });
        if (loading) document.querySelector("#loading-login").innerHTML = "";
    }

    render() {
        return (
            <div className="form-container sign-in-container">
                <form className='form' action="../Profile.js" method="post">
                    <h2 className='h2' >Sign in</h2>
                    <input className='input' type='email' placeholder="Email" name='email' id='logEmail' onChange={this.ChangeEmail} />
                    <input className='input' type="password" placeholder="Password" id='logPassword' onChange={this.ChangePass} />

                    <div className='forgot-remember-div' >
                        <input className='input' type="checkbox" id="custom-control-input" onChange={this.handleInputChange} />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        <br />
                        <div className='a' style={{ cursor: 'pointer' }} onClick={async () => {
                            await CustomDialog(<CustomDialogContent />, {
                                title: 'Reset password',
                                showCloseIcon: true,
                            });
                        }}>Forgot your password?</div>
                    </div>
                    <br />
                    {loading ?
                        <div className="loading-sign" id="loading-login">LOADING!</div> : null
                    }
                    <button className="bt button" onClick={this.login} >Login</button>
                </form>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: (item) => dispatch(item),
        position: (items) => dispatch(items)
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login_Fields));
