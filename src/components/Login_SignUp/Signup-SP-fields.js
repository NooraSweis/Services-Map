import React from 'react'

const Signup_SP_Fields = () => {
    return (
        <div className="form-container sign-up-container">
            <form className='form' action="#">
                <h2 className='h2' >Signup as Service Provider</h2>

                <input className='input' type="text" placeholder="Name" />
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="password" placeholder="Password" />
                <input className='input' type="password" placeholder="Confirm Password" />
                <input className='input' type="text" placeholder="Phone" />
                <input className='input' type="text" placeholder="Service Type" />
                <input className='input' type="text" placeholder="Description" />

                <button className="bt button" >Sign Up</button>
            </form>
        </div>
    )
}
export default Signup_SP_Fields;

