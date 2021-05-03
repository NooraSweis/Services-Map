import React, { useState } from 'react';
import img from '../image/servicesDefault.png';
import '../style/MainCompProfile.css';
import { firestore, storage } from '../config';
import { useDialog } from 'react-st-modal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function ServiceDetailsDialog(props) {
    const dialog = useDialog();

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(img);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [status, setStatus] = useState();
    const [src, setSrc] = useState('https://i.ibb.co/55YtvZS/services-Default.jpg');
    const [fileName, setFileName] = useState('servicesDefault.png');
    const [image, setImage] = useState(false);
    const [value, setValue] = useState({
        url: src,
        serviceImg: 'servicesDefault.png',
        name: name,
        phone: props.userPhone,
        description: description,
        address: address,
        status: status
    });

    const addServices = (e) => {
        e.preventDefault();
        setLoading(true);
        if (name !== '' && description !== '' && address !== '' && status !== '') {
            const email = props.userEmail;
            const phone = props.userPhone;
            const storageRef = storage.ref().child(fileName);
            storageRef.put(file).then((e) => {
                firestore.collection("services")
                    .add({
                        serviceImg: image ? fileName : 'servicesDefault.png',
                        email: email,
                        name: name,
                        phone: phone,
                        description: description,
                        address: address,
                        status: status
                    })
            }).then(() => {
                firestore.collection("User").doc(props.userID).update({
                    numberOfServices: props.numberOfServices
                })
            }).then(() => {
                setSrc('https://i.ibb.co/55YtvZS/services-Default.jpg');
                setName("");
                setAddress("");
                setDescription("");
                setImage(false);
                setStatus("");
                setLoading(false);
                dialog.close(value.name ? value : null);
                MySwal.fire({
                    position: 'center',
                    imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                    imageWidth: 50,
                    imageHeight: 50,
                    text: 'Your service added successfully',
                    width: 400,
                    showConfirmButton: false,
                    timer: 2500
                })
            }).catch((err) => {
                alertError(err)
            });
        }
        else {
            alertError('all fields are required !');
        }
    }

   const alertError = (e) => {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/R06Zrjb/animation-200-ko7omjl5.gif',
            imageWidth: 100,
            imageHeight: 100,
            text: e,
            width: 400,
            showConfirmButton: true
        })
    }

    return (
        <center className='fieldsChange'>
            <img src={src} id='ServicePic' alt='service' style={{ width: '95%', height: '250px' }} />
            <form>
                <label htmlFor="img">Select image:</label>
                <input type="file" id="img" name="img" accept="image/*" onChange={(e) => {
                    setFile(e.target.files[0])
                    setFileName("" + props.userID + props.numberOfServices + e.target.files[0].name);
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    setImage(true);
                    setValue({
                        url: src,
                        serviceImg: image ? fileName : 'servicesDefault.png',
                        name: name,
                        phone: props.userPhone,
                        description: description,
                        address: address,
                        status: status
                    });
                }} />
                <label htmlFor='addSname'>Service Name :</label>
                <input type='text' id='addSname' name='addSname' value={name} onChange={(e) => {
                    setName(e.target.value);
                    setValue({
                        url: src,
                        serviceImg: image ? fileName : 'servicesDefault.png',
                        name: e.target.value,
                        phone: props.userPhone,
                        description: description,
                        address: address,
                        status: status
                    });
                }} />
                <br />
                <label htmlFor='addSDesc'>Description :</label>
                <input type='text' id='addSDesc' name='addSDesc' value={description} onChange={(e) => {
                    setDescription(e.target.value);
                    setValue({
                        url: src,
                        serviceImg: image ? fileName : 'servicesDefault.png',
                        name: name,
                        phone: props.userPhone,
                        description: e.target.value,
                        address: address,
                        status: status
                    });
                }} />
                <br />
                <label htmlFor='addSAddress'>Address :</label>
                <input type='text' id='addSAddress' name='addSAddress' value={address} onChange={(e) => {
                    setAddress(e.target.value);
                    setValue({
                        url: src,
                        serviceImg: image ? fileName : 'servicesDefault.png',
                        name: name,
                        phone: props.userPhone,
                        description: description,
                        address: e.target.value,
                        status: status
                    });
                }} />
                <br />
                <label htmlFor='addSStatus'>Status :</label>
                <input type='text' id='addSStatus' name='addSStatus' value={status} onChange={(e) => {
                    setStatus(e.target.value);
                    setValue({
                        url: src,
                        serviceImg: image ? fileName : 'servicesDefault.png',
                        name: name,
                        phone: props.userPhone,
                        description: description,
                        address: address,
                        status: e.target.value
                    });
                }} />
                <br />

                <div className="loading-sign" id="loading-add-service">{loading ? "Please wait...!" : ""}</div>

                <button className='continue' id='addSForm' name='addSForm' onClick={addServices}>Add Service</button>
            </form>
        </center>
    );
}

export default ServiceDetailsDialog;