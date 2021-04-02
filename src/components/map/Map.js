import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { geolocated } from 'react-geolocated';

class Map extends Component {
    render() {
        const DEFAULT_LATITUDE = 32.313268;
        const DEFAULT_LONGITUDE = 35.022895;
        const latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;
        const longitude = this.props.coords ? this.props.coords.longitude : DEFAULT_LONGITUDE;

        return (
            <MapContainer className="leaflet-map" center={[latitude, longitude]} zoom={17} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    !this.props.coords ?
                        <div className="loading">Loading</div>
                        :
                        <Marker position={[latitude, longitude]}>
                            <Popup>
                                Here you are ^_^
                            </Popup>
                        </Marker>
                }
            </MapContainer>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 1000
})(Map);

/*
Resources:
https://www.youtube.com/watch?v=7N2t4zulUVE&ab_channel=CodingwithBasir

You have to install this:
1. npm install react react-dom leaflet
2. npm install react-leaflet
3. npm install -D @types/leaflet
4. install react-geolocated
*/