import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProfile from "../pages/CreateProfile";
import AddPhotos from "../pages/AddPhotos";
import UserPreferences from "../pages/UserPreferences";

import MainLayout from "./MainLayout";
import People from "../pages/People";
import { ProfileView } from "../pages/ProfileView";
import LikesAndMatches from "../pages/LikesAndMatches";
import ChatHome from "../pages/ChatHome";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";
import BlockedUsers from "../pages/BlockedUsers";

import EditProfileLayout from "../pages/EditProfileLayout";

import ProtectedRoute from "../pages/ProtectedRoute";
import PublicRoute from "../pages/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={
          <PublicRoute><Login /></PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute><Register /></PublicRoute>
        } />

        {/* ONBOARDING */}
        <Route path="/createprofile" element={
          <ProtectedRoute><CreateProfile /></ProtectedRoute>
        } />

        <Route path="/addphotos" element={
          <ProtectedRoute><AddPhotos /></ProtectedRoute>
        } />

        <Route path="/preferences" element={
          <ProtectedRoute><UserPreferences /></ProtectedRoute>
        } />

        {/* EDIT PROFILE PAGE */}

        {/* HOME */}
        <Route path="/home" element={
          <ProtectedRoute><MainLayout /></ProtectedRoute>
        }>
          <Route path="editprofile" element={<EditProfileLayout />} />
          <Route path="people" element={<People />} />
          <Route path="profileview" element={<ProfileView />} />
          <Route path="messages" element={<Messages />} />
          <Route path="chathome" element={<ChatHome />} />
          <Route path="likeandmatchespage" element={<LikesAndMatches />} />
          <Route path="settings" element={<Settings />} />
          <Route path="blocked-users" element={<BlockedUsers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
