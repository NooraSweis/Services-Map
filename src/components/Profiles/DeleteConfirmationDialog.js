import React, { Component } from 'react';
import { auth, firestore } from '../config';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
var user = auth.currentUser;
var email = user ? user.email.toString() : "";
var password = "";
var typedPassword = "";
var docID = "";

class DeleteConfirmationDialog extends Component {

    componentDidMount() {
        user = auth.currentUser;
        email = auth.currentUser.email;
        //console.log(email)
        firestore.collection("User").where("email", "==", email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    password = doc.data().password;
                    docID = doc.id;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    del = (e) => {
        e.preventDefault();
        if (password === typedPassword) {
            user.delete().then(function () {
                console.log("Auth deleted")
            }).then(() => {
                var docs = firestore.collection('services').where('email', '==', email);
                docs.get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        doc.ref.delete();
                    });
                });
            })
                .then(function () {
                    firestore.collection("User").doc(docID).delete()
                        .then(() => {
                            window.location.reload(false);
                            console.error("Account successfully deleted");
                        })
                }).catch((error) => {
                    console.error(error);
                })
        } else {
            MySwal.fire({
                position: 'center',
                imageUrl: 'https://i.ibb.co/R06Zrjb/animation-200-ko7omjl5.gif',
                imageWidth: 100,
                imageHeight: 100,
                text: 'Password is NOT correct',
                width: 400,
                showConfirmButton: true
            })
        }
    }

    handleInputChange = (e) => {
        typedPassword = e.target.value;
    }

    render() {
        return (
            <center className='delete-Dialog' >
                <p style={{ margin: '3px' }}>For your security, please re-enter your password to continue</p>
                <form>
                    <input type='password' placeholder='Password' className='inputForDelete' onChange={this.handleInputChange} />
                    <br />
                    <button className='continue' onClick={this.del}>continue</button>
                </form>
            </center>
        );
    }
}
export default DeleteConfirmationDialog;