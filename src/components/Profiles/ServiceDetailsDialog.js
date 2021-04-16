import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import img from '../image/servicesDefault.png';
import '../style/MainCompProfile.css';
import fire from '../config';
function ServiceDetailsDialog() {
    useState({ source: img });
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [{ src }, setImg] = useState({
        src: img,
    });
    const [name,setName]=useState();
    const [description,setDescription]=useState();
    const [address,setAddress]=useState();
    const [status,setStatus]=useState();
    const [id,setID]=useState();
    const [phone,setPhone]=useState();
    const changeHandler = (event) => {
        setImg({ src: URL.createObjectURL(event.target.files[0]) }
        );
    };

    return (
        <center className='fieldsChange'>
            <img src={src} id='ServicePic' alt='service' style={{ width: '95%', height: '250px' }} />
            <form>
                <label htmlFor="img">Select image:</label>
                <input type="file" id="img" name="img" accept="image/*" onChange={changeHandler} />
                <label htmlFor='addSname'>Service Name :</label>
                <input type='text' id='addSname' name='addSname' onChange={(e)=>setName(e.target.value)}/>
                <br />
                <label htmlFor='addSDesc'>Description :</label>
                <input type='text' id='addSDesc' name='addSDesc' onChange={(e)=>setDescription(e.target.value)}/>
                <br />
                <label htmlFor='addSPhone'>Phone :</label>
                <input type='text' id='addSPhone' name='addSPhone' />
                <br />
                <label htmlFor='addSAddress'>Address :</label>
                <input type='text' id='addSAddress' name='addSAddress' onChange={(e)=>setAddress(e.target.value)}/>
                <br />
                <label htmlFor='addSStatus'>Status :</label>
                <input type='text' id='addSStatus' name='addSStatus' onChange={(e)=>setStatus(e.target.value)}/>
                <br />
                <button className='continue' onClick={(e) => {
                    e.preventDefault();
                    setValue(e.target.value);
                    const user=fire.auth().currentUser;
                    var x;var y ;
                        fire.firestore().collection('User').where('email','==',user.email).get().then((snapshot)=>{
                       snapshot.forEach((doc)=>{
                           x=doc.id
                          setID(x);
                          y=doc.data().phone;
                          setPhone(y);
                       })
                   }).catch((err)=>{console.log(err)})
                  
                    fire.firestore().collection('services').add({
                        userID:id,ServiceName:name,description:description,phone:phone,address:address,status:status
                    })
                    
                    dialog.close(value);
                }} id='addSForm' name='addSForm'>Add Service</button>
            </form>
        </center>
    );

}
export default ServiceDetailsDialog;