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

var userID = "";

class Home extends Component {

    state = {
        items: [],
        search: ''
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    getData() {
        if (this.state.items.length === 0) {
            var user = auth.currentUser;
            if (user) {
                firestore.collection("User").where("email", "==", user.email).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        userID = doc.id;
                    })
                })
            }
            firestore.collection("services").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var provider_name = "";
                    firestore.collection("User").where("email", '==', doc.data().email).get().then((providerSnapshot) => {
                        providerSnapshot.forEach((provider) => {
                            provider_name = provider.data().name;
                            console.log(provider_name);
                        })
                    }).then(() => {
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
                                    red: false,
                                    anchortEl: null,
                                    favDocID: ''
                                }
                            ]
                        })
                    })
                });
            }).then(() => {
                console.log(this.state.items)
            })
        }
    }

    deleteOrAddToFavorites(red, sID, docID) {
        console.log(red + " " + sID + " " + userID + " " + docID);
        if (docID === '') {

        }
        if (red) {
            firestore.collection("Favorite").doc(docID).set({
                service_ID: sID,
                user_ID: userID
            })
        } else {
            firestore.collection("Favorite").doc(docID).delete();
        }
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
                            this.state.items.map((item, i) => (
                                (this.state.search === '' || item.name.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) || item.description.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())) ?
                                    <Card className="root" key={i}>
                                        <CardMedia style={{ position: 'relative' }}
                                            className='media' key="media">
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
                                            <MenuItem > Add to path </MenuItem>
                                            <MenuItem > View path </MenuItem>
                                            <MenuItem > Update path </MenuItem>
                                            <MenuItem > Clear path </MenuItem>
                                        </Menu>
                                        <div
                                            className="card-header"
                                            key={item.name}
                                            style={{ fontSize: '1.2rem' }}
                                        >{item.name}</div>

                                        <CardActions key="action"
                                            className="card-actions"
                                            style={{ padding: '0 0 5px 0' }}
                                        >
                                            <IconButton aria-label="add to favorites"
                                                onClick={() => {
                                                    item.red = !item.red;
                                                    this.setState({ ...this.state });
                                                    this.deleteOrAddToFavorites(item.red, item.service_ID, item.favDocID);
                                                }}
                                            >
                                                <FavoriteIcon style={{ color: item.red ? 'red' : '#808080' }} />
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
                                            unmountOnExit key="collapse">
                                            <CardContent key="content">
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
                                                <CardActions >
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