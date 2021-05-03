import React, { Component } from 'react';
import "../style/AddPlace.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../map/Map.css';
import L from 'leaflet';
import { firestore } from '../config';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

var latitude = null;
var longitude = null;
var marker = null;
var fixed_place_name = "";
const markers = [];
var deleted = false;
const MySwal = withReactContent(Swal);

class AddPlace extends Component {
    state = {
        map: null
    };

    componentDidUpdate(prevProps, prevState) {
        const { map } = this.state;
        if (prevState.map !== map && map) {
            map.on("click", function (e) {
                latitude = e.latlng.lat;
                longitude = e.latlng.lng;

                if (marker !== null) {
                    map.removeLayer(marker);
                }
                marker = L.marker([latitude, longitude], {
                    icon: new L.DivIcon({
                        className: 'my-div-icon',
                        iconSize: [5, 5],
                        html: '<p class="my-div-span" id="fixed-place-name">' + (fixed_place_name === "" ? 'موقعك' : fixed_place_name) + '</p>'
                    })
                })
                    .addTo(map);
                console.log(latitude + " " + longitude)
            });
        }


        map.on('zoomend', function () {
            var currentZoom = map.getZoom();
            if (currentZoom < 16) {
                if (marker !== null) {
                    map.removeLayer(marker)
                }
                markers.forEach((m) => map.removeLayer(m));
                deleted = true;
            } else if (deleted && currentZoom >= 16) {
                if (marker !== null) {
                    map.addLayer(marker);
                }
                markers.forEach((marker) => map.addLayer(marker));
                deleted = false;
            }
        });

    }

    handleInputChange(event) {
        event.preventDefault();
        fixed_place_name = event.target.value;
    }

    alertError(e) {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/tpNSyYT/location.gif',
            imageWidth: 100,
            imageHeight: 100,
            text: e,
            width: 400,
            showConfirmButton: true
        })
    }

    handleButtonClick = (event) => {
        event.preventDefault();
        if (fixed_place_name === "") {
            this.alertError("Please give a name for our new location")
        } else
            if (latitude === null) {
                this.alertError("PLEASE choose a location")
            } else {
                firestore.collection('Places').add({
                    name: fixed_place_name,
                    latitude: latitude,
                    longitude: longitude
                })
                MySwal.fire({
                    position: 'center',
                    imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                    imageWidth: 50,
                    imageHeight: 50,
                    text: 'DONE!',
                    width: 400,
                    showConfirmButton: false,
                    timer: 1200
                })
            }
    }

    displayPlaces() {
        const { map } = this.state;
        if (map !== null) {
            firestore.collection("Places").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    //console.log(doc.id, " => ", doc.data());
                    const marker = L.marker([doc.data().latitude, doc.data().longitude], {
                        icon: new L.DivIcon({
                            className: 'my-div-icon',
                            iconSize: [5, 5],
                            html: '<p class="my-div-span" id="fixed-place-name">' + (doc.data().name) + '</p>'
                        })
                    })
                        .addTo(map);
                    markers.push(marker);
                });
            });
            console.log(markers)
        }
    }

    render() {
        this.displayPlaces();
        return (
            <div className="split">

                <div className="left">
                    <div className="card">
                        <h2 className="h2">Add Fixed Place</h2>
                        <div id="horiz">
                            <div id="placeNameP">Name of Place:</div>
                            <input className="input1" id="placeNameTxt"
                                onChange={this.handleInputChange} />
                        </div>
                        <button onClick={this.handleButtonClick} className="button" id="addBtn">Add</button>
                    </div>
                </div>

                <div className="right">
                    <MapContainer className="fixed-map" center={[32.313268, 35.022895]} zoom={17} scrollWheelZoom={true}
                        whenCreated={(map) => this.setState({ map })}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </MapContainer>
                </div>
            </div>
        );
    }
}
export default AddPlace;