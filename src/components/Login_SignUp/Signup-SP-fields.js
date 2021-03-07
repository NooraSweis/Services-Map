import React                     from 'react'

 const Signup_SP_Fields =() =>{
    return (
        
              <div className="form-container sign-up-container">
                <form action="#">
                    <h2 >Signup as Service Provider</h2>
                  
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    
                    <input type="password" placeholder="Confirm Password" />
                    <input type="text" placeholder="Phone" />
                    <input type="text" placeholder="Service Type" />
                    <input type="text" placeholder="Description" />

                   
                    <button  className="bt" >Sign Up</button>
                </form>
            </div>
        
    )
}
export default Signup_SP_Fields;

