import React,{Component} from 'react';
import logo from '../image/Profile.jpg';
import style from '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import ServiceDetailsDialog from './ServiceDetailsDialog';
import { CustomDialog }           from 'react-st-modal';
class SPprofile extends Component{
    render(){
        return(
            <div className='externalDiv' id='scrollDiv'>
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
                        <label>Phone :</label>
                        <input type='text'/>
                        <br/>
                        <label>Service type :</label>
                        <input type='text'/>
                        <br/>
                        <label>Description :</label>
                        <input type='text'/>
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
                <hr/>
                <div className='serviceDiv'>
                    <h3 className='part2'>Services :</h3>
                    <button className='plus' onClick={async () => {
                        const result = await CustomDialog(<ServiceDetailsDialog />, {
                            title: 'Add Service Details',
                            showCloseIcon: true,
                        });
                    }}>&#43;</button>
                    <input type='search' placeholder='Search' className='search'/>
                    <div className='showServices'>
                        <div className='sepcService'></div>
                        <div className='sepcService'></div>
                        <div className='sepcService'></div>
                        <div className='sepcService'></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SPprofile;