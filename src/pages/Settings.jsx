import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useState } from "react";
import ChangePasswordModal from "../Components/ChangePasswordModal";
import FeedbackModal from "../Components/FeedBack";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const navigate = useNavigate();

const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      // 1. Reset Redux State (Triggers PublicRoute/ProtectedRoute updates)
      dispatch(logout());

      // 2. Clear browser storage
      localStorage.clear();
      sessionStorage.clear();

      // 3. Kick them to the entry page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="container py-5">

      {/* Title */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2 className="fw-bold text-white d-inline-block px-4 py-2 border border-light rounded-4">
            Settings
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="d-grid gap-4">

            <button
              className="btn btn-dark text-white py-3 fs-5 border border-light rounded-4"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>

            <button
              className="btn btn-dark text-white py-3 fs-5 border border-light rounded-4"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
              onClick={() => setShowFeedbackModal(true)}
            >
              Feedback
            </button>

            <button
              className="btn btn-dark text-white py-3 fs-5 border border-light rounded-4"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
              onClick={() => navigate("/home/blocked-users")}
            >
              Blocked Users
            </button>

            <button
              className="btn py-3 fs-5 border border-danger rounded-4 text-danger"
              style={{ background: "rgba(255,0,0,0.1)" }}
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>
      </div>

      {/* MODALS */}
      <ChangePasswordModal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      <FeedbackModal
        show={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />

    </div>
  );
}
