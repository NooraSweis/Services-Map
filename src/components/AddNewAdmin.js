import React,{Component} from 'react';
import style from './style/MainCompProfile.css';
class AddNewAdmin extends Component{
    render(){
        return(
            <div className='externalDiv'>
                
                <div className='fieldsChange'>
                    <form>
                        <h2 className='h2' >Add New Admin</h2>
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
            </div>
        );
    }
}
export default AddNewAdmin;