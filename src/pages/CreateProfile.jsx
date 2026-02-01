import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";

import { useDispatch } from "react-redux";
import { loadUserDetails} from "../redux/userDetailsThunks";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MySelect from "../components/MySelect";
import { setOnboarding } from "../redux/userSlice";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { utils } from "../utils";

function CreateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FORM STATE
  const [form, setForm] = useState({
    bio: "",
    gender: "",
    dob: null,               // IMPORTANT: store Date object
    height: "",
    weight: "",
    tagline: "",
    location: "",
    religion_id: "",
    education_id: "",
    mother_tongue_id: "",
    marital_status: "",
    job_industry_id: "",
  });

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // LOOKUPS
  const [lookups, setLookups] = useState({
    gender: [],
    religion: [],
    education: [],
    motherTongue: [],
    jobIndustry: [],
  });

  // FETCH LOOKUPS
  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("token");
      const headers = { token };

      try {
        const [
          gender,
          religion,
          education,
          motherTongue,
          jobIndustry,
        ] = await Promise.all([
          axios.get(config.BASE_URL + "/api/gender", { headers }),
          axios.get(config.BASE_URL + "/api/religion", { headers }),
          axios.get(config.BASE_URL + "/api/education", { headers }),
          axios.get(config.BASE_URL + "/api/mother-tongue", { headers }),
          axios.get(config.BASE_URL + "/api/job-industry", { headers }),
        ]);

        setLookups({
          gender: gender.data.data,
          religion: religion.data.data,
          education: education.data.data,
          motherTongue: motherTongue.data.data,
          jobIndustry: jobIndustry.data.data,
        });
      } catch (err) {
        console.log("Lookup fetch error:", err);
      }
    })();
  }, []);

  // -----------------------------------
  // SAVE PROFILE
  // -----------------------------------
  const save = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = { token };

      // Convert DOB to SQL format
      const payload = {
        ...form,
        dob: form.dob ? utils.toSqlDate(form.dob) : null,
      };

      const res = await axios.post(config.BASE_URL + "/user/profile", payload, { headers });
      console.log(res.data)
      if (res.data.status === "success") {
        dispatch(loadUserDetails());
        dispatch(setOnboarding({ needs_profile: false }));
        toast.success(res.data.data);
        navigate("/addphotos");
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error saving profile");
    }
  };

  return (
    <div className="container p-4">
      <h2>Create Profile</h2>

      {/* TEXT FIELDS */}
      <div className="mb-3">
        <label>Bio</label>
        <textarea
          className="form-control"
          value={form.bio}
          onChange={(e) => onChange("bio", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Tagline</label>
        <input
          className="form-control"
          value={form.tagline}
          onChange={(e) => onChange("tagline", e.target.value)}
        />
      </div>

      <div className="row">
        <div className="col">
          <label>Height (cm)</label>
          <input
            type="number"
            className="form-control"
            value={form.height}
            onChange={(e) => onChange("height", e.target.value)}
          />
        </div>

        <div className="col">
          <label>Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            value={form.weight}
            onChange={(e) => onChange("weight", e.target.value)}
          />
        </div>
      </div>

      {/* DOB */}
      <div className="row g-3 align-items-center m-1">
        <div className="col-2">
          <label className="col-form-label">Select DOB</label>
        </div>

        <div className="col-6">
          <ReactDatePicker
            selected={form.dob}
            onChange={(date) => onChange("dob", date)}
            placeholderText="Select date of birth"
            dateFormat="dd MMM yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
            className="form-control"
          />
        </div>
      </div>

      <div className="mb-3 mt-3">
        <label>Location</label>
        <input
          className="form-control"
          value={form.location}
          onChange={(e) => onChange("location", e.target.value)}
        />
      </div>

      {/* SELECT FIELDS */}
      <MySelect
        label="Gender"
        value={form.gender}
        options={lookups.gender}
        onChange={(val) => onChange("gender", Number(val.target.value))}
      />

      <MySelect
        label="Religion"
        value={form.religion_id}
        options={lookups.religion}
        onChange={(val) => onChange("religion_id", Number(val.target.value))}
      />

      <MySelect
        label="Education"
        value={form.education_id}
        options={lookups.education}
        onChange={(val) => onChange("education_id", Number(val.target.value))}
      />

      <MySelect
        label="Mother Tongue"
        value={form.mother_tongue_id}
        options={lookups.motherTongue}
        onChange={(val) =>
          onChange("mother_tongue_id", Number(val.target.value))
        }
      />

      <MySelect
        label="Job Industry"
        value={form.job_industry_id}
        options={lookups.jobIndustry}
        onChange={(val) =>
          onChange("job_industry_id", Number(val.target.value))
        }
      />

      {/* SAVE */}
      <button className="btn btn-primary mt-4" onClick={save}>
        Save & Continue
      </button>
    </div>
  );
}

export default CreateProfile;
