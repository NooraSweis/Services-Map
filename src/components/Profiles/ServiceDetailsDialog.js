import React, { useState }                     from 'react';
import { useDialog }                           from 'react-st-modal';
import img from '../image/servicesDefault.png';
import style from '../style/MainCompProfile.css';
function ServiceDetailsDialog () {
        const [source, setSource] = useState({source: img});
        const dialog = useDialog();
        const [value, setValue] = useState();
        const [{ src}, setImg] = useState({
            src: img,
            
    });
        const changeHandler = (event) => {
            
            setImg({src :URL.createObjectURL(event.target.files[0])}
                );
        };
        return(
            <center className='fieldsChange'>
                <img src={src}  id='ServicePic' style={{width:'95%'}}/>
                <form>
                    <label for="img">Select image:</label>
                    <input type="file" id="img" name="img" accept="image/*" onChange={changeHandler} />
                    <label>Service Name :</label>
                    <input type='text' />
                    <br/>
                    <label>Description :</label>
                    <input type='text' />
                    <br/>
                    <label>Phone :</label>
                    <input type='text' />
                    <br/>
                    <label>Address :</label>
                    <input type='text' />
                    <br/>
                    <label>Status :</label>
                    <input type='text' />
                    <br/>
                    <button className='continue' onClick={(e)=>{
                        setValue(e.target.value);
                        dialog.close(value);
                    }}>Add Service</button>
                </form>
            </center>
        );
    
}
export default ServiceDetailsDialog;