import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";


function Sidebar() {
return (
<div className="sidebar">
<div className="sidebar-header">
<div className="dp-circle">DP</div>
<p className="username">Name</p>
</div>


<div className="sidebar-menu">
<Link to="/" className="menu-item">Home</Link>
<Link to="/Message" className="menu-item">Message</Link>
<Link to="/preferences" className="menu-item">Preferences</Link>
<Link to="/subscribe" className="menu-item">Subscribe</Link>
<Link to="/Edit Profile" className="menu-item">Edit Profile</Link>
<Link to="/settings" className="menu-item">Settings</Link>
</div>
</div>
);
}


export default Sidebar;
