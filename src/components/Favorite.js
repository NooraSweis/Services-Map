import React, { Component } from 'react';
import './style/Home.css';
import './Login_SignUp/style.css';
import './style/FavouritCard.css';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import CallIcon from '@material-ui/icons/Call';
import EditLocationRounded from '@material-ui/icons/EditLocationRounded';
import { firestore, auth } from './config';
import { CardContent, Collapse, Menu, MenuItem } from '@material-ui/core';
import { CustomDialog } from "react-st-modal";
import MapDialog from './map/MapDialog';
import UpdatePathDialog from './Profiles/UpdatePathDialog';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import L from 'leaflet';

var userID = "";
const MySwal = withReactContent(Swal);

export default class Favorite extends Component {

    state = {
        items: [],
        latitude: null,
        longitude: null,
        path: []
    }

    componentDidMount() {
        this.getLocation();
        this.getData();
    }

    getData() {
        if (this.state.items.length === 0) {
            var user = auth.currentUser;
            firestore.collection("User").where("email", "==", user.email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    userID = doc.id;
                    this.setState({
                        path: doc.data().path
                    })
                })
            }).then(() => {
                firestore.collection("Favorite").where("user_ID", "==", userID.toString()).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var docID = doc.id;
                        firestore.collection("services").doc(doc.data().service_ID).get().then((item) => {
                            var provider_name = "";
                            var provLat = null, provLng = null;
                            firestore.collection("User").where("email", '==', item.data().email).get().then((providerSnapshot) => {
                                providerSnapshot.forEach((provider) => {
                                    provider_name = provider.data().name;
                                    provLat = provider.data().latitude;
                                    provLng = provider.data().longitude;
                                })
                            }).then(() => {
                                this.setState({
                                    ...this.state,
                                    items: [
                                        ...this.state.items,
                                        {
                                            docID: docID,
                                            service_ID: item.id,
                                            user_ID: userID,
                                            prov_name: provider_name,
                                            name: item.data().name,
                                            description: item.data().description,
                                            address: item.data().address,
                                            phone: item.data().phone,
                                            email: item.data().email,
                                            status: item.data().status,
                                            serviceImg: item.data().serviceImg,
                                            expand: false,
                                            red: true,
                                            anchortEl: null,
                                            provLat: provLat,
                                            provLng: provLng
                                        }
                                    ]
                                })
                            })
                        })
                    })
                });
            })
        }
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    showPosition = (position) => {
        this.setState({
            ...this.state,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        console.log("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
    }

    deleteOrAddToFavorites(red, sID, docID) {
        if (red) {
            (docID) ?
                firestore.collection("Favorite").doc(docID).set({
                    service_ID: sID,
                    user_ID: userID
                }).then(() => {
                    return docID;
                })
                :
                firestore.collection("Favorite").add({
                    service_ID: sID,
                    user_ID: userID
                }).then((doc) => {
                    return doc.id;
                })
        } else {
            firestore.collection("Favorite").doc(docID).delete().then(() => {
                return docID;
            });
        }
    }

    addToPath = (point) => {
        console.log(point)
        if (userID) {
            var ref = firestore.collection("User").doc(userID + "");
            ref.update({
                path: firebase.firestore.FieldValue.arrayUnion(point)
            }).then(() => {
                this.setState({
                    ...this.state,
                    path: [
                        ...this.state.path,
                        point
                    ]
                })
            }).then(() => {
                MySwal.fire({
                    position: 'center',
                    imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                    imageWidth: 50,
                    imageHeight: 50,
                    text: 'Added',
                    width: 400,
                    showConfirmButton: false,
                    timer: 1200
                })
            })
        } else {
            this.signAlert();
        }
    }

    updatePath() {
        if (userID) {
            const result = CustomDialog(<UpdatePathDialog
                points={this.state.path}
                userID={userID}
            />, {
                title: 'UPDATE PATH',
                showCloseIcon: true,
            })
            if (result) {
                this.setState({
                    ...this.state,
                    path: result
                }, () => {
                    this.forceUpdate();
                });
            }
        } else {
            this.signAlert();
        }
    }

    clearPath() {
        if (userID) {
            firestore.collection("User").doc(userID).update({
                path: []
            }).then(() => {
                this.setState({
                    ...this.state,
                    path: []
                })
            }).then(() => {
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your path is EMPTY now!',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        } else {
            this.signAlert();
        }
    }

    showPath(item) {
        let p = [];
        for (let i = 0; i < this.state.path.length; i++) {
            p[i] = L.latLng(this.state.path[i].lat, this.state.path[i].lng);
        }
        this.state.latitude ?
            CustomDialog(<MapDialog
                points={
                    item ?
                        [L.latLng(item.provLat, item.provLng)]
                        :
                        p
                }
                lat={this.state.latitude}
                lng={this.state.longitude}
            />, {
                title: 'Routing',
                showCloseIcon: true,
            })
            :
            MySwal.fire({
                position: 'center',
                imageUrl: 'https://i.ibb.co/R06Zrjb/animation-200-ko7omjl5.gif',
                imageWidth: 100,
                imageHeight: 100,
                title: 'Please allow to access your location!',
                showConfirmButton: false,
                timer: 3000
            })
    }

    render() {
        return (
            <div className="outerDiv-favorites" >
                {
                    this.state.items.length !== 0 ?
                        this.state.items.map((item, index) => (
                            <Card className="root" key={index}>
                                <CardMedia style={{ position: 'relative' }}
                                    className='media'>
                                    <img style={{ width: "100%", height: "150px", zIndex: '-1' }}
                                        src={"https://firebasestorage.googleapis.com/v0/b/services-map-306613.appspot.com/o/" + item.serviceImg + "?alt=media&token=15d6d649-3451-415a-985a-994a33e7a620"}
                                        alt="SERVICE"
                                    />
                                    <IconButton
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0'
                                        }}
                                        aria-owns={item.anchortEl ? 'simple-menu' : null}
                                        aria-haspopup='true'
                                        onClick={(event) => {
                                            item.anchortEl = event.currentTarget;
                                            this.setState({
                                                ...this.state
                                            })
                                        }}
                                    >
                                        <EditLocationRounded
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                borderRadius: '50%',
                                                padding: '4px'
                                            }} />
                                    </IconButton>
                                </CardMedia>

                                <Menu id='simple-menu'
                                    keepMounted
                                    anchorEl={item.anchortEl}
                                    open={Boolean(item.anchortEl)}
                                    onClick={() => {
                                        item.anchortEl = null;
                                        this.setState({
                                            ...this.state,
                                            open: false
                                        })
                                    }}>
                                    <MenuItem onClick={() => {
                                        this.addToPath(
                                            { lat: item.provLat, lng: item.provLng, name: item.name }
                                        )
                                    }}> Add to path </MenuItem>
                                    <MenuItem onClick={() => { this.showPath() }} > View path </MenuItem>
                                    <MenuItem onClick={() => { this.updatePath() }}
                                    > Update path </MenuItem>
                                    <MenuItem onClick={() => { this.clearPath() }}> Clear path </MenuItem>
                                </Menu>
                                <div
                                    className="card-header"
                                    style={{ fontSize: '1.2rem' }}
                                >{item.name}</div>

                                <CardActions
                                    className="card-actions"
                                    style={{ padding: '0 0 5px 0' }}
                                >
                                    <IconButton aria-label="add to favorites"
                                        onClick={() => {
                                            if (userID) {
                                                item.red = !item.red;
                                                this.setState({ ...this.state });
                                                item.docID = this.deleteOrAddToFavorites(item.red, item.service_ID, item.docID);
                                            } else {
                                                this.signAlert();
                                            }
                                        }}
                                    >
                                        <FavoriteIcon className="favIcon" style={{ color: item.red ? 'red' : '#808080' }} />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            item.expand = !item.expand;
                                            this.setState({
                                                ...this.state
                                            })
                                        }}>
                                        {item.expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </CardActions>

                                <Collapse in={item.expand} timeout="auto"
                                    unmountOnExit>
                                    <CardContent>
                                        <div>{item.description}</div>
                                        <div><PeopleIcon style={{ marginLeft: '5px' }} />
                                            <div>{item.prov_name} </div>
                                        </div>
                                        <div><CallIcon style={{ marginLeft: '5px' }} />
                                            <div>{item.phone} </div>
                                        </div>
                                        <div><BusinessIcon style={{ marginLeft: '5divx' }} />
                                            <div>{item.address} </div>
                                        </div>
                                        <CardActions onClick={() => { this.showPath(item) }}>
                                            <IconButton id='btn' className='button'>Show Path</IconButton>
                                        </CardActions>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        ))
                        :
                        <div className="no-approval-data" id="no-favorites">
                            <p>Do you have favorite items?<br />PLEASE WAIT...!</p>
                        </div>
                }
            </div>
        )
    }
}