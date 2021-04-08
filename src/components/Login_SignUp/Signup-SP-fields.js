import { React, Component, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../map/Map.css';
import fire from '../config';

var markerIcon = new L.icon({
    iconUrl: 'https://i.ibb.co/VphkX1M/marker-48.png',
    iconSize: [45, 35],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

var latitude = null;
var longitude = null;
var marker = null;

class Signup_SP_Fields extends Component {

    state = {
        map: null
    };
    signUp = (e) => {
        e.preventDefault();
        const name = document.querySelector('#userName').value;
        const email = document.querySelector('#email').value.trim();
        const pass = document.querySelector('#pass').value;
        const phone = document.querySelector('#phone').value;
        const confirmPass = document.querySelector('#confirmPass').value;
        const serviceType = document.querySelector('#serviceType').value;
        const description = document.querySelector('#description').value;
        if (latitude === null || longitude === null) {
            alert("Please choose your location in the map");
            return;
        }
        if (pass === confirmPass) {
            fire.auth().createUserWithEmailAndPassword(email, pass).then((u) => {
                fire.firestore().collection('User').add({
                    email: email,
                    name: name,
                    password: pass,
                    phone: phone,
                    serviceType: serviceType,
                    description: description,
                    latitude: latitude,
                    longitude: longitude,
                    type: 'service-provider'
                })
                    .then((u) => {
                        var user = fire.auth().currentUser;
                        user.sendEmailVerification().then(() => {
                            alert('please check your email')
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
        }
        else {
            alert("password does not match");
        }
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

                        <button className="bt button" >Sign Up</button>
                    </form></div>
            </div>
        )
    }
}

export default Signup_SP_Fields;


/*
Map resources:
https://stackoverflow.com/questions/66936155/get-clicked-location-latitude-and-longitude
*/