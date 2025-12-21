import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import "../Styles/MainLayout.css";

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="page-content">
        <div className="page-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
