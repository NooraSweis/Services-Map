import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import logo from '../image/Profile.jpg';
import Map from "../Map";
import "../style/AccountApproval.css";

function ItemDialog() {

    const dialog = useDialog();
    const [value, setValue] = useState();
    const [setImg] = useState({
    });

    const changeHandler = (event) => {
        setImg({ src: URL.createObjectURL(event.target.files[0]) }
        );
    };

    return (
        <center className="fieldsChange">
            <form>
                <div className='approval-dialog-photo'>
                    <img src={logo} className='Default-img' />
                </div>
                <br />
                <div className="row-item">
                    <div className="approval-dialog-item">Name:</div>
                    <div className="approval-dialog-item" id="approval-dialog-name">Info</div>
                </div>
                <br />
                <div className="row-item">
                    <div className="approval-dialog-item">Email:</div>
                    <div className="approval-dialog-item" id="approval-dialog-email">Info</div>
                </div>
                <br />
                <div className="row-item">
                    <div className="approval-dialog-item">Phone:</div>
                    <div className="approval-dialog-item" id="approval-dialog-phone">Name: </div>
                </div>
                <br />
                <div className="row-item">
                    <div className="approval-dialog-item">Service Type:</div>
                    <div className="approval-dialog-item" id="approval-dialog-type">Info</div>
                </div>
                <br />
                <div className="row-item">
                    <div className="approval-dialog-item">Description:</div>
                    <div className="approval-dialog-item" id="approval-dialog-description">Info</div>
                </div>
                <br />
                <div id="map">
                    <Map />
                </div>
            </form>
        </center>
    );

}

export default ItemDialog;