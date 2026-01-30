import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { setUser } from "../redux/userSlice";
import { setUserDetails } from "../redux/userDetailsSlice";
import { setPhotos } from "../redux/photosSlice";

import { loginUser } from "../services/user";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      const result = await loginUser(email, password);

      if (result.status !== "success") {
        toast.error(result.error);
        return;
      }

      const { token, userdetails, photos, onboarding, name, email: e, mobile } =
        result.data;

      sessionStorage.setItem("token", token);

      dispatch(setUser({ token, name, email: e, mobile }));
      dispatch(setUserDetails(userdetails || {}));
      dispatch(setPhotos(photos || []));

      toast.success("Login Successful");

      if (onboarding.needs_profile) return navigate("/createprofile");
      if (onboarding.needs_photos) return navigate("/addphotos");
      if (onboarding.needs_preferences) return navigate("/preferences");

      navigate("/home/people");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>💗 Cupido</h1>
        <p>Find your perfect match</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Sign In</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot password?</span>
          </div>

          <button className="auth-btn" onClick={signin}>
            Sign In
          </button>

         

          <p className="signup-text">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
