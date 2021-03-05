import React from "react";
import "./style/AddPlace.css";

const AddPlaceCard = () => {
    return (
        <div className="card" style={{
            position: 'absolute', left: '25%', top: '55%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h2>Add Fixed Place</h2>
            <div className="split" id="horiz">
                <div className="left" id="placeNameP">Name of Place:</div>
                <input className="right" id="placeNameTxt"/>
            </div>
            <button className="addBtn">Add</button>
        </div>
    );
}

export default AddPlaceCard;