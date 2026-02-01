import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProfile from "../pages/CreateProfile";
import AddPhotos from "../pages/AddPhotos";
import UserPreferences from "../pages/UserPreferences";
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";               
import "primeicons/primeicons.css";                             


import MainLayout from "./MainLayout";
import People from "../pages/People";
import { ProfileView } from "../pages/ProfileView";
import LikesAndMatches from "../pages/LikesAndMatches";
import ChatHome from "../pages/ChatHome";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";
import BlockedUsers from "../pages/BlockedUsers";
import EditProfileLayout from "../pages/EditProfileLayout";

function App() {
  const token = useSelector((state) => state.user.token);
  const onboarding = useSelector((state) => state.user.onboarding);

  const isLoggedIn = Boolean(token);

  // -------------------------------
  // UNAUTHENTICATED USERS
  // -------------------------------
  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Anything else redirects to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  // -------------------------------
  // ONBOARDING PROTECTION
  // -------------------------------
  if (onboarding?.needs_profile) {
    return (
      <>
        <Routes>
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="*" element={<Navigate to="/createprofile" replace />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  if (onboarding?.needs_photos) {
    return (
      <>
        <Routes>
          <Route path="/addphotos" element={<AddPhotos />} />
          <Route path="*" element={<Navigate to="/addphotos" replace />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  if (onboarding?.needs_preferences) {
    return (
      <>
        <Routes>
          <Route path="/preferences" element={<UserPreferences />} />
          <Route path="*" element={<Navigate to="/preferences" replace />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/home" element={<MainLayout />}>
          <Route path="editprofile" element={<EditProfileLayout />} />
          <Route path="people" element={<People />} />
          <Route path="profileview" element={<ProfileView />} />
          <Route path="messages" element={<Messages />} />
          <Route path="chathome" element={<ChatHome />} />
          <Route path="likeandmatchespage" element={<LikesAndMatches />} />
          <Route path="settings" element={<Settings />} />
          <Route path="blocked-users" element={<BlockedUsers />} />
        </Route>

        {/* default redirect */}
        <Route path="*" element={<Navigate to="/home/people" replace />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
