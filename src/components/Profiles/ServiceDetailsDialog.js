import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import img from '../image/servicesDefault.png';
import '../style/MainCompProfile.css';

function ServiceDetailsDialog() {
    useState({ source: img });
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [{ src }, setImg] = useState({
        src: img,
    });

    const changeHandler = (event) => {
        setImg({ src: URL.createObjectURL(event.target.files[0]) }
        );
    };

    return (
        <center className='fieldsChange'>
            <img src={src} id='ServicePic' alt='service' style={{ width: '95%', height: '250px' }} />
            <form>
                <label for="img">Select image:</label>
                <input type="file" id="img" name="img" accept="image/*" onChange={changeHandler} />
                <label htmlFor='addSname'>Service Name :</label>
                <input type='text' id='addSname' name='addSname' />
                <br />
                <label htmlFor='addSDesc'>Description :</label>
                <input type='text' id='addSDesc' name='addSDesc' />
                <br />
                <label htmlFor='addSPhone'>Phone :</label>
                <input type='text' id='addSPhone' name='addSPhone' />
                <br />
                <label htmlFor='addSAddress'>Address :</label>
                <input type='text' id='addSAddress' name='addSAddress' />
                <br />
                <label htmlFor='addSStatus'>Status :</label>
                <input type='text' id='addSStatus' name='addSStatus' />
                <br />
                <button className='continue' onClick={(e) => {
                    setValue(e.target.value);
                    dialog.close(value);
                }} id='addSForm' name='addSForm'>Add Service</button>
            </form>
        </center>
    );

}
export default ServiceDetailsDialog;