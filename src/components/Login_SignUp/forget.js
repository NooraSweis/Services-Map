import React, { useState }                     from 'react';
import { useDialog }                           from 'react-st-modal';

function CustomDialogContent() {
    const dialog = useDialog();

    const [value, setValue] = useState();

    return (
        <center>
            <input
                type="text"
                className='input'
                placeholder="Username"
                onChange={(e) => {
                    setValue(e.target.value);
                    
                }}
            />
            <input
                type="email"
                className='input'
                placeholder="Email"
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <div >
            <button 
              className='button'
                onClick={() => {

                    dialog.close(value);
                }}
            >
               Rest password
      </button>
      </div>
        </center>
    );
}
export default CustomDialogContent;
