import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import { firestore, storage } from '../config';
import '../style/MainCompProfile.css';

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

    const edit = () => {
        setRead(false);
    }
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
                    alert("Changed successfully")
                })
            } else {
                firestore.collection("services").doc(props.item.id).update({
                    name: name,
                    description: description,
                    address: address,
                    status: status
                }).then(() => {
                    dialog.close();
                    alert("Changed successfully")
                })
            }
        }
        else {
            alert("All fields are required!")
        }
    }

    const deleteItem = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(loading)
        firestore.collection("services").doc(props.item.id).delete().then(() => {
            setLoading(false);
            dialog.close();
            alert("Service successfully deleted!");
        }).catch((error) => {
            alert("Error removing service: ", error);
        });
    }

    return (
        <center className='fieldsChange' >
            <img src={src} alt="logo" id='ServicePic' style={{ width: '95%', height: '250px' }} />
            <div className='edit' onClick={edit}>Edit</div>
            <form>
                <label htmlFor="img2">Select image:</label>
                <input type="file" id="img2" name="img2" accept="image/*" onChange={(e) => {
                    setFile(e.target.files[0])
                    setFileName("" + props.userID + props.numberOfServices + e.target.files[0].name);
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    setImage(true);
                }} readOnly={read} />
                <label htmlFor='editSName'>Service Name:</label>
                <input type='text' id='editSName' name='editSName' defaultValue={name} onChange={(e) => { setName(e.target.value); }} readOnly={read} />
                <br />
                <label htmlFor='editSDesc'>Description:</label>
                <input type='text' id='editSDesc' name='editSDesc' defaultValue={description} onChange={(e) => { setDescription(e.target.value); }} readOnly={read} />
                <br />
                <label htmlFor='editSPhone'>Phone:</label>
                <input type='text' id='editSPhone' name='editSPhone' defaultValue={phone} readOnly />
                <br />
                <label htmlFor='editSAddress'>Address:</label>
                <input type='text' id='editSAddress' name='editSAddress' defaultValue={address} onChange={(e) => { setAddress(e.target.value); }} readOnly={read} />
                <br />
                <label htmlFor='editSStatus'>Status:</label>
                <input type='text' id='editSStatus' name='editSStatus' defaultValue={status} onChange={(e) => { setStatus(e.target.value); }} readOnly={read} />
                <br />

                <div className="loading-sign">{loading ? "Please wait..." : ""}</div>

                <button className='continue' id='editSForm' name='editSForm' onClick={saveChanges}>Save Changes</button>
                <button className='continue' onClick={deleteItem}>Delete</button>
            </form>
        </center>
    );
}
export default EditServiceDetails;