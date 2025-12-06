    import React from "react";

    export default function CenterCard() {
    return (
        <div className="center">
        <div className="card">
            <div className="photo">Photo</div>

            <div className="small-dp">DP</div>

            <div className="name-box">Name</div>
        </div>

        <p className="profile-title">Profile</p>

        <div className="action-buttons">
            <button className="icon-btn">❤️</button>
            <button className="icon-btn">✔</button>
        </div>

        <div className="swipe-buttons">
            <button className="swipe-btn">Swipe Left</button>
            <button className="swipe-btn">Swipe Right</button>
        </div>
        </div>
    );
    }
