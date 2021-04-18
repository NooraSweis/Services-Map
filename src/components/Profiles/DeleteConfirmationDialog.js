import React, { Component } from 'react';
import fire, { firestore } from '../config';

var user = fire.auth().currentUser;
var email = user ? user.email.toString() : "";
var password = "";
var typedPassword = "";
var docID = "";

class DeleteConfirmationDialog extends Component {

    componentDidMount() {
        user = fire.auth().currentUser;
        email = fire.auth().currentUser.email;
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
            }).catch(function (error) {
                console.log(error)
            }).then(function () {
                firestore.collection("User").doc(docID).delete().then(() => {
                    console.error("Account successfully deleted");
                }).then(function () {
                    window.location.reload(false);
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                })
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