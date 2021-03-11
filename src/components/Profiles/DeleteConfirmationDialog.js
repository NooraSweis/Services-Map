import React, { useState }                     from 'react';
import { useDialog }                           from 'react-st-modal';
function DeleteConfirmationDialog () {
    
        const dialog = useDialog();
        const [value, setValue] = useState();
        return(
            <center className='delete-Dialog'>
                <p style={{margin:'3px'}}>For your security, please re-enter your password to continue</p>
                <form>
                    <input type='password' placeholder='Password' className='inputForDelete' />
                    <br/>
                    <button className='continue' onClick={(e)=>{
                        setValue(e.target.value);
                        dialog.close(value);
                    }}>continue</button>
                </form>
            </center>
        );
    
}
export default DeleteConfirmationDialog;