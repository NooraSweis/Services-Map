import React from 'react'

const Signup_client_Fields = () => {
    return (
        <div>
            <div className="form-container sign-up-container">
                <form className='form' action="#">
                    <h2 className='h2' >Signup as Client</h2>

                    <input className='input' type="text" placeholder="Name" />
                    <input className='input' type="email" placeholder="Email" />
                    <input className='input' type="password" placeholder="Password" />
                    <input className='input' type="password" placeholder="Confirm Password" />

                    <button className="bt button" >Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default Signup_client_Fields;