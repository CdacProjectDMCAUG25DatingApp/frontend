    import React, { useState } from "react";

    const Settings = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="settings-container">
        <h1>Settings</h1>    
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("profile")}>
            <h2>Profile</h2>
            <span>{openSection === "profile" ? "▲" : "▼"}</span>
            </div>

            {openSection === "profile" && (
            <div className="section-content">
                <button>Preview Profile</button>
                <button className="verified-btn">Account Verified ✓</button>
            </div>
            )}
        </div>

    
        <div className="section">
            <div
            className="section-header"
            onClick={() => toggleSection("notifications")}
            >
            <h2>Notifications</h2>
            <span>{openSection === "notifications" ? "▲" : "▼"}</span>
            </div>

            {openSection === "notifications" && (
            <div className="section-content">
                <button className="Profile Viewd-btn">Profile Viewd </button>
                <button className="New Likes-btn">New Likes</button>
                <button className="dNew Match-btn">New Match</button>

            </div>
            )}
        </div>

        <div className="section">
            <div className="section-header" onClick={() => toggleSection("account")}>
            <h2>Account</h2>
            <span>{openSection === "account" ? "▲" : "▼"}</span>
            </div>

            {openSection === "account" && (
            <div className="section-content">
                <button className="logout-btn">Logout</button>
                <button className="delete-btn">Delete Account</button>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default Settings;
