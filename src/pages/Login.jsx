import React, { useState } from 'react';
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

      const { token, userdetails, photos, onboarding, name, email: e, mobile } = result.data;

      sessionStorage.setItem("token", token);

      // set basic user
      dispatch(setUser({ token, name, email: e, mobile }));

      // set redux userDetails & photos
      dispatch(setUserDetails(userdetails || {}));
      dispatch(setPhotos(photos || []));

      toast.success("Login Successful");

      // onboarding navigation
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
    <div className="login-wrapper">

      <div className="login-left marketing">
        <small className="top-text">Find Your Kind of Connection</small>

        <h1 className="hero-title">
          Meet new people.<br />
          Make real connections.
        </h1>

        <p className="trust-text">
          Safe, simple,<br />
          and 100% free to start
        </p>
      </div>

      <div className="login-right">
        <div className="login-box">

          <input
            type="email"
            placeholder="email address :"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password :"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signin}>Signin</button>

          <p className="register-text">
            don't have an account <br />
            <a href="/register">click here</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
