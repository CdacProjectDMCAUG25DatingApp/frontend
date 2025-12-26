import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProfile from "../pages/CreateProfile";
import AddPhotos from "../pages/AddPhotos";
import UserPreferences from "../pages/UserPreferences";
import EditProfile from "../pages/EditProfile";

import Message from "../Home Page Components/src/Pages/Message";
import Preferences from "../Home Page Components/src/Pages/Preferences";
import Settings from "../Home Page Components/src/Pages/Settings";
import Subscribe from "../Home Page Components/src/Pages/Subscribe";
import MatchesAndLikes from "../Home Page Components/src/Pages/MatchesAndLikes";

import MainLayout from "./MainLayout";
import People from "../pages/People";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/addphotos" element={<AddPhotos />} />
          <Route path="/preferences" element={<UserPreferences />} />

          {/* PROTECTED / APP ROUTES */}
          <Route path="/home" element={<MainLayout />}>
            <Route path="people" element={<People />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="message" element={<Message />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="settings" element={<Settings />} />
            <Route path="matches" element={<MatchesAndLikes />} />
          </Route>
        </Routes>
      </UserContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
