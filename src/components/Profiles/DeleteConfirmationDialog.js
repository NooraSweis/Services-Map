import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import fire from '../config';
function DeleteConfirmationDialog () {
    
        const dialog = useDialog();
        const [value, setValue] = useState();
        const [pass,setpass]=useState();
        const del=(e)=>{
            setValue(e.target.value);
            const user=fire.auth().currentUser;
            const email=user.email;
            const docs=fire.firestore().collection("User").where('email','==',email).get().then((snap)=>
            {
                snap.forEach((doc)=>{
                    const password=doc.data().password;
                    console.log(pass+","+password)
                   if(password==pass){
                        fire.firestore().collection('User').doc(doc.id).delete();
                        alert('your account deleted');
                        dialog.close(value);
                     }
                })
                
            })
        }
        return(
            <center className='delete-Dialog'>
                <p style={{margin:'3px'}}>For your security, please re-enter your password to continue</p>
                <form>
                    <input type='password' placeholder='Password' className='inputForDelete' onChange={(e)=>{setpass(e.target.pass)}}/>
                    <br/>
                    <button className='continue' onClick={del}>continue</button>
                </form>
            </center>
        );
    
}
export default DeleteConfirmationDialog;