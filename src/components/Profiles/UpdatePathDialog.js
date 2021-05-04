import RemoveIcon from '@material-ui/icons/Remove';
import React, { useState } from 'react';
import { firestore } from '../config';
import "../style/UpdatePathDialog.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function UpdatePath(props) {

    const MySwal = withReactContent(Swal);
    const [items, setItems] = useState(props.points);
    const [value, setValue] = useState(0);

    const update = (index, name) => {
        MySwal.fire({
            title: name,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                items.splice(index, 1);
                setItems(items);
                console.log(items)
                setValue(value + 1);
                firestore.collection("User").doc(props.userID).update({
                    path: items
                }).then(() => {
                    MySwal.fire({
                        imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                        imageWidth: 50,
                        imageHeight: 50,
                        text: 'Deleted!',
                        showConfirmButton: false,
                        timer: 1100
                    })
                })
            }
        })
    }

    return (
        <center className="outercenter">
            {items.length !== 0 ?
                items.map((item, index) => (
                    <div onClick={() => { update(index, item.name) }} className="update-path-item" key={index}>
                        <RemoveIcon style={{ color: 'red' }} />
                        <div className="update-path-item-name">{item.name}</div>
                    </div>
                ))
                :
                <div>
                    <div>Looks like you didn't add services to your path?</div>
                    <img src="https://i.ibb.co/KstwmyG/no-path.gif" alt="No Path" />
                </div>
            }
        </center>
    );
}