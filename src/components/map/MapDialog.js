import './Map.css';
import 'leaflet/dist/leaflet.css';
import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const startIcon = new L.icon({
    iconUrl: 'https://i.ibb.co/VphkX1M/marker-48.png',
    //  iconAnchor: [12, 45],
    popupAnchor: [0, -35],
    iconSize: [40, 40]
});
const targetIcon = new L.icon({
    iconUrl: 'https://i.ibb.co/0qJLWFR/marker.png',
    //  iconAnchor: [12, 45],
    popupAnchor: [0, -35],
    iconSize: [40, 40]
});

var myWayPoints = [];
class MapDialog extends Component {
    state = {
        map: null
    };

    componentDidMount() {
        for (let i = 0; i < this.props.points.length; i++) {
            myWayPoints.push(L.latLng(this.props.points[i].lat, this.props.points[i].lng))
        }
        this.props.points.unshift({ lat: this.props.lat, lng: this.props.lng })
    }
    componentDidUpdate() {
        const { map } = this.state;
        if (map && this.props.points[0]) {
            L.marker([this.props.points[0].lat, this.props.points[0].lng], { icon: startIcon })
                .addTo(map);
            for (let i = 1; i < this.props.points.length; i++) {
                L.marker([this.props.points[i].lat, this.props.points[i].lng], { icon: targetIcon })
                    .addTo(map);
            }
            L.Routing.control({
                createMarker: function () { return null; },
                waypoints: myWayPoints
            }).addTo(map);
        }
    }
    render() {
        return (
            <center>
                <MapContainer className="leaflet-home" center={[this.props.lat, this.props.lng]}
                    zoom={15} scrollWheelZoom={false}
                    whenCreated={(map) => this.setState({ map })}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </center >
        );
    }
}
export default MapDialog;