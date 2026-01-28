import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../redux/userDetailsThunks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bio: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    tagline: "",
    location: "",
    religion: "",
    education: "",
    mother_tongue: "",
    marital_status: "",
    job_industry_id: ""
  });

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    try {
      await dispatch(updateUserDetails(form));
      toast.success("Profile updated!");
      navigate("/addphotos");
    } catch (e) {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="container p-4">
      <h2>Create Profile</h2>

      {Object.keys(form).map((key) => (
        <div className="mb-3" key={key}>
          <label>{key}</label>
          <input
            type="text"
            className="form-control"
            value={form[key]}
            onChange={(e) => onChange(key, e.target.value)}
          />
        </div>
      ))}

      <button className="btn btn-primary" onClick={save}>
        Save & Continue
      </button>
    </div>
  );
}

export default CreateProfile;
