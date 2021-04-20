import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { firestore } from '../config';
import L from 'leaflet';

var latitude = 32.313268;
var longitude = 35.022895;
const markers = [];
var deleted = false;

class Map extends Component {

    state = {
        map: null
    };

    componentDidUpdate() {
        const { map } = this.state;

        if (map !== null) {
            map.on('zoomend', function () {
                var currentZoom = map.getZoom();
                if (currentZoom < 16) {
                    markers.forEach((marker) => map.removeLayer(marker));
                    deleted = true;
                } else if (deleted && currentZoom >= 16) {
                    markers.forEach((marker) => map.addLayer(marker));
                    deleted = false;
                }
            });
        }
    }

    displayPlaces() {
        const { map } = this.state;
        if (map !== null) {
            firestore.collection("Places").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const marker = L.marker([doc.data().latitude, doc.data().longitude], {
                        icon: new L.DivIcon({
                            className: 'my-div-icon',
                            iconSize: [5, 5],
                            html: '<p class="my-div-span">' + (doc.data().name) + '</p>'
                        })
                    })
                        .addTo(map);
                    markers.push(marker);
                });
            });
        }
    }

    render() {
        this.displayPlaces();
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