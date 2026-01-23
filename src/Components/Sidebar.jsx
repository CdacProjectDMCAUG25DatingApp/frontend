import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../app/App";
import { utils } from "../utils";

const Sidebar = () => {
  const { user, userDetails, photos } = useContext(UserContext);
  
  const [sideInfo, setSideInfo] = useState({
    userName: "",
    userDP: ""
  });

  useEffect(() => {
    // Load saved values
    const savedName = sessionStorage.getItem("sidebar_name");
    const savedDP = sessionStorage.getItem("sidebar_dp");

    const updatedName = user?.name || savedName || "";
    const updatedDP = photos?.[0]?.photo_url || savedDP || "";

    // Save to session Storage whenever updated
    if (updatedName) sessionStorage.setItem("sidebar_name", updatedName);
    if (updatedDP) sessionStorage.setItem("sidebar_dp", updatedDP);

    setSideInfo({
      userName: updatedName,
      userDP: updatedDP
    });
  }, [user, photos]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">

        {sideInfo.userDP ? (
          <img
            src={utils.urlConverter(sideInfo.userDP)}
            alt="dp"
            className="dp-img"
          />
        ) : (
          <div className="dp-circle">
            {sideInfo.userName
              ? sideInfo.userName.charAt(0).toUpperCase()
              : "D"}
          </div>
        )}

        <p className="username">{sideInfo.userName || "Name"}</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/home/people" className="menu-item">People</NavLink>
        <NavLink to="/home/chathome" className="menu-item">Chat Home</NavLink>

        <NavLink
          to="/home/profileview"
          className="menu-item"
          state={{ editable: true, dataObj: userDetails }}
        >
          Edit Profile
        </NavLink>

        <NavLink to="/home/likeandmatchespage" className="menu-item">Likes/Matched</NavLink>
        <NavLink to="/home/settings" className="menu-item">Settings</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
