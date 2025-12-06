import React, { useState } from "react";
import "../Styles/Preferences.css";

const Preferences = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="settings-container">
      <h1>Preferences</h1>

      {/* Gender Preference */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection("gender")}>
          <h2>Gender Preference</h2>
          <span>{openSection === "gender" ? "▲" : "▼"}</span>
        </div>

        {openSection === "gender" && (
          <div className="section-content">
            <button className="pref-btn">Men</button>
            <button className="pref-btn">Women</button>
            <button className="pref-btn">Everyone</button>
          </div>
        )}
      </div>

      {/* Age Range */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection("age")}>
          <h2>Age Range</h2>
          <span>{openSection === "age" ? "▲" : "▼"}</span>
        </div>

        {openSection === "age" && (
          <div className="section-content range-wrapper">
            <label>18 - 50+</label>
            <input type="range" min="18" max="50" className="range-slider" />
          </div>
        )}
      </div>

      {/* Distance */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection("distance")}>
          <h2>Distance</h2>
          <span>{openSection === "distance" ? "▲" : "▼"}</span>
        </div>

        {openSection === "distance" && (
          <div className="section-content range-wrapper">
            <label>0 - 100 km</label>
            <input type="range" min="1" max="100" className="range-slider" />
          </div>
        )}
      </div>

      {/* Interests */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection("interests")}>
          <h2>Interests</h2>
          <span>{openSection === "interests" ? "▲" : "▼"}</span>
        </div>

        {openSection === "interests" && (
          <div className="section-content interests-container">
            <button className="interest-tag">Fitness</button>
            <button className="interest-tag">Travel</button>
            <button className="interest-tag">Music</button>
            <button className="interest-tag">Movies</button>
            <button className="interest-tag">Cooking</button>
            <button className="interest-tag">Reading</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preferences;
