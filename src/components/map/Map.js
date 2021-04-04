import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const DEFAULT_LATITUDE = 32.313268;
const DEFAULT_LONGITUDE = 35.022895;
var latitude;
var longitude;

class Map extends Component {

    render() {
        latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;
        longitude = this.props.coords ? this.props.coords.longitude : DEFAULT_LONGITUDE;
        console.log(latitude + " " + longitude);

        return (
            <MapContainer className="leaflet-map" center={[latitude, longitude]}
                zoom={17} scrollWheelZoom={false}
                whenCreated={(map) => this.setState({ map })}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        );
    }
}

export default Map;

/*
Resources:
https://www.youtube.com/watch?v=7N2t4zulUVE&ab_channel=CodingwithBasir

You have to install this:
1. npm install react react-dom leaflet
2. npm install react-leaflet
3. npm install -D @types/leaflet
4. install react-geolocated
*/