import React from 'react';
import "../style/AddPlace.css";
import AddPlaceCard from "./AddPlaceCard";
import Map from "../map/FixedMap";

const AddPlace = () => {
    return (
        <div className="split">
            <div className="left">
                <AddPlaceCard />
            </div>
            <div className="right">
                <Map />
            </div>
        </div>
    );
}
export default AddPlace;