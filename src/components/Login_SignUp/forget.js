import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import fire from '../config';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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
                                MySwal.fire({
                                    position: 'center',
                                    imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                                    imageWidth: 50,
                                    imageHeight: 50,
                                    text: 'DONE!',
                                    width: 400,
                                    showConfirmButton: false,
                                    timer: 1200
                                })
                                MySwal.fire({
                                    position: 'center',
                                    imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                                    imageWidth: 50,
                                    imageHeight: 50,
                                    text: 'Please check your email to choose your new password',
                                    width: 400,
                                    showConfirmButton: false,
                                    timer: 1200
                                })
                                dialog.close(value);
                            }).catch(function () {
                                MySwal.fire({
                                    position: 'center',
                                    imageUrl: 'https://i.ibb.co/R06Zrjb/animation-200-ko7omjl5.gif',
                                    imageWidth: 100,
                                    imageHeight: 100,
                                    text: 'Please try again and make sure to write your EMAIL correctly',
                                    width: 400,
                                    showConfirmButton: true
                                })
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
