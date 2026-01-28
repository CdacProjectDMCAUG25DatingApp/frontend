import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { utils } from "../utils";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const details = useSelector((state) => state.userDetails.data);
  const photos = useSelector((state) => state.photos.data);

  const [sideInfo, setSideInfo] = useState({
    userName: "",
    userDP: ""
  });

  useEffect(() => {
    const savedName = sessionStorage.getItem("sidebar_name");
    const savedDP = sessionStorage.getItem("sidebar_dp");

    const updatedName = user?.name || savedName || "";
    const updatedDP = photos?.[0]?.photo_url || savedDP || "";

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
          <img src={utils.urlConverter(sideInfo.userDP)} alt="dp" className="dp-img" />
        ) : (
          <div className="dp-circle">
            {(sideInfo.userName || "D").charAt(0).toUpperCase()}
          </div>
        )}

        <p className="username">{sideInfo.userName || "Name"}</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/home/people" className="menu-item">People</NavLink>
        <NavLink to="/home/chathome" className="menu-item">Chat Home</NavLink>

        <NavLink to="/home/profileview" className="menu-item" state={{ editable: true, dataObj: details }}>
          Edit Profile
        </NavLink>

        <NavLink to="/home/likeandmatchespage" className="menu-item">Likes/Matched</NavLink>
        <NavLink to="/home/settings" className="menu-item">Settings</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
