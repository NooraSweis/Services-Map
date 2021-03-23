import React from 'react';
import CustomDialogContent from './forget';
import { CustomDialog } from 'react-st-modal';

const Login_Fields = () => {

    return (
        <div class="form-container sign-in-container">
            <form className='form' action="#">
                <h2 className='h2' >Sign in</h2>
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="password" placeholder="Password" />

                <div className='forgot-remember-div' > <a className='a' style={{ cursor: 'pointer' }} onClick={async () => {
                    const result = await CustomDialog(<CustomDialogContent />, {
                        title: 'Reset password',
                        showCloseIcon: true,
                    });
                }}>Forgot your password?</a>

                    <input className='input' type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>

                </div>

                <button className="bt button" >Login</button>
            </form>
        </div>
    );
}
export default Login_Fields;