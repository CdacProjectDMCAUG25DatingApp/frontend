import React from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router";


function Sidebar() {
return (
<div className="sidebar">
<div className="sidebar-header">
<div className="dp-circle">DP</div>
<p className="username">Name</p>
</div>

<div className="sidebar-menu">
<Link to="/home" className="menu-item">Home</Link>
<Link to="/home/message" className="menu-item">Message</Link>
<Link to="/home/preferences" className="menu-item">Preferences</Link>
<Link to="/home/subscribe" className="menu-item">Subscribe</Link>
<Link to="/home/EditProfile" className="menu-item">Edit Profile</Link>
<Link to="/home/settings" className="menu-item">Settings</Link>
</div>
</div>
);
}


export default Sidebar;
