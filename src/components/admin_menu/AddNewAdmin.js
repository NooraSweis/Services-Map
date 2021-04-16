import React, { Component } from 'react';
import '../style/MainCompProfile.css';

import axios from 'axios';
class AddNewAdmin extends Component {

    /*****************************/

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

    /*******************************/
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
        for(var i=0; i<ele.length;i++) {
            ele[i].innerHTML = '';
            ele[i].style.display = 'none';
        }
    }

    handleSubmit = (event) => {
        const {
            name,
            email,
            password,
            confirmPassword,
        } = this.state;



        axios.post("http://localhost:8080/api/User", {
           
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                type: 'admin',
            
        }).then(response => {
            this.resetErrorMsgs();
            alert('Submitted Successfuly', response);

        }).catch((error) => {
            this.resetErrorMsgs();
            var errors = JSON.parse(error.request.response)["errors"];
            if(errors.length > 0) {
                for(var i=0; i<errors.length; i++) {
                    var ele = document.getElementById('error_'+errors[i]['param']);
                    ele.innerHTML = errors[i]['msg'];
                    ele.style.display = 'block';
                }

            }
           // console.log('Submitted faild', error);
        });

        event.preventDefault();
    }

    /**************************** */

    
     

    render() {
        return (
            <div className='externalDiv'>
                <div className='fieldsChange'>
                    <form onSubmit={this.handleSubmit}>
                        <h2 className='h2' >Add New Admin</h2>
                        <label htmlFor='nameAdmin'>Name :</label>
                        <input type='text' id='nameAdmin' name='nameAdmin' placeholder='Name' value={this.state.name} onChange={this.handleChangeName} required />
                        <br />
                        <label htmlFor='emailAdmin'>Email :</label>
                        <input type='email' id='emailAdmin' name='emailAdmin' placeholder='Email' value={this.state.email} onChange={this.handleChangeEmail} required />
                        <span className="error_msg" id="error_email" style={{display: 'none',color: 'red'}}></span>
                        <br />
                        <label htmlFor='passwordAdmin'>Password :</label>
                        <input type='password' id='passwordAdmin' name='passwordAdmin' placeholder='Password' value={this.state.password} onChange={this.handleChangePassword} required />
                        <br />
                        <label htmlFor='confirmAdmin'>Confirm Password :</label>
                        <input type='password' id='confirmAdmin' name='confirmAdmin' placeholder='Confirm Password' value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} required />
                        <span className="error_msg" id="error_confirmPassword" style={{display: 'none',color: 'red'}}></span>

                        <br />
                        <button type='submit' className='Save-Changes' id='addAdminForm' name='addAdminForm'>Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddNewAdmin;