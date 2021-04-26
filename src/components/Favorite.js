import React, { Component }               from 'react';
import './style/Home.css'
import Card                               from '@material-ui/core/Card';
import CardHeader                         from '@material-ui/core/CardHeader';
import IconButton                         from '@material-ui/core/IconButton';
import MoreVertIcon                       from '@material-ui/icons/MoreVert';
import CardMedia                          from '@material-ui/core/CardMedia';
import CardContent                        from '@material-ui/core/CardContent';
import Typography                         from '@material-ui/core/Typography';
import CardActions                        from '@material-ui/core/CardActions';
import FavoriteIcon                       from '@material-ui/icons/Favorite';
import ExpandMoreIcon                     from '@material-ui/icons/ExpandMore';
import Collapse                           from '@material-ui/core/Collapse';
import Menu                               from '@material-ui/core/Menu';
import MenuItem                           from '@material-ui/core/MenuItem';


import './Login_SignUp/style.css'
import './style/FavouritCard.css';

/*************************** */

export default class Favorite extends Component {

    constructor() {

        super();
        const today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();


        this.state = {
            data: "",
            date: date,
            expanded: false,
            setExpanded: false,
            anchortEl: null,
            setAnchortEl: null,
            open: false,
            red: true,
            color: true,

        }
    }

    componentDidMount = () => {

        fetch('http://localhost:8080/api/Services')
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({ data: json })
            })
    }


    handleExpandClick = (id) => {
        console.log(this.state.expanded)
        this.setState({ expanded: !this.state.expanded })
    };

    FavoritesToggle = (id) => {

        for (var i = 0; i < this.state.data.length; i++) {
            if (id === this.state.data[i].id) {
                this.setState({ color: !this.state.color })
                return
            }
        }

        fetch('http://localhost:8080/api/Favorites/' + id + '/toggle')
            .then((response) => {
                console.log('success')
                this.setState({ red: !this.state.red })
                console.log(this.state.red)
                return response.json()
            }).catch((error) => {
                console.log('error', error);
            })
    }

    handleMoreVert = (event) => {
        this.setState({
            open: !Boolean(this.state.anchortEl),
            setAnchorEl: event.currentTarget
        });
    }

    handleClose = () => {
        this.setState({
            open: Boolean(this.state.anchortEl),
            setAnchorEl: null
        })
    }


    _createCardsUI = () => {

        const cards = [];
        const data = this.state.data;

        const style = this.state.red ? "red" : "green";
        let but_class = this.state.color ? "green" : "red";


        for (var i = 0; i < data.length; i++) {

            cards.push(
                <Card className="root" key={data[i].id}>
                    <CardHeader
                        title={data[i].name}
                        subheader={this.state.date}
                        key={data[i].id}
                        action={
                            <div className='ethar'>
                                <IconButton
                                    aria-owns={this.state.anchortEl ? 'simple-menu' : null}
                                    aria-haspopup='true'
                                    onClick={this.handleMoreVert}>
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu id='simple-menu'
                                    key={data[i].id}
                                    keepMounted
                                    anchorEl={this.state.anchortEl}
                                    open={this.state.open}
                                    onClose={this.handleClose}>

                                    <MenuItem > Add to path </MenuItem>
                                    <MenuItem > View path </MenuItem>
                                    <MenuItem > Update path </MenuItem>
                                    <MenuItem > Clear path </MenuItem>
                                </Menu>
                            </div>
                        }

                    />



                    <CardMedia className='media' key={data[i].id}>
                        <img style={{ width: "85%", height: "300px", margin: '7%' }}
                            src={`${'https://firebasestorage.googleapis.com/v0/b/services-map-306613.appspot.com/o/'}${data[i].serviceImg}${'?alt=media&token=15d6d649-3451-415a-985a-994a33e7a620'}`} alt="SERVICE IMAGE" />
                    </CardMedia>


                    <CardContent key={data[i].id}>
                        <Typography className='description'>
                            {data[i].description}
                        </Typography>
                    </CardContent>



                    <CardActions key={data[i].id}>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon id={but_class} onClick={this.FavoritesToggle.bind(this, data[i].id)} />
                        </IconButton>


                        <IconButton key={data[i].id}>
                            <ExpandMoreIcon onClick={this.handleExpandClick.bind(this, data[i].id)} />
                        </IconButton>
                    </CardActions>


                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>

                        <CardContent key={data[i].id}>
                            <Typography input>Service name: <input className='input' value={data[i].name} /></Typography>
                            <Typography input>Service Provider name: <input className='input' value={data[i].email} /></Typography>
                            <Typography input>Phone: <input className='input' value={data[i].phone} /></Typography>
                            <Typography input>Address: <input className='input' value={data[i].address} /></Typography>
                            <CardActions >
                                <IconButton id='btn' className='button'>Show Path</IconButton>
                            </CardActions>
                        </CardContent>

                    </Collapse>
                </Card>)
        }
        return cards;
    }


    render() {

        return (
            <div>
                {this._createCardsUI()}
            </div>
        )
    }
}
