import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import "../Styles/MainLayout.css";
import LiquidEther from "../Components/LiquidEther";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserDetails, loadPhotos } from "../redux/userDetailsThunks";

function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserDetails());
    dispatch(loadPhotos());
  }, []);

  return (
    <div className="app-layout">
      <div className="sidebar">
        <Sidebar />
      </div>

      <main className="page-content">
        <div className="page-inner liquid-ether-container">

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

          <div className="content-overlay" style={{ width: "100%" }}>
            <Outlet />
          </div>

        </div>
      </main>
    </div>
  );
}

export default MainLayout;
