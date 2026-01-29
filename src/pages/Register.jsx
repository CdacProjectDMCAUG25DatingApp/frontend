    import React, { useState } from "react";
    import { Link, useNavigate } from "react-router";
    import { registerUser } from "../services/user";
    import { toast } from "react-toastify";
    import "./Login.css"; // reuse same styles

    function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    const signup = async () => {
        const result = await registerUser(name, email, password, mobile);

        if (result.status === "success") {
        toast.success("Signup Successful");
        navigate("/");
        } else {
        toast.error(result.error);
        }
    };

    return (
        <div className="auth-container">
        {/* LEFT PANEL */}
        <div className="auth-left">
            <h1>💗 LoveConnect</h1>
            <p>Create your account</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
            <div className="auth-card">
            <h2>Sign Up</h2>

            <label>Name</label>
            <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
                type="password"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <small className="form-hint">
                Password must be 8–20 characters and contain letters and numbers.
            </small>

            <label>Phone</label>
            <input
                type="tel"
                placeholder="Enter your phone number"
                onChange={(e) => setMobile(e.target.value)}
            />

            <button className="auth-btn" onClick={signup}>
                Sign Up
            </button>

            <p className="signup-text">
                Already have an account? <Link to="/">Sign in</Link>
            </p>
            </div>
        </div>
        </div>
    );
    }

    export default Register;
