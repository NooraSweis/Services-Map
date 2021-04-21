import React, { Component } from "react";
import "../style/AccountApproval.css";
import { CustomDialog } from "react-st-modal";
import ItemDialog from "./AcceptAccountDialog";
import { firestore, thirdApp } from '../config';

class AccountApproval extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        this.getData();
    }

    getData() {
        if (this.state.users.length === 0) {
            firestore.collection("AccountApproval").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        users: [...this.state.users,
                        {
                            id: doc.id,
                            name: doc.data().name,
                            email: doc.data().email,
                            password: doc.data().password,
                            phone: doc.data().phone,
                            serviceType: doc.data().serviceType,
                            description: doc.data().description,
                            latitude: doc.data().latitude,
                            longitude: doc.data().longitude,
                            type: doc.data().type
                        }
                        ]
                    })
                })
            });
            console.log(this.state.users);
        }
    }

    render() {
        //this.getData();
        return (
            <div className="outerDiv-approval" >
                {
                    this.state.users.length !== 0 ?
                        this.state.users.map((user, index) => (
                            <div key={index} className="approval-item">
                                <div className="aprroval-item-name" onClick={async () => {
                                    await CustomDialog(<ItemDialog user={user} />, {
                                        title: 'Account Request Information',
                                        showCloseIcon: true,
                                    });
                                }}>{user.name}</div>
                                <button className="aprroval-item-btn" onClick={() => {
                                    thirdApp.auth().createUserWithEmailAndPassword(user.email, user.password).then((u) => {
                                        thirdApp.firestore().collection('User').add({
                                            email: user.email,
                                            name: user.name,
                                            password: user.password,
                                            phone: user.phone,
                                            serviceType: user.serviceType,
                                            description: user.description,
                                            latitude: user.latitude,
                                            longitude: user.longitude,
                                            numberOfServices: 0,
                                            type: 'SP'
                                        })
                                            .then((u) => {
                                                var us = thirdApp.auth().currentUser;
                                                us.sendEmailVerification().then(() => {
                                                    thirdApp.auth().signOut();
                                                }).then(() => {
                                                    // Delete user from approval
                                                    firestore.collection("AccountApproval").doc(user.id).delete().then(() => {
                                                        alert('Email sent for the user')
                                                        console.log("Document successfully deleted!");
                                                    })
                                                        .then(() => {
                                                            this.setState({ users: [] });
                                                        }).catch((error) => {
                                                            console.error("Error removing document: ", error);
                                                        });
                                                })
                                                    .catch((err) => {
                                                        alert(err.toString());
                                                    })
                                            })
                                            .catch((err) => {
                                                alert(err.toString());
                                            });
                                    })
                                        .catch((err) => {
                                            alert(err.toString())
                                        })
                                }}>Accept</button>
                                <button className="reject-item-btn" onClick={() => {
                                    firestore.collection("AccountApproval").doc(user.id).delete().then(() => {
                                        alert('Request deleted')
                                        console.log("Document successfully deleted!");
                                    }).then(() => {
                                        this.setState({ users: [] });
                                    }).catch((e) => {
                                        alert(e);
                                    })
                                }}>Reject</button>
                            </div>
                        ))
                        :
                        <div className="no-approval-data"><p id="no-approval-data-p">WAITING!</p></div>
                }
            </div>
        );
    }
}
export default AccountApproval;