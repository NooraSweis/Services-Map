import React                     from 'react';

import { useHistory }            from "react-router-dom";
import Signup_client             from './Signup-client-fields';
import Welcome_page              from './Welcome-page';

const Show_Client_Fields = () => {

    let history = useHistory();
    return (
        <div className='mainDiv'>
            <div className="container " id="container" >
                
                <Signup_client />

                <Welcome_page />

            </div>
        </div>
    );
}
export default Show_Client_Fields;