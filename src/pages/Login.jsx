import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../services/user';
import { toast } from 'react-toastify';
import { UserContext } from '../app/App';
import config from '../services/config';
import axios from 'axios';

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

      // minimal auth user
      setUser({
        name: result.data.name,
        email: result.data.email,
        mobile: result.data.mobile,
      });

      toast.success("Login Successful");

      const headers = { token: sessionStorage.getItem("token") };

      // fetch everything for logged-in user
      const [profileRes, photosRes, prefRes, userDetailsRes] = await Promise.all([
        axios.get(config.BASE_URL + "/user/userprofile", { headers }),
        axios.get(config.BASE_URL + "/photos/userphotos", { headers }),
        axios.get(config.BASE_URL + "/user/userpreferences", { headers }),
        axios.get(config.BASE_URL + "/user/userdetails", { headers }),
      ]);

      setProfile(profileRes.data.data[0] || {});
      setPhotos(photosRes.data.data || []);
      setPreferences(prefRes.data.data[0] || {});
      setUserDetails(userDetailsRes.data.data[0] || {});
      localStorage.setItem("sidebar_name", user?.name || "");
      localStorage.setItem("sidebar_dp", photos?.[0]?.photo_url || "");

      // navigation logic
      if (!profileRes.data.data.length) return navigate("/createprofile");
      if (photosRes.data.data.length !== 6) return navigate("/addphotos");
      if (!prefRes.data.data.length) return navigate("/preferences");

      navigate("/home");

    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ width: '100%', height: 750 }}>
      <div className='container w-50'>
        <div className="mb-3 mt-3">
          <label>Email address</label>
          <input type="email" className="form-control"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control"
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-success" onClick={signin}>Signin</button>

        <div>
          <label>Don't have an account?</label>
          <a href="/register"> Click Here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
