import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProfile from "../pages/CreateProfile";
import AddPhotos from "../pages/AddPhotos";
import UserPreferences from "../pages/UserPreferences";

import Message from "../Home Page Components/src/Pages/Message";
import Settings from "../Home Page Components/src/Pages/Settings";
import Subscribe from "../Home Page Components/src/Pages/Subscribe";

import MainLayout from "./MainLayout";
import People from "../pages/People";
import { ProfileView } from "../pages/ProfileView";
import LikesAndMatches from "../pages/LikesAndMatches";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [userDetails, setUserDetails] = useState({});

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          profile,
          setProfile,
          photos,
          setPhotos,
          preferences,
          setPreferences,
          userDetails,
          setUserDetails
        }}
      >
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/addphotos" element={<AddPhotos />} />
          <Route path="/preferences" element={<UserPreferences />} />

          {/* PROTECTED ROUTES */}
          <Route path="/home" element={<MainLayout />}>
            <Route path="profileview" element={<ProfileView />} />
            <Route path="people" element={<People />} />
            <Route path="message" element={<Message />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="settings" element={<Settings />} />
            <Route path="likeandmatchespage" element={<LikesAndMatches />} />
          </Route>
        </Routes>
      </UserContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
