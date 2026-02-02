import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services/user";
import { toast } from "react-toastify";
import "../Styles/Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const signup = async () => {
    // 1. Check for empty fields
    if (name.length === 0) {
      toast.warning("Please enter your full name");
      return;
    }
    if (email.length === 0) {
      toast.warning("Please enter your email address");
      return;
    }
    if (password.length === 0) {
      toast.warning("Please enter a password");
      return;
    }
    if (mobile.length === 0) {
      toast.warning("Please enter your phone number");
      return;
    }

    // 2. Email Format Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // 3. Mobile Number Validation (Checks for exactly 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    // 4. Password Strength (Optional: e.g., minimum 6 characters)
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Proceed with API call if all validations pass
    const result = await registerUser(name, email, password, mobile);

    if (result.status === "success") {
      toast.success("Signup Successful");
      navigate("/");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left marketing">
        <small className="top-text">Create Your Account</small>
        <h1 className="hero-title">
          Join our community.<br />
          Start connecting today.
        </h1>
        <p className="trust-text">Safe, quick,<br />and totally free</p>
      </div>

      <div className="login-right">
        <div className="login-box">
          <input
            type="text"
            placeholder="full name :"
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="tel"
            placeholder="phone number :"
            maxLength="10" // Prevents typing more than 10 digits
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={signup}>Signup</button>
          <p className="register-text">
            already have an account <br />
            <Link to="/">click here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
