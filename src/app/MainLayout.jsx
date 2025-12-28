import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import "../Styles/MainLayout.css";
import LiquidEther from "../Components/LiquidEther";

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="page-content">
        <div className="page-inner liquid-ether-container">
          {/* Background */}
          <div className="ether-bg">
          <LiquidEther
            colors={['#e1b1a8', '#f2b5e2', '#e6e4ec']}
            mouseForce={50}
            cursorSize={25}
            isViscous={true}
            viscous={30}
            iterationsViscous={16}
            iterationsPoisson={16}
            resolution={0.5}
            isBounce={false}
            autoDemo={false}
            autoSpeed={0}
            autoIntensity={0}
            takeoverDuration={0}
            autoResumeDelay={1000}
            autoRampDuration={0}
            pressure={20}
          />
          </div>

          {/* Foreground content */}
          <div className="content-overlay">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
