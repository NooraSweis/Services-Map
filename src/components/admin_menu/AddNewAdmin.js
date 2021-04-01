import React, { Component } from 'react';
import '../style/MainCompProfile.css';

class AddNewAdmin extends Component {
    render() {
        return (
            <div className='externalDiv'>
                <div className='fieldsChange'>
                    <form>
                        <h2 className='h2' >Add New Admin</h2>
                        <label htmlFor='nameAdmin'>Name :</label>
                        <input type='text' id='nameAdmin' name='nameAdmin' />
                        <br />
                        <label htmlFor='emailAdmin'>Email :</label>
                        <input type='email' id='emailAdmin' name='emailAdmin' />
                        <br />
                        <label htmlFor='passwordAdmin'>Password :</label>
                        <input type='password' id='passwordAdmin' name='passwordAdmin' />
                        <br />
                        <label htmlFor='confirmAdmin'>Confirm Password :</label>
                        <input type='password' id='confirmAdmin' name='confirmAdmin' />
                        <br />
                        <button type='submit' className='Save-Changes' id='addAdminForm' name='addAdminForm'>Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddNewAdmin;