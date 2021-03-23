import React from 'react';
import Signup_SP from './Signup-SP-fields';
import Welcome_page from './Welcome-page';

const Show_SP_Fields = () => {
    return (
        <div className='mainDiv'>
            <div className="container " id="container" >

                <Signup_SP />

                <Welcome_page />
            </div>
        </div>
    );
}
export default Show_SP_Fields;