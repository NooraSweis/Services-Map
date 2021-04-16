import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import fire from '../config';
function DeleteConfirmationDialog () {
    
        const dialog = useDialog();
        const [value, setValue] = useState();
        const [pass,setpass]=useState();

        return(
            <center className='delete-Dialog'>
                <p style={{margin:'3px'}}>For your security, please re-enter your password to continue</p>
                <form>
                    <input type='password' placeholder='Password' className='inputForDelete' onChange={(e)=>setpass(e.target.value)}/>
                    <br/>
                    <button className='continue' onClick={(e)=>{
                        e.preventDefault();
                        setValue(e.target.value);
                        const user=fire.auth().currentUser;
                        const email=user.email;
                        fire.firestore().collection("User").where('email','==',email).get().then((snap)=>
                        {
                            snap.forEach((doc)=>{
                                const password=doc.data().password;
                                console.log(pass+","+password)
                               if(password===pass){
                                    fire.firestore().collection('User').doc(doc.id).delete();
                                    user.delete();
                                    alert('your account deleted');
                                    
                                    dialog.close(value);
                                 }
                            })
                            
                        })
                    }}>continue</button>
                </form>
            </center>
        );
    
}
export default DeleteConfirmationDialog;