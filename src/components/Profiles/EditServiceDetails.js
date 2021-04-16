import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import img from '../image/servicesDefault.png';
import '../style/MainCompProfile.css';
function EditServiceDetails() {
    useState({ source: img });
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [enabled, setEnabled] = useState({ enabled: 'disabled' });
    const [{ src }, setImg] = useState({
        src: img,

    });
    const changeHandler = (event) => {

        setImg({ src: URL.createObjectURL(event.target.files[0]) }
        );
    };
    const changeState = () => {
        setEnabled();
    };
    return (
        <center className='fieldsChange'>
            <img src={src} alt="logo" id='ServicePic' style={{ width: '95%', height: '250px' }} />
            <div className='edit' onClick={changeState}>Edit</div>
            <form>
                <label for="img2">Select image:</label>
                <input type="file" id="img2" name="img2" accept="image/*" onChange={changeHandler} disabled={enabled} />
                <label htmlFor='editSName'>Service Name :</label>
                <input type='text' disabled={enabled} id='editSName' name='editSName' />
                <br />
                <label htmlFor='editSDesc'>Description :</label>
                <input type='text' disabled={enabled} id='editSDesc' name='editSDesc' />
                <br />
                <label htmlFor='editSPhone'>Phone :</label>
                <input type='text' disabled={enabled} id='editSPhone' name='editSPhone' />
                <br />
                <label htmlFor='editSAddress'>Address :</label>
                <input type='text' disabled={enabled} id='editSAddress' name='editSAddress' />
                <br />
                <label htmlFor='editSStatus'>Status :</label>
                <input type='text' disabled={enabled} id='editSStatus' name='editSStatus' />
                <br />
                <button className='continue' onClick={(e) => {
                    setValue(e.target.value);
                    dialog.close(value);
                }} disabled={enabled} id='editSForm' name='editSForm'>Save Changes</button>
                <button className='continue'>Delete</button>
            </form>
        </center>
    );

}
export default EditServiceDetails;