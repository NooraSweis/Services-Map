import React,{Component} from 'react';
import logo from '../image/Profile.jpg';
import style from '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import ServiceDetailsDialog from './ServiceDetailsDialog';
import { CustomDialog }           from 'react-st-modal';
import EditServiceDetails from './EditServiceDetails';
class SPprofile extends Component{
    constructor(props){
        super(props);
        this.state = {enabled:'disabled'};
    }
    render(){
        const changeState = () =>{
            this.setState({enabled:''});
        };
        return(
            <div className='externalDiv' id='scrollDiv'>
                <div className='header'>
                    <img src={logo} className='Default-img'/>
                    <h3>Personal information</h3>
                </div>
                <a className='edit' onClick={changeState} style={{width:'90%'}}>Edit</a>
                <div className='fieldsChange'>
                    <form>
                        <label htmlFor='nameSP'>Name :</label>
                        <input type='text' disabled={this.state.enabled} id='nameSP' name='nameSP'/>
                        <br/>
                        <label htmlFor='emailSP'>Email :</label>
                        <input type='email' disabled={this.state.enabled} id='emailSP' name='emailSP'/>
                        <br/>
                        <label htmlFor='passwordSP'>Password :</label>
                        <input type='password' disabled={this.state.enabled} id='passwordSP' name='passwordSP'/>
                        <br/>
                        <label htmlFor='confirmSP'>Confirm Password :</label>
                        <input type='password' disabled={this.state.enabled} id='confirmSP' name='confirmSP'/>
                        <br/>
                        <label htmlFor='phoneSP'>Phone :</label>
                        <input type='text' disabled={this.state.enabled} id='phoneSP' name='phoneSP'/>
                        <br/>
                        <label htmlFor='typeSP'>Service type :</label>
                        <input type='text' disabled={this.state.enabled} id='typeSP' name='typeSP'/>
                        <br/>
                        <label htmlFor='descSP'>Description :</label>
                        <input type='text' disabled={this.state.enabled} id='descSP' name='descSP'/>
                        <br/>
                        <button type='submit'className='Save-Changes' disabled={this.state.enabled} id='formSP' name='formSP'>Save Changes</button>
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
                        <div className='sepcService' onClick={async () => {
                        const result = await CustomDialog(<EditServiceDetails />, {
                            title: 'Service Details',
                            showCloseIcon: true,
                        });
                    }}></div>
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