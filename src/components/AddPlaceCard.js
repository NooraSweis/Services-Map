import React from "react";
import "./style/AddPlace.css";

const AddPlaceCard = () => {
    return (
        <div>
            <h3>Add Fixed Place</h3>
            <div className="split">
                <p className="left">Name of Place:</p>
                <textarea className="right" id="placeNameTxt"></textarea>
            </div>
            <button className="addBtn">Add</button>
        </div>
    );
}

export default AddPlaceCard;