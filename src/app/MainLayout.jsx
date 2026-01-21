import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import "../Styles/MainLayout.css";
import LiquidEther from "../Components/LiquidEther";
import { useContext, useEffect } from "react";
import { UserContext } from "./App";
import axios from "axios";
import config from "../services/config";

const MainLayout = () => {
  const {

    setProfile,
    setPhotos,
    setPreferences,
    setUserDetails
  } = useContext(UserContext);


  const loadDataFresh = async() =>{
     const headers = { token: sessionStorage.getItem("token") };
    // fetch everything for logged-in user
    const [profileRes, photosRes, prefRes, userDetailsRes] = await Promise.all([
      axios.get(config.BASE_URL + "/user/userprofile", { headers }),
      axios.get(config.BASE_URL + "/photos/userphotos", { headers }),
      axios.get(config.BASE_URL + "/user/userpreferences", { headers }),
      axios.get(config.BASE_URL + "/user/userdetails", { headers }),
    ]);
    setProfile(profileRes.data.data[0] || {});
    setPhotos(photosRes.data.data || []);
    setPreferences(prefRes.data.data[0] || {});
    setUserDetails(userDetailsRes.data.data[0] || {});
  }
  useEffect(() => {
    loadDataFresh()
  }, [])

  return (
    <div className="app-layout">
      <div className="sidebar">
        <Sidebar />
      </div>


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
          <div className="content-overlay" style={{width:"100%"}}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
