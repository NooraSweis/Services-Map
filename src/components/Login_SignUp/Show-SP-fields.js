import React from 'react';
import SignupSP from './Signup-SP-fields';
import WelcomePage from './Welcome-page';

const Show_SP_Fields = () => {
    return (
        <div className='mainDiv'>
            <div className="container " id="container" >
                <SignupSP />
                <WelcomePage />
            </div>
        </div>
    );
}
export default Show_SP_Fields;