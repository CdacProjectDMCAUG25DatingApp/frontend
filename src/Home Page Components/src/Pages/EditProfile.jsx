    import React, { useState } from "react";
    import "../Styles/EditProfile.css";

    const EditProfile = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="settings-container">
        <h1>Edit Profile</h1>

        {/* PROFILE PHOTO */}
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("photo")}>
            <h2>Profile Photo</h2>
            <span>{openSection === "photo" ? "▲" : "▼"}</span>
            </div>

            {openSection === "photo" && (
            <div className="section-content">
                <input type="file" accept="image/*" className="file-input" />
                <button className="save-btn">Upload Photo</button>
            </div>
            )}
        </div>

        {/* BASIC DETAILS */}
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("basic")}>
            <h2>Basic Details</h2>
            <span>{openSection === "basic" ? "▲" : "▼"}</span>
            </div>

            {openSection === "basic" && (
            <div className="section-content">
                <input type="text" placeholder="Full Name" className="input-field" />
                <input type="number" placeholder="Age" className="input-field" />
                <input type="text" placeholder="City / Location" className="input-field" />
                <button className="save-btn">Save Changes</button>
            </div>
            )}
        </div>

        {/* BIO */}
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("bio")}>
            <h2>Bio</h2>
            <span>{openSection === "bio" ? "▲" : "▼"}</span>
            </div>

            {openSection === "bio" && (
            <div className="section-content">
                <textarea
                placeholder="Write something about yourself..."
                className="textarea-field"
                ></textarea>
                <button className="save-btn">Update Bio</button>
            </div>
            )}
        </div>

        {/* INTERESTS */}
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("interests")}>
            <h2>Interests</h2>
            <span>{openSection === "interests" ? "▲" : "▼"}</span>
            </div>

            {openSection === "interests" && (
            <div className="section-content interests-container">
                <button className="interest-tag">Music</button>
                <button className="interest-tag">Travel</button>
                <button className="interest-tag">Fitness</button>
                <button className="interest-tag">Movies</button>
                <button className="interest-tag">Cooking</button>
                <button className="interest-tag">Reading</button>
            </div>
            )}
        </div>

        {/* LIFESTYLE */}
        <div className="section">
            <div
            className="section-header"
            onClick={() => toggleSection("lifestyle")}
            >
            <h2>Lifestyle</h2>
            <span>{openSection === "lifestyle" ? "▲" : "▼"}</span>
            </div>

            {openSection === "lifestyle" && (
            <div className="section-content">
                <select className="select-field">
                <option>Smoking: No</option>
                <option>Smoking: Occasionally</option>
                <option>Smoking: Yes</option>
                </select>

                <select className="select-field">
                <option>Drinking: No</option>
                <option>Drinking: Occasionally</option>
                <option>Drinking: Yes</option>
                </select>

                <select className="select-field">
                <option>Looking for: Relationship</option>
                <option>Looking for: Friendship</option>
                <option>Looking for: Casual</option>
                </select>

                <button className="save-btn">Save Lifestyle</button>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default EditProfile;
