import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../services/user';
import { toast } from 'react-toastify';
import { UserContext } from '../app/App';
import config from '../services/config';
import axios from 'axios';
import './Login.css';

function Login() {
  const {
    setUser,
    setProfile,
    setPhotos,
    setPreferences,
    setUserDetails
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signin = async () => {
    try {
      const result = await loginUser(email, password);

      if (result.status !== 'success') {
        toast.error(result.error);
        return;
      }

      sessionStorage.setItem("token", result.data.token);

      setUser({
        name: result.data.name,
        email: result.data.email,
        mobile: result.data.mobile,
      });

      toast.success("Login Successful");

      const headers = { token: sessionStorage.getItem("token") };

      const [profileRes, photosRes, prefRes, userDetailsRes] =
        await Promise.all([
          axios.get(config.BASE_URL + "/user/userprofile", { headers }),
          axios.get(config.BASE_URL + "/photos/userphotos", { headers }),
          axios.get(config.BASE_URL + "/user/userpreferences", { headers }),
          axios.get(config.BASE_URL + "/user/userdetails", { headers }),
        ]);

      setProfile(profileRes.data.data[0] || {});
      setPhotos(photosRes.data.data || []);
      setPreferences(prefRes.data.data[0] || {});
      setUserDetails(userDetailsRes.data.data[0] || {});

      if (!profileRes.data.data.length) return navigate("/createprofile");
      if (photosRes.data.data.length !== 6) return navigate("/addphotos");
      if (!prefRes.data.data.length) return navigate("/preferences");

      navigate("/home/people");

    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT SIDE – MARKETING STYLE */}
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

      {/* RIGHT SIDE – LOGIN */}
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
            don’t have an account <br />
            <a href="/register">click here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
