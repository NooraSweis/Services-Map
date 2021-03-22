import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import "../style/UpdatePathDialog.css"

export default function UpdatePath() {

    const dialog = useDialog();
    const [value, setValue] = useState();
    const [setImg] = useState({
    });

    const changeHandler = (event) => {
        setImg({ src: URL.createObjectURL(event.target.files[0]) }
        );
    };

    return (
        <center className="outercenter">

            <div className="update-path-item">
                <img src="https://i.ibb.co/TYgJ8bt/minus.png" alt="delete" width="20" height="20" />
                <div className="update-path-item-name">Item</div>
            </div>
            <br />
            <button className="update-path-btn">Update</button>
        </center>
    );
}