import React,{Component} from 'react';
import logo from '../image/Profile.jpg';
import style from '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { CustomDialog }           from 'react-st-modal';
class MainComp extends Component{
    render(){
        return(
            <div className='externalDiv'>
                <div className='header'>
                    <img src={logo} className='Default-img'/>
                    <h3>Personal information</h3>
                </div>
                <div className='fieldsChange'>
                    <form>
                        <label>Name :</label>
                        <input type='text'/>
                        <br/>
                        <label>Email :</label>
                        <input type='email'/>
                        <br/>
                        <label>Password :</label>
                        <input type='password'/>
                        <br/>
                        <label>Confirm Password :</label>
                        <input type='password'/>
                        <br/>
                        <button type='submit'className='Save-Changes'>Save Changes</button>
                    </form>
                </div>
                <hr/>
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
