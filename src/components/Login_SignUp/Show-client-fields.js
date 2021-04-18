import React from 'react';
import { useHistory } from "react-router-dom";
import SignupClient from './Signup-client-fields';
import WelcomePage from './Welcome-page';

const Show_Client_Fields = () => {

    useHistory();
    return (
        <div className='mainDiv'>
            <div className="container " id="container" >
                <SignupClient />
                <WelcomePage />
            </div>
        </div>
    );
}
export default Show_Client_Fields;