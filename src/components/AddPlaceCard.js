import React from "react";
import "./style/AddPlace.css";

const AddPlaceCard = () => {
    return (
        <div className="card">
            <h2 className="h2">Add Fixed Place</h2>
            <div id="horiz">
                <div id="placeNameP">Name of Place:</div>
                <input className="input" id="placeNameTxt" />
            </div>
            <button className="button" id="addBtn">Add</button>
        </div>
    );
}

export default AddPlaceCard;