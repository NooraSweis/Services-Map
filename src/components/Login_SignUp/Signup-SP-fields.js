import { React, Component, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../map/Map.css';

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
    /*
        handleSubmit(e) {
            const { signup } = useAuth();
            const name = document.querySelector('#userName').value;
            const email = document.querySelector('#email').value;
            const pass = document.querySelector('#pass').value;
            const phone = document.querySelector('#phone').value;
            const confirmPass = document.querySelector('#confirmPass').value;
            const serviceType = document.querySelector('#serviceType').value;
            const description = document.querySelector('#description').value;
    
            e.preventDefault();
            if (latitude === null || longitude === null) {
                alert("Please choose your location in the map");
                return;
            }
            signup(name.current.value, email.current.value, pass.current.value, confirmPass.current.value,
                phone.current.value, serviceType.current.value, description.current.value,
                latitude, longitude);
        }
    */
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
                //   alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
            });
        }
    }
    render() {
        return (
            <div className="form-container sign-up-container" >
                <form className='provider-form' action="#">
                    <h2 className='h2' >Signup as Service Provider</h2>

                    <input className='input' type="text" placeholder="Name" id="userName" required />
                    <input className='input' type="email" placeholder="Email" id="email" required />
                    <input className='input' type="password" placeholder="Password" id="pass" required />
                    <input className='input' type="password" placeholder="Confirm Password" id="confirmPass" required />
                    <input className='input' type="text" placeholder="Phone" id="phone" required />
                    <input className='input' type="text" placeholder="Service Type" id="serviceType" required />
                    <input className='input' type="text" placeholder="Description" id="description" required />

                    <br />

                    <MapContainer draggable={true} className="leaflet-signup-map"
                        center={[32.313620252850725, 35.02780873501613]} zoom={15} scrollWheelZoom={false}
                        whenCreated={(map) => this.setState({ map })}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>

                    <button className="bt button" >Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup_SP_Fields;


/*
Map resources:
https://stackoverflow.com/questions/66936155/get-clicked-location-latitude-and-longitude
*/