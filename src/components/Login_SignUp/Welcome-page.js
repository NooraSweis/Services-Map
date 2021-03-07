import React                     from 'react';

import Auth                      from './Auth';
import { useHistory }            from "react-router-dom";


const Welcome_page = () => {

    let history = useHistory();
    return (

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>If you have an account click her </p>
                            <button className="ghost" id="signIn" onClick={() => { Auth.login(() => { history.push('/SignIn') }) }} > SignIn </button>
                        </div>
                    </div>
                </div>
    );
}
export default Welcome_page;