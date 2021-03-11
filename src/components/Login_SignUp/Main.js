import React                     from 'react';

import  Login_SignUp          from './Login-signup';

import { useHistory }            from "react-router-dom";
import './style.css';
import Auth from './Auth';


export const Main = (props) => {

   /* const [smShow, setSmShow] = useState(false);
    const dialog = useDialog();
    const [value, setValue] = useState();*/

    let history = useHistory();

    return (

        <div className='mainDiv'>
            <div className="container " id="container" >

                <Login_SignUp />

                <div className="overlay-container">
                    <div className="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1 className='h1' >Hello, Friend!</h1>
                            <p className='p' > If you don't have an account select your registration as !</p>
                            <button className="ghost button" id="signUp" onClick={() => { 
                                Auth.login(() => { history.push('/Show-SP-fields') }) }} 

                            >SignUp Service Provider </button>
                            <button className="ghost button" id="signUpClient" onClick={() => { Auth.login(() => { history.push('/Show-Client-fields') }) }} >SignUp Client </button>
                        </div>
                    </div>
                </div>

                <div className='Div'></div>

            </div>
        </div>
    )
}
export default Main;