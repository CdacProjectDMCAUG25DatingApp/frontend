import React from "react";


import "../Styles/RightPanel";
import RightPanel from './RightPanel';
export default function RightPanel() {
  return (
    <div className="right-panel">
      <div className="header">
        <div>Likes</div>
        <div>Matches</div>
      </div>

      <div className="lists">
        <div className="dots">•<br />•<br />•<br />•</div>
        <div className="dots">•<br />•<br />•<br />•</div>
      </div>
    </div>
  );
}
