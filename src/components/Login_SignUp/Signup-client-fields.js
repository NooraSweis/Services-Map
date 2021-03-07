import React                     from 'react'

 const Signup_client_Fields =() =>{
    return (
        <div>
              <div className="form-container sign-up-container">
                <form action="#">
                    <h2 >Signup as Client</h2>
                  
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    
                    <input type="password" placeholder="Confirm Password" />
                
                    <button  className="bt" >Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default Signup_client_Fields;
