import { createContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProfile from "../pages/CreateProfile";
import AddPhotos from "../pages/AddPhotos";
import UserPreferences from "../pages/UserPreferences";

import Settings from "../pages/Settings";
import Subscribe from "../Home Page Components/src/Pages/Subscribe";

import MainLayout from "./MainLayout";
import People from "../pages/People";
import { ProfileView } from "../pages/ProfileView";
import LikesAndMatches from "../pages/LikesAndMatches";

import ProtectedRoute from "../pages/ProtectedRoute";
import PublicRoute from "../pages/PublicRoute";
import ChatHome from "../pages/ChatHome";
import Messages from "../pages/Messages";

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
          setUserDetails,
        }}
      >
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/createprofile"
            element={
              <PublicRoute>
                <CreateProfile />
              </PublicRoute>
            }
          />

          <Route
            path="/addphotos"
            element={
              <PublicRoute>
                <AddPhotos />
              </PublicRoute>
            }
          />

          <Route
            path="/preferences"
            element={
              <PublicRoute>
                <UserPreferences />
              </PublicRoute>
            }
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="people" element={<People />} />
            <Route path="profileview" element={<ProfileView />} />
            <Route path="messages" element={<Messages />} />
            <Route path="chathome" element={<ChatHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="likeandmatchespage" element={<LikesAndMatches />} />
          </Route>

          {/* DEFAULT: If route doesn't exist → go home or login */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </UserContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
