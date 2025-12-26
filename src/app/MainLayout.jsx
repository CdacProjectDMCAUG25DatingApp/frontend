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
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
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
