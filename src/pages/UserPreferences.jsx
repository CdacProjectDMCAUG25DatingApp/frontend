import React, { useState } from "react";
import { updateUserDetails } from "../redux/userDetailsThunks";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserPreferences() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pref, setPref] = useState({
    preferred_gender_id: "",
    looking_for_id: "",
    open_to_id: "",
    zodiac_id: "",
    family_plan_id: "",
    education_id: "",
    communication_style_id: "",
    love_style_id: "",
    drinking_id: "",
    smoking_id: "",
    workout_id: "",
    dietary_id: "",
    sleeping_habit_id: "",
    religion_id: "",
    personality_type_id: "",
    pet_id: ""
  });

  const onChange = (key, val) => {
    setPref((p) => ({ ...p, [key]: val }));
  };

  const save = async () => {
    try {
      await dispatch(updateUserDetails(pref));
      toast.success("Preferences saved!");
      navigate("/home/people");
    } catch (e) {
      toast.error("Failed to save preferences");
    }
  };

  return (
    <div className="container p-4">
      <h2>Set Preferences</h2>

      {Object.keys(pref).map((key) => (
        <div className="mb-3" key={key}>
          <label>{key}</label>
          <input
            className="form-control"
            value={pref[key]}
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

export default UserPreferences;
