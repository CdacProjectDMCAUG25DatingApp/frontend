import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; 
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
  const [loading, setLoading] = useState(false);

  const signin = async () => {
    if (!email || !password) return toast.error("Please fill all fields");
    
    setLoading(true);
    try {
      const result = await loginUser(email, password);

      if (result.status !== "success") {
        toast.error(result.error || "Invalid Credentials");
        return; 
      }

      const { token, userdetails, photos, onboarding, name, email: e, phone_number } = result.data;

      // 1. Storage first
      sessionStorage.setItem("token", token);
      console.log(onboarding)

      // 2. Decide the path BEFORE updating Redux
      let targetPath = "/home/people";
      if (onboarding?.needs_profile) targetPath = "/createprofile";
      else if (onboarding?.needs_photos) targetPath = "/addphotos";
      else if (onboarding?.needs_preferences) targetPath = "/preferences";

      // 3. Update non-auth Redux slices
      dispatch(setUserDetails(userdetails || {}));
      dispatch(setPhotos(photos || []));

      // 4. THE FIX: Navigate slightly before (or at the exact same time as) setting the token
      // This ensures the "intended" route is already loading when PublicRoute re-renders
      navigate(targetPath, { replace: true });
      
      // 5. Update the Auth Redux state (which triggers Route checks)
      dispatch(setUser({ token, name, email: e, phone_number, onboarding }));

      toast.success("Login Successful");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left marketing">
        <small className="top-text">Find Your Kind of Connection</small>
        <h1 className="hero-title">Meet new people.<br />Make real connections.</h1>
        <p className="trust-text">Safe, simple,<br />and 100% free to start</p>
      </div>

      <div className="login-right">
        <div className="login-box">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={loading} onClick={signin}>
            {loading ? "Signing in..." : "Signin"}
          </button>

          <p className="register-text">
            don't have an account <br />
            <Link to="/register">click here</Link> 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
