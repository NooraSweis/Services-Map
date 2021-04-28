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
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { firestore, auth } from './config';
import { CardContent, Collapse, Grid, Menu, MenuItem } from '@material-ui/core';

var userID = "";

export default class Favorite extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        if (this.state.items.length === 0) {
            var user = auth.currentUser;
            firestore.collection("User").where("email", "==", user.email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    userID = doc.id;
                })
            }).then(() => {
                firestore.collection("Favorite").where("user_ID", "==", userID.toString()).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var docID = doc.id;
                        firestore.collection("services").doc(doc.data().service_ID).get().then((item) => {
                            var provider_name = "";
                            firestore.collection("User").where("email", '==', item.data().email).get().then((providerSnapshot) => {
                                providerSnapshot.forEach((provider) => {
                                    provider_name = provider.data().name;
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
                                            anchortEl: null
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

    deleteOrAddToFavorites(red, sID, uID, docID) {
        if (red) {
            firestore.collection("Favorite").doc(docID).set({
                service_ID: sID,
                user_ID: uID
            })
        } else {
            firestore.collection("Favorite").doc(docID).delete();
        }
    }

    render() {
        return (
            <div className="outerDiv-favorites" >
                {
                    this.state.items.length !== 0 ?
                        this.state.items.map((item, i) => (
                            <Grid>
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
                                                this.deleteOrAddToFavorites(item.red, item.service_ID, item.user_ID, item.docID);
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
                            </Grid>
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