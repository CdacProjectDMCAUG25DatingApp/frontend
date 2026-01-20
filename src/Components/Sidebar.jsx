import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
import { useContext } from "react";
import { UserContext } from "../app/App";

const Sidebar = () => {
  const { user, userDetails } = useContext(UserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="dp-circle">DP</div>
        <p className="username">{user?.name || "Name"}</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/home/people" end className="menu-item">People</NavLink>
        <NavLink to="/home/message" className="menu-item">Message</NavLink>
        <NavLink to="/home/subscribe" className="menu-item">Subscribe</NavLink>

        {/* Send userDetails properly */}
        <NavLink
          to="/home/profileview"
          className="menu-item"
          state={{
            editable: true,
            dataObj: userDetails,
          }}
        >
          Edit Profile
        </NavLink>

        <NavLink to="/home/settings" className="menu-item">Settings</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
