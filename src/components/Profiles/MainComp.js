import React, { Component } from 'react';
import logo from '../image/Profile.jpg';
import '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { CustomDialog } from 'react-st-modal';

class MainComp extends Component {
    constructor(props) {
        super(props);
        this.state = { enabled: 'disabled' };
    }
    render() {
        const changeState = () => {
            this.setState({ enabled: '' });
        };
        return (
            <div className='externalDiv'>
                <div className='header'>
                    <img alt= "logo" src={logo} className='Default-img' />
                    <h3>Personal information</h3>
                </div>
                <div className='edit' onClick={changeState} style={{ width: '90%' }}>Edit</div>
                <br />
                <div className='fieldsChange'>
                    <form>
                        <label htmlFor='namePerson'>Name :</label>
                        <input type='text' disabled={this.state.enabled} id='namePerson' name='namePerson' />
                        <br />
                        <label htmlFor='emailPerson'>Email :</label>
                        <input type='email' disabled={this.state.enabled} id='emailPerson' name='emailPerson' />
                        <br />
                        <label htmlFor='passwordPerson'>Password :</label>
                        <input type='password' disabled={this.state.enabled} id='passwordPerson' name='passwordPerson' />
                        <br />
                        <label htmlFor='confirmPerson'>Confirm Password :</label>
                        <input type='password' disabled={this.state.enabled} id='confirmPerson' name='confirmPerson' />
                        <br />
                        <button type='submit' className='Save-Changes' disabled={this.state.enabled} id='formPerson' name='formPerson'>Save Changes</button>
                    </form>
                </div>
                <hr />
                <div className='Delete' onClick={async () => {
                    await CustomDialog(<DeleteConfirmationDialog />, {
                        title: 'Delete Account',
                        showCloseIcon: true,
                    });
                }}>Delete Account</div>
            </div>
        );
    }
}
export default MainComp;
