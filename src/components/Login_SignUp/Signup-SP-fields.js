import { React, Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../map/Map.css';
import fire from '../config';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
var markerIcon = new L.icon({
    iconUrl: 'https://i.ibb.co/VphkX1M/marker-48.png',
    iconSize: [45, 35],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

var latitude = null;
var longitude = null;
var marker = null;
var loading = false;

class Signup_SP_Fields extends Component {

    state = {
        map: null
    };

    signUp = (e) => {
        e.preventDefault();
        loading = true;
        this.setState({ ...this.setState })
        const name = document.querySelector('#userName').value;
        const email = document.querySelector('#email').value.trim();
        const pass = document.querySelector('#pass').value;
        const phone = document.querySelector('#phone').value;
        const confirmPass = document.querySelector('#confirmPass').value;
        const serviceType = document.querySelector('#serviceType').value;
        const description = document.querySelector('#description').value;
        if (latitude === null || longitude === null) {
            this.alertError("Please choose your location in the map");
            loading = false;
            this.setState({ ...this.setState })
            return;
        }
        if (name.length < 2 || !(pass.match(/[0-9]/g)) || !(pass.match(/[a-z]/g)) || !(pass.match(/[A-Z]/g)) || pass.length < 8) {
            if (name.length < 2)
                this.alertError('name field is required and must be 3 or more characters long!')
            else
                this.alertError('password must be at least 8 characters , at least one capital and one small letter')
            loading = false;
            this.setState({ ...this.setState })
        }
        else if (phone.length < 1 || serviceType.length < 1 || description.length < 1) {
            this.alertError('please fill all fields');
            loading = false;
            this.setState({ ...this.setState })
        }
        else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            this.alertError('this email is invalid');
            loading = false;
            this.setState({ ...this.setState })
        }
        else if (pass === confirmPass) {
            fire.firestore().collection('AccountApproval').add({
                email: email,
                name: name,
                password: pass,
                phone: phone,
                serviceType: serviceType,
                description: description,
                latitude: latitude,
                longitude: longitude,
                numberOfServices: 0,
                type: 'SP',
                path: []
            }).then(() => {
                loading = false;
                this.setState({ ...this.setState })
                this.props.history.push("/");
                MySwal.fire({
                    position: 'center',
                    imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                    imageWidth: 100,
                    imageHeight: 100,
                    text: 'Please wait for an Admin to approve the account :)',
                    width: 400,
                    showConfirmButton: true
                })
            })
        }
        else {
            this.alertError("password does not match");
            loading = false;
            this.setState({ ...this.setState })
        }
    }

    alertError(e) {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/R06Zrjb/animation-200-ko7omjl5.gif',
            imageWidth: 100,
            imageHeight: 100,
            text: e,
            width: 400,
            showConfirmButton: true
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { map } = this.state;
        if (prevState.map !== map && map) {
            map.on("click", function (e) {
                latitude = e.latlng.lat;
                longitude = e.latlng.lng;

                if (marker !== null) {
                    map.removeLayer(marker);
                }
                marker = L.marker([latitude, longitude], { icon: markerIcon })
                    .addTo(map);

                console.log(latitude + " " + longitude)
            });
        }
    }
    render() {
        return (
            <div className="form-container sign-up-container" >
                <div className='scrol-div'>
                    <form className='provider-form' action="#" onSubmit={this.signUp}>
                        <h2 className='h2' >Signup as Service Provider</h2>

                        <input className='input' type="text" placeholder="Name" id="userName" required />
                        <input className='input' type="email" placeholder="Email" id="email" required />
                        <input className='input' type="password" placeholder="Password" id="pass" required />
                        <input className='input' type="password" placeholder="Confirm Password" id="confirmPass" required />
                        <input className='input' type="text" placeholder="Phone" id="phone" required />
                        <input className='input' type="text" placeholder="Service Type" id="serviceType" required />
                        <input className='input' type="text" placeholder="Description" id="description" required />


                        <MapContainer draggable={true} className="leaflet-signup-map"
                            center={[32.313620252850725, 35.02780873501613]} zoom={15} scrollWheelZoom={false}
                            whenCreated={(map) => this.setState({ map })}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>

                        {loading ?
                            <div style={{
                                marginTop: '10px',
                                marginBottom: '10px'
                            }} className="loading-sign" id="loading-sp-signup">LOADING!</div> : null
                        }
                        <button style={{
                            marginBottom: '10px'
                        }}
                            className="bt button" >Sign Up</button>
                    </form></div>
            </div>
        )
    }
}

export default withRouter(Signup_SP_Fields);