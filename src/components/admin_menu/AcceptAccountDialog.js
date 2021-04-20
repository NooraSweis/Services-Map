import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../map/Map.css';
import "../style/AccountApproval.css";
import L from 'leaflet';

var latitude = 32.313268;
var longitude = 35.022895;

var markerIcon = new L.icon({
    iconUrl: 'https://i.ibb.co/VphkX1M/marker-48.png',
    iconSize: [45, 35],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

class ItemDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    render() {
        return (
            <center className="fieldsChange" >
                <form>
                    <MapContainer className="leaflet-approval" center={[this.state.user.latitude ? this.state.user.latitude : latitude, this.state.user.longitude ? this.state.user.longitude : longitude]}
                        zoom={17} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[this.state.user.latitude ? this.state.user.latitude : latitude, this.state.user.longitude ? this.state.user.longitude : longitude]}
                            icon={markerIcon}
                        ></Marker>
                    </MapContainer>
                    <br />
                    <div className="row-item">
                        <div className="approval-dialog-item">Name:</div>
                        <div className="approval-dialog-item" id="approval-dialog-name">{this.state.user.name}</div>
                    </div>
                    <br />
                    <div className="row-item">
                        <div className="approval-dialog-item">Email:</div>
                        <div className="approval-dialog-item" id="approval-dialog-email">{this.state.user.email}</div>
                    </div>
                    <br />
                    <div className="row-item">
                        <div className="approval-dialog-item">Phone:</div>
                        <div className="approval-dialog-item" id="approval-dialog-phone">{this.state.user.phone}</div>
                    </div>
                    <br />
                    <div className="row-item">
                        <div className="approval-dialog-item">Service Type:</div>
                        <div className="approval-dialog-item" id="approval-dialog-type">{this.state.user.serviceType}</div>
                    </div>
                    <br />
                    <div className="row-item">
                        <div className="approval-dialog-item">Description:</div>
                        <div className="approval-dialog-item" id="approval-dialog-description">{this.state.user.description}</div>
                    </div>
                    <br />
                </form>
            </center>
        );
    }
}

export default ItemDialog;