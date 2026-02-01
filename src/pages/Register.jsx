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

  {/* LEFT SIDE – SAME AS LOGIN */}
  <div className="login-left marketing">
    <small className="top-text">Create Your Account</small>

    <h1 className="hero-title">
      Join our community.<br />
      Start connecting today.
    </h1>

    <p className="trust-text">
      Safe, quick,<br />
      and totally free
    </p>
  </div>

  {/* RIGHT SIDE – REGISTER FORM */}
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
