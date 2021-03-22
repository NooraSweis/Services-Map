import React from 'react';
import "../style/AddPlace.css";
import AddPlaceCard from "./AddPlaceCard";
import Map from "../Map";

const AddPlace = () => {
    return (
        <div className="split">
            <div className="left">
                <AddPlaceCard />
            </div>
            <div className="right" id="map">
                <Map />
            </div>
        </div>
    );
}
export default AddPlace;