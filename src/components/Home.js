import React, { Component } from 'react';
import './style/Home.css'
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
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { firestore, auth } from './config';
import { CardContent, Collapse, Menu, MenuItem } from '@material-ui/core';
import { CustomDialog } from "react-st-modal";
import MapDialog from './map/MapDialog';
import UpdatePathDialog from './Profiles/UpdatePathDialog';
import firebase from 'firebase/app';

var userID = "";

class Home extends Component {

    state = {
        items: [],
        search: '',
        latitude: null,
        longitude: null,
        path: []
    }

    componentDidMount() {
        this.getData();
        this.getLocation();
    }

    componentDidUpdate() {
        const user = auth.currentUser;
        if (!user) {
            var elements = document.getElementsByClassName('favIcon');
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.color = "#808080";
            }
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

    getData() {
        if (this.state.items.length === 0) {
            var user = auth.currentUser;
            if (user) {
                firestore.collection("User").where("email", "==", user.email).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        userID = doc.id;
                        this.setState({
                            path: doc.data().path
                        })
                    })
                }).then(() => {
                    console.log(this.state.path)
                })
            }
            firestore.collection("services").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var provider_name = "";
                    var provLat = null, provLng = null;
                    firestore.collection("User").where("email", '==', doc.data().email).get().then((providerSnapshot) => {
                        providerSnapshot.forEach((provider) => {
                            provider_name = provider.data().name;
                            provLat = provider.data().latitude;
                            provLng = provider.data().longitude;
                        })
                    }).then(() => {
                        var isFavorite = false;
                        var favDocID = '';
                        firestore.collection("Favorite")
                            .where("service_ID", '==', doc.id)
                            .where("user_ID", '==', userID)
                            .get().then((favSnapshot) => {
                                isFavorite = !favSnapshot.empty;
                                favSnapshot.forEach((fav) => {
                                    favDocID = fav.id;
                                })
                            })
                            .then(() => {
                                this.setState({
                                    ...this.state,
                                    items: [
                                        ...this.state.items,
                                        {
                                            service_ID: doc.id,
                                            name: doc.data().name,
                                            prov_name: provider_name,
                                            description: doc.data().description,
                                            address: doc.data().address,
                                            phone: doc.data().phone,
                                            email: doc.data().email,
                                            status: doc.data().status,
                                            serviceImg: doc.data().serviceImg,
                                            expand: false,
                                            red: isFavorite,
                                            anchortEl: null,
                                            favDocID: favDocID,
                                            provLat: provLat,
                                            provLng: provLng
                                        }
                                    ]
                                })
                            })
                    })
                });
            })
        }
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

    addToPath(point) {
        console.log(point)
        this.setState({
            ...this.state,
            path: [
                ...this.state.path,
                point
            ]
        })
        firestore.collection("User").doc(userID).update({
            path: firebase.firestore.FieldValue.arrayUnion(point)
        })
    }

    render() {
        return (
            <div>
                <input type='search' placeholder='Search' className='search' id='home-search'
                    onChange={(e) => {
                        this.setState({
                            ...this.state, search: e.target.value.toString()
                        })
                    }} />
                <div className="outerDiv-favorites" >
                    {
                        this.state.items.length !== 0 ?
                            this.state.items.map((item, index) => (
                                (this.state.search === '' || item.name.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) || item.description.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())) ?
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
                                                <ControlPointIcon style={{ color: 'white' }} />
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
                                            <MenuItem onClick={async () => {
                                                console.log(this.state.path)
                                                await CustomDialog(<MapDialog
                                                    points={this.state.path}
                                                    lat={this.state.latitude}
                                                    lng={this.state.longitude}
                                                />, {
                                                    title: 'Routing',
                                                    showCloseIcon: true,
                                                });
                                            }} > View path </MenuItem>
                                            <MenuItem onClick={async () => {
                                                console.log(this.state.path)
                                                const result = await CustomDialog(<UpdatePathDialog
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
                                                    })
                                                }
                                            }
                                            }> Update path </MenuItem>
                                            <MenuItem > Clear path </MenuItem>
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
                                                    if (auth.currentUser) {
                                                        item.red = !item.red;
                                                        this.setState({ ...this.state });
                                                        item.favDocID = this.deleteOrAddToFavorites(item.red, item.service_ID, item.favDocID);
                                                    } else {
                                                        alert("Sign in to add a favorite item!")
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
                                                <CardActions onClick={this.state.latitude ?
                                                    (async () => {
                                                        await CustomDialog(<MapDialog
                                                            points={[
                                                                { lat: this.state.latitude, lng: this.state.longitude },
                                                                { lat: item.provLat, lng: item.provLng }
                                                            ]}
                                                        />, {
                                                            title: 'Routing',
                                                            showCloseIcon: true,
                                                        });
                                                    })
                                                    :
                                                    () => alert("Please allow to access your location")
                                                }>
                                                    <IconButton id='btn' className='button'>Show Path</IconButton>
                                                </CardActions>
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                    : null
                            ))
                            :
                            <div className="no-approval-data" id="no-favorites">
                                <p>PLEASE WAIT...!</p>
                            </div>
                    }
                </div>
            </div >
        );
    }
}

export default Home;