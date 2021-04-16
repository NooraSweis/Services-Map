import React, { Component } from 'react';
import logo from '../image/Profile.jpg';
import '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { CustomDialog } from 'react-st-modal';

import axios from 'axios';

class MainComp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:null,
            email:"",
            password:"",
            confirmPassword:""
        };
    }

/******************************* */

async componentDidMount(){
    const response = await fetch("http://localhost:8080/api/User/OIEzwwdVm4FF9cw0Q53q");
    const data = await response.json();
    this.setState({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.password
    });
}

handleChangeName=()=>{

    this.setState({
      //  [event.target.value]: name,
    })
}
handleChangeEmail=()=>{
    
}
handleChangePassword=()=>{
    
}
handleChangeConfirmPassword=()=>{
    
}

/*handleSubmit = (event) => {
    const {
        name,
        email,
        password,
        confirmPassword,
    } = this.state;


 
   axios.get("http://localhost:8080/api/User/OIEzwwdVm4FF9cw0Q53q", {
        User: {
            name: name,
            email: email,
            password: password,
           // confirmPassword: confirmPassword,
            type: 'admin',
        }
    }).then(response => {
        console.log('Submitted Successfuly', response);
    }).catch(error => {
        console.log('Submitted faild', error);
    });

    event.preventDefault();
}


/****************************** */


    render() {
        const changeState = () => {
            this.setState({ enabled: '' });
        };
        return (
            <div className='externalDiv'>
                <div className='header'>
                    <img src={logo} className='Default-img' />
                    <h3>Personal information</h3>
                </div>
                <a className='edit' onClick={changeState} style={{ width: '90%' }}>Edit</a>
                <br />
                <div className='fieldsChange'>
                    <form>
                        <label htmlFor='namePerson'>Name :</label>
                        <input type='text' disabled={this.state.enabled} id='namePerson' name='namePerson' value={this.state.name}/>
                        <br />
                        <label htmlFor='emailPerson'>Email :</label>
                        <input type='email' disabled={this.state.enabled} id='emailPerson' name='emailPerson' value={this.state.email}/>
                        <br />
                        <label htmlFor='passwordPerson'>Password :</label>
                        <input type='password' disabled={this.state.enabled} id='passwordPerson' name='passwordPerson' value={this.state.password}/>
                        <br />
                        <label htmlFor='confirmPerson'>Confirm Password :</label>
                        <input type='password' disabled={this.state.enabled} id='confirmPerson' name='confirmPerson' value={this.state.confirmPassword}/>
                        <br />
                        <button type='submit' className='Save-Changes' disabled={this.state.enabled} id='formPerson' name='formPerson'>Save Changes</button>
                    </form>
                </div>
                <hr />
                <a className='Delete' onClick={async () => {
                    const result = await CustomDialog(<DeleteConfirmationDialog />, {
                        title: 'Delete Account',
                        showCloseIcon: true,
                    });
                }}>Delete Account</a>
            </div>
        );
    }
}
export default MainComp;
