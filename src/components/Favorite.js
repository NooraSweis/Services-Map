import React, { Component } from 'react';
import './style/Home.css';
import './Login_SignUp/style.css';
import './style/FavouritCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import { firestore, auth } from './config';
import { CardContent, Collapse, Grid } from '@material-ui/core';

var userID = "";

export default class Favorite extends Component {

    state = {
        items: [],
        anchortEl: null,
        expand: false
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
            firestore.collection("User").where("email", "==", user.email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    userID = doc.id;
                })
            }).then(() => {
                console.log(userID);
                firestore.collection("Favorite").where("user_ID", "==", userID.toString()).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data().service_ID)
                        firestore.collection("services").doc(doc.data().service_ID).get().then((item) => {
                            this.setState({
                                ...this.state,
                                items: [
                                    ...this.state.items,
                                    {
                                        name: item.data().name,
                                        description: item.data().description,
                                        address: item.data().address,
                                        phone: item.data().phone,
                                        email: item.data().email,
                                        status: item.data().status,
                                        serviceImg: item.data().serviceImg
                                    }
                                ]
                            })
                        })
                    })
                });
            }).then(() => {
                console.log(this.state.items)
            })
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
                                    <CardMedia className='media' key="media">
                                        <img style={{ width: "100%", height: "150px" }}
                                            src={"https://firebasestorage.googleapis.com/v0/b/services-map-306613.appspot.com/o/" + item.serviceImg + "?alt=media&token=15d6d649-3451-415a-985a-994a33e7a620"}
                                            alt="SERVICE"
                                        />
                                    </CardMedia>

                                    <div
                                        className="card-header"
                                        key={item.name}
                                    >{item.name}</div>

                                    <CardActions key="action"
                                        style={{ padding: '0' }}
                                        className="card-actions"
                                    >
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                this.setState({
                                                    ...this.state,
                                                    expand: !this.state.expand
                                                })
                                            }}>
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>

                                    <Collapse in={this.state.expand} timeout="auto"
                                        unmountOnExit key="collapse">
                                        <CardContent key="content">
                                            <div>{item.description}</div>
                                            <div><EmailIcon style={{ marginLeft: '5px' }} />
                                                <div>{item.email} </div>
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
                        <div className="no-approval-data"><p>WAITING!</p></div>
                }
            </div>
        )
    }
}

/*
                                <CardContent key={i}>
                                    <Typography className='description'>
                                        {item.description}
                                    </Typography>
                                </CardContent>
*/

/*
                                        action={
                                            <div className='ethar'>
                                                <IconButton
                                                    aria-owns={this.state.anchortEl ? 'simple-menu' : null}
                                                    aria-haspopup='true'
                                                    onClick={(event) => {
                                                        this.setState({
                                                            ...this.state,
                                                            anchortEl: event.currentTarget
                                                        })
                                                    }}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>

                                                <Menu id='simple-menu'
                                                    keepMounted
                                                    anchorEl={this.state.anchortEl}
                                                    open={Boolean(this.state.anchortEl)}
                                                    onClick={() => {
                                                        this.setState({
                                                            ...this.state,
                                                            anchorEl: null,
                                                            open: false
                                                        })
                                                    }}>
                                                    <MenuItem > Add to path </MenuItem>
                                                    <MenuItem > View path </MenuItem>
                                                    <MenuItem > Update path </MenuItem>
                                                    <MenuItem > Clear path </MenuItem>
                                                </Menu>
                                            </div>
                                        }
                                        */