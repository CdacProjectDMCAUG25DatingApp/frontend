    import React, { useState } from "react";

    const Subscribe = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="settings-container">
        <h1>Subscription</h1>

        {/* Premium Plans */}
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("plans")}>
            <h2>Premium Plans</h2>
            <span>{openSection === "plans" ? "▲" : "▼"}</span>
            </div>

            {openSection === "plans" && (
            <div className="section-content">
                <button className="plan-btn">Gold Plan – ₹999 / month</button>
                <button className="plan-btn">Diamond Plan – ₹1499 / month</button>
                <button className="plan-btn">Premium+ – ₹1999 / month</button>
            </div>
            )}
        </div>

        {/* Boosts */}
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("boosts")}>
            <h2>Boosts</h2>
            <span>{openSection === "boosts" ? "▲" : "▼"}</span>
            </div>

            {openSection === "boosts" && (
            <div className="section-content">
                <button className="boost-btn">1 Boost – ₹199</button>
                <button className="boost-btn">5 Boosts – ₹799</button>
                <button className="boost-btn">10 Boosts – ₹1299</button>
            </div>
            )}
        </div>

        {/* Super Likes */}
        <div className="section">
            <div className="section-header" onClick={() => toggleSection("superLikes")}>
            <h2>Super Likes</h2>
            <span>{openSection === "superLikes" ? "▲" : "▼"}</span>
            </div>

            {openSection === "superLikes" && (
            <div className="section-content">
                <button className="superlike-btn">3 Super Likes – ₹249</button>
                <button className="superlike-btn">10 Super Likes – ₹699</button>
                <button className="superlike-btn">20 Super Likes – ₹1199</button>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default Subscribe;
