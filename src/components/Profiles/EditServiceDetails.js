import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import { firestore, storage } from '../config';
import '../style/MainCompProfile.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
function EditServiceDetails(props) {
    const dialog = useDialog();

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const [name, setName] = useState(props.item.name);
    const [description, setDescription] = useState(props.item.description);
    const [address, setAddress] = useState(props.item.address);
    const [status, setStatus] = useState(props.item.status);
    const [phone] = useState(props.item.phone);
    const [src, setSrc] = useState(props.item.url);
    const [fileName, setFileName] = useState(props.item.serviceImg);
    const [read, setRead] = useState(true);
    const [image, setImage] = useState(false);

    const saveChanges = (e) => {
        e.preventDefault();
        setLoading(true);
        if (name !== '' && description !== '' && status !== '' && address !== '') {
            if (image) {
                const storageRef = storage.ref().child(fileName);
                storageRef.put(file).then(() => {
                    firestore.collection("services").doc(props.item.id).update({
                        serviceImg: fileName,
                        name: name,
                        description: description,
                        address: address,
                        status: status
                    })
                }).then(() => {
                    dialog.close();
                    alertDone("Changed successfully")
                })
            } else {
                firestore.collection("services").doc(props.item.id).update({
                    name: name,
                    description: description,
                    address: address,
                    status: status
                }).then(() => {
                    dialog.close();
                    alertDone("Changed successfully")
                })
            }
        }
        else {
            alertError("All fields are required!")
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

    const alertDone = (e) => {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
            imageWidth: 50,
            imageHeight: 50,
            text: e,
            width: 400,
            showConfirmButton: false,
            timer: 2500
        })
    }

    const deleteItem = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(loading)
        firestore.collection("services").doc(props.item.id).delete().then(() => {
            setLoading(false);
            dialog.close();
            alertDone("Service successfully deleted!");
        }).catch((error) => {
            alertError("Error removing service: " + error);
        });
    }

    return (
        <center className='fieldsChange' >
            <img src={src} alt="logo" id='ServicePic' style={{ width: '95%', height: '250px' }} />
            <div className='edit' onClick={() => { setRead(false) }}>Edit</div>
            <form>
                <label htmlFor="img2">Select image:</label>
                <input type="file" id="img2" name="img2" accept="image/*" onChange={(e) => {
                    setFile(e.target.files[0])
                    setFileName("" + props.userID + props.numberOfServices + e.target.files[0].name);
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    setImage(true);
                }} readOnly={read} />
                <label htmlFor='editSName'>Service Name:</label>
                <input type='text' id='editSName' name='editSName' value={name} onChange={(e) => { setName(e.target.value); }} readOnly={read} />
                <br />
                <label htmlFor='editSDesc'>Description:</label>
                <input type='text' id='editSDesc' name='editSDesc' value={description} onChange={(e) => { setDescription(e.target.value); }} readOnly={read} />
                <br />
                <label htmlFor='editSPhone'>Phone:</label>
                <input type='text' id='editSPhone' name='editSPhone' value={phone} readOnly />
                <br />
                <label htmlFor='editSAddress'>Address:</label>
                <input type='text' id='editSAddress' name='editSAddress' value={address} onChange={(e) => { setAddress(e.target.value); }} readOnly={read} />
                <br />
                <label htmlFor='editSStatus'>Status:</label>
                <input type='text' id='editSStatus' name='editSStatus' value={status} onChange={(e) => { setStatus(e.target.value); }} readOnly={read} />
                <br />

                <div className="loading-sign">{loading ? "Please wait..." : ""}</div>

                <button className='continue' id='editSForm' name='editSForm' onClick={saveChanges}>Save Changes</button>
                <button className='continue' onClick={deleteItem}>Delete</button>
            </form>
        </center>
    );
}
export default EditServiceDetails;