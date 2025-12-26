import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="dp-circle">DP</div>
        <p className="username">Name</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/home/people" end className="menu-item">
          People
        </NavLink>
        <NavLink to="/home/message" className="menu-item">
          Message
        </NavLink>
        <NavLink to="/home/preferences" className="menu-item">
          Preferences
        </NavLink>
        <NavLink to="/home/subscribe" className="menu-item">
          Subscribe
        </NavLink>
        <NavLink to="/home/editprofile" className="menu-item">
          Edit Profile
        </NavLink>
        <NavLink to="/home/settings" className="menu-item">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
