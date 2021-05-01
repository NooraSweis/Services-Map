import RemoveIcon from '@material-ui/icons/Remove';
import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';
import { firestore } from '../config';
import "../style/UpdatePathDialog.css";

export default function UpdatePath(props) {

    const dialog = useDialog();
    const [items, setItems] = useState(props.points);

    const update = (index) => {
        var newItems = items.splice(index, 1);
        setItems(newItems);
    }

    const close = () => {
        firestore.collection("User").doc(props.userID).update({
            path: items
        }).then(() => {
            dialog.close(items);
        })
    }
    return (
        <center className="outercenter">
            {items.length !== 0 ?
                items.map((item, index) => (
                    <div onClick={() => { update(index) }} className="update-path-item" key={index}>
                        <RemoveIcon style={{ color: 'red' }} />
                        <div className="update-path-item-name">{item.name}</div>
                    </div>
                ))
                :
                null
            }
            <br />
            <button onClick={() => { close() }} className="update-path-btn">Update</button>
        </center>
    );
}