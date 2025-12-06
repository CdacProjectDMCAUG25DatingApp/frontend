
import "../Home Page Components/src/Styles/Home.css";
import "../Home Page Components/src/Styles/Sidebar.css";
import Sidebar from "../Home Page Components/src/Components/Sidebar.jsx";
import "../Home Page Components/src//Styles/App.css"
import { Outlet } from "react-router";

function Home() {
  return (
  <>
    <div className="app-container">
      <Sidebar />
      <div className="page-container">
      <Outlet />
      </div>
    </div>
  </>
  );
}


export default Home;
