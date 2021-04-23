import React, { Component } from 'react';
import { auth, firestore } from '../config';

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
            alert("Password is NOT correct")
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