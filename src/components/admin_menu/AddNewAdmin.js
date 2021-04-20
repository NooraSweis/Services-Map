import React, { Component } from 'react';
import '../style/MainCompProfile.css';
import { secondaryApp } from '../config';

class AddNewAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            type: "",
        }
    }

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value,
        })
    }
    resetErrorMsgs = () => {
        var ele = document.getElementsByClassName('error_msg');
        for (var i = 0; i < ele.length; i++) {
            ele[i].innerHTML = '';
            ele[i].style.display = 'none';
        }
    }
    resetInputFields = () => {
        this.setState({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""

        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {
            name,
            email,
            password,
            confirmPassword,
        } = this.state;

        if (password === confirmPassword) {
            secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((u) => {
                secondaryApp.firestore().collection('User').add({
                    email: email,
                    name: name,
                    password: password,
                    type: 'ADMIN'
                })
                    .then((u) => {
                        alert("Added Successfully")
                    })
                    .catch((err) => {
                        alert(err.toString());
                    });
            })
                .catch((err) => {
                    alert(err.toString())
                })
        } else {
            alert("Password does not match");
        }
    }

    render() {
        return (
            <div className='externalDiv'>
                <div className='fieldsChange'>
                    <form onSubmit={this.handleSubmit}>
                        <h2 className='h2' >Add New Admin</h2>

                        <label htmlFor='nameAdmin'>Name :</label>
                        <input type='text' id='nameAdmin' name='nameAdmin' value={this.state.name} onChange={this.handleChangeName} required />
                        <span className="error_msg" id="error_name" style={{ display: 'none', color: 'red' }}></span>

                        <br />
                        <label htmlFor='emailAdmin'>Email :</label>
                        <input type='email' id='emailAdmin' name='emailAdmin' value={this.state.email} onChange={this.handleChangeEmail} required />
                        <span className="error_msg" id="error_email" style={{ display: 'none', color: 'red' }}></span>
                        <br />
                        <label htmlFor='passwordAdmin'>Password :</label>
                        <input type='password' id='passwordAdmin' name='passwordAdmin' value={this.state.password} onChange={this.handleChangePassword} required />
                        <span className="error_msg" id="error_password" style={{ display: 'none', color: 'red' }}></span>

                        <br />
                        <label htmlFor='confirmAdmin'>Confirm Password :</label>
                        <input type='password' id='confirmAdmin' name='confirmAdmin' value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} required />
                        <span className="error_msg" id="error_confirmPassword" style={{ display: 'none', color: 'red' }}></span>

                        <br />
                        <button type='submit' className='Save-Changes' id='addAdminForm' name='addAdminForm'>Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddNewAdmin;