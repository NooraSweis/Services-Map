import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import fire from '../config';

function CustomDialogContent() {

    const dialog = useDialog();
    const [value, setValue] = useState();

    return (
        <center>
            <input type="email" className='input' placeholder="Email" id="email"
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <div >
                <button className='button'
                    onClick={() => {
                        fire.auth().sendPasswordResetEmail(value)
                            .then(function () {
                                alert('DONE! :) Please check your email to choose your new password')
                                dialog.close(value);
                            }).catch(function (e) {
                                alert('Failed! Please try again and make sure to write your EMAIL correctly :(')
                                console.log(e)
                            })
                    }}
                >
                    Rest password
      </button>
            </div>
        </center>
    );
}
export default CustomDialogContent;
