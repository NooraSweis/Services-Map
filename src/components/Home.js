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
import EditLocationRounded from '@material-ui/icons/EditLocationRounded';
import { firestore, auth } from './config';
import { CardContent, Collapse, Menu, MenuItem } from '@material-ui/core';
import { connect } from "react-redux";
import { CustomDialog } from "react-st-modal";
import MapDialog from './map/MapDialog';
import UpdatePathDialog from './Profiles/UpdatePathDialog';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import L from 'leaflet';
import lottie from 'lottie-web';

var userID = "";
const MySwal = withReactContent(Swal);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            search: '',
            second: '',
            latitude: null,
            longitude: null,
            path: [],
            recommendation: [],
            union: []
        }
        this.addToHistory = this.addToHistory.bind(this);
    }

    componentDidMount() {
        this.getLocation();
        this.getData();
    }

    componentDidUpdate() {
        const user = auth.currentUser;
        if (!user) {
            var elements = document.getElementsByClassName('favIcon');
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.color = "#808080";
            }
        }

        lottie.loadAnimation({
            container: document.querySelector("#no-home-data"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../loading.json')
        })
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
                    firestore.collection('history')
                        .where('userID', '==', userID).get().then((snap) => {
                            snap.forEach((doc) => {
                                firestore.collection('services').get().then((serviceData) => {
                                    serviceData.forEach((service) => {
                                        if (service.data().name.toString().toLowerCase().includes(doc.data().search.toString().toLowerCase())
                                            || service.data().description.toString().toLowerCase().includes(doc.data().search.toString().toLowerCase())) {
                                            var provider_name = "";
                                            var provLat = null, provLng = null, distance = null;
                                            firestore.collection("User").where("email", '==', service.data().email).get().then((providerSnapshot) => {
                                                providerSnapshot.forEach((provider) => {
                                                    provider_name = provider.data().name;
                                                    provLat = provider.data().latitude;
                                                    provLng = provider.data().longitude;
                                                })
                                            })
                                                .then(() => {
                                                    if (this.state.latitude) {
                                                        let y = provLat - this.state.latitude;
                                                        let x = provLng - this.state.longitude;
                                                        distance = Math.sqrt(x * x + y * y);
                                                    }
                                                })
                                                .then(() => {
                                                    var isFavorite = false;
                                                    var favDocID = '';
                                                    firestore.collection("Favorite")
                                                        .where("service_ID", '==', service.id)
                                                        .where("user_ID", '==', userID)
                                                        .get().then((favSnapshot) => {
                                                            isFavorite = !favSnapshot.empty;
                                                            favSnapshot.forEach((fav) => {
                                                                favDocID = fav.id;
                                                            })
                                                        }).then(() => {

                                                            this.setState({
                                                                ...this.state,
                                                                recommendation: [...this.state.recommendation, {
                                                                    service_ID: service.id,
                                                                    name: service.data().name,
                                                                    prov_name: provider_name,
                                                                    description: service.data().description,
                                                                    address: service.data().address,
                                                                    phone: service.data().phone,
                                                                    email: service.data().email,
                                                                    status: service.data().status,
                                                                    serviceImg: service.data().serviceImg,
                                                                    expand: false,
                                                                    red: isFavorite,
                                                                    anchortEl: null,
                                                                    favDocID: favDocID,
                                                                    provLat: provLat,
                                                                    provLng: provLng,
                                                                    distance: distance
                                                                }]
                                                            })
                                                            this.sortRecommendation();
                                                        })
                                                })
                                        }
                                    })
                                })
                            })
                        })
                })
            }
            firestore.collection("services").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var provider_name = "";
                    var provLat = null, provLng = null, distance = null;
                    firestore.collection("User").where("email", '==', doc.data().email).get().then((providerSnapshot) => {
                        providerSnapshot.forEach((provider) => {
                            provider_name = provider.data().name;
                            provLat = provider.data().latitude;
                            provLng = provider.data().longitude;
                        })
                    })
                        .then(() => {
                            if (this.state.latitude) {
                                let y = provLat - this.state.latitude;
                                let x = provLng - this.state.longitude;
                                distance = Math.sqrt(x * x + y * y);
                            }
                        })
                        .then(() => {
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
                                                provLng: provLng,
                                                distance: distance
                                            }
                                        ]
                                    })
                                    this.sortRecommendation();
                                })
                        })
                })
            })
        }
    }

    /*sortItems = () => {
        let items = this.state.items;
        items.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
       // this.setState({...this.state,union:[...recommendation,...items]})
    }*/
    sortRecommendation = () => {
        //let recommendation=this.state.recommendation;
        this.setState({ ...this.state, recommendation: this.state.recommendation.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0)) })
        this.setState({ ...this.state, items: this.state.items.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0)) })
        const merged = [...this.state.recommendation, ...this.state.items];
        let set = new Set();
        let unionArray = merged.filter(item => {
            if (!set.has(item.service_ID)) {
                set.add(item.service_ID);
                return true;
            }
            return false;
        }, set);
        this.setState({ ...this.state, union: unionArray })
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

    addToHistory = () => {
        if (this.state.search !== "") {
            let arr = this.state.search.split(" ");
            firestore.collection('history').where('userID', '==', userID).get().then((snap) => {
                snap.forEach((doc) => {
                    for (let i = 0; i < arr.length; i++) {
                        if (doc.data().search.includes(arr[i])) {
                            // remove element from arr
                            arr.splice(i, 1);
                            i--;
                        }
                    }
                })
            }).then(() => {
                this.setState({
                    ...this.state,
                    search: ''
                })
            }).then(() => {
                for (let i = 0; i < arr.length; i++) {
                    firestore.collection('history').add({
                        userID: userID,
                        search: arr[i]
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    addToPath = (point) => {
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

    signAlert() {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/NSZzpw2/no.gif',
            imageWidth: 300,
            imageHeight: 200,
            title: 'Sign in to find more!',
            showConfirmButton: false,
            timer: 2400
        })
    }

    render() {
        return (
            <div style={{ paddingBottom: '60px', overflow: 'hidden' }}>
                <input type='search' placeholder='Search' className='search' id='home-search'
                    onChange={(e) => {
                        this.setState({
                            ...this.state, search: e.target.value.toString(), second: 0
                        })
                        this.myInterval = setInterval(() => {
                            this.setState({ ...this.state, second: this.state.second + 1 });
                            if (this.state.second === 5 && this.props.isLoggedIn && this.state.search !== '') {
                                this.addToHistory();
                            }
                        }, 1000)
                    }}
                    onBlur={(e) => {
                        if (this.props.isLoggedIn && this.state.search !== '') {
                            this.addToHistory();
                        }
                    }}
                />
                <div className="outerDiv-favorites" >
                    {this.state.union.length !== 0 ?
                        this.state.union.map((item, index) => (
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
                                                    item.favDocID = this.deleteOrAddToFavorites(item.red, item.service_ID, item.favDocID);
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
                                : null
                        ))
                        :
                        <div className="no-approval-data" id="no-home-data">
                        </div>
                    }
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
    };
}
export default connect(mapStateToProps)(Home);