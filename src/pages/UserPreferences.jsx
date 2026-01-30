import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";



import MySelect from "../components/MySelect";

function UserPreferences() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


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
    pet_id: "",
  });

  const onChange = (key, val) => {
    setPref((p) => ({ ...p, [key]: val }));
  };

  // -----------------------------------------
  // LOOKUP TABLE DATA
  // -----------------------------------------
  const [lookups, setLookups] = useState({
    gender: [],
    lookingFor: [],
    openTo: [],
    zodiac: [],
    familyPlan: [],
    education: [],
    communicationStyle: [],
    loveStyle: [],
    drinking: [],
    smoking: [],
    workout: [],
    dietary: [],
    sleepingHabit: [],
    religion: [],
    personalityType: [],
    pet: [],
  });

  // -----------------------------------------
  // FETCH LOOKUP VALUES
  // -----------------------------------------
  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("token");
      const headers = { token };

      try {
        const [
          gender,
          lookingFor,
          openTo,
          zodiac,
          familyPlan,
          education,
          communicationStyle,
          loveStyle,
          drinking,
          smoking,
          workout,
          dietary,
          sleepingHabit,
          religion,
          personalityType,
          pet,
        ] = await Promise.all([
          axios.get(config.BASE_URL + "/api/gender", { headers }),
          axios.get(config.BASE_URL + "/api/lookingfor", { headers }),
          axios.get(config.BASE_URL + "/api/opento", { headers }),
          axios.get(config.BASE_URL + "/api/zodiac", { headers }),
          axios.get(config.BASE_URL + "/api/familyplan", { headers }),
          axios.get(config.BASE_URL + "/api/education", { headers }),
          axios.get(config.BASE_URL + "/api/communicationstyle", { headers }),
          axios.get(config.BASE_URL + "/api/lovestyle", { headers }),
          axios.get(config.BASE_URL + "/api/drinking", { headers }),
          axios.get(config.BASE_URL + "/api/smoking", { headers }),
          axios.get(config.BASE_URL + "/api/workout", { headers }),
          axios.get(config.BASE_URL + "/api/dietary", { headers }),
          axios.get(config.BASE_URL + "/api/sleepingHabit", { headers }),
          axios.get(config.BASE_URL + "/api/religion", { headers }),
          axios.get(config.BASE_URL + "/api/personalitytype", { headers }),
          axios.get(config.BASE_URL + "/api/pet", { headers }),
        ]);

        setLookups({
          gender: gender.data.data,
          lookingFor: lookingFor.data.data,
          openTo: openTo.data.data,
          zodiac: zodiac.data.data,
          familyPlan: familyPlan.data.data,
          education: education.data.data,
          communicationStyle: communicationStyle.data.data,
          loveStyle: loveStyle.data.data,
          drinking: drinking.data.data,
          smoking: smoking.data.data,
          workout: workout.data.data,
          dietary: dietary.data.data,
          sleepingHabit: sleepingHabit.data.data,
          religion: religion.data.data,
          personalityType: personalityType.data.data,
          pet: pet.data.data,
        });
      } catch (err) {
        console.log("Lookup fetch error:", err);
      }
    })();
  }, []);

  // -----------------------------------------
  // SAVE PREFERENCES
  // -----------------------------------------
  const user = useSelector((state) => state.user);
  const save = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = { token };

      await axios.post(config.BASE_URL + "/user/preferences", pref, { headers });

      // Update onboarding flags in Redux
      dispatch(setUser({
        ...user,
        onboarding: {
          needs_profile: false,
          needs_photos: false,
          needs_preferences: false
        }
      }));
      toast.success("Preferences saved!");
      navigate("/home/people");
    } catch (e) {
      console.log(e);
      toast.error("Failed to save preferences");
    }
  };


  return (
    <div className="container p-4">
      <h2 className="mb-4">Set Preferences</h2>

      <MySelect
        label="Preferred Gender"
        value={pref.preferred_gender_id}
        options={lookups.gender}
        onChange={(e) =>
          onChange("preferred_gender_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Looking For"
        value={pref.looking_for_id}
        options={lookups.lookingFor}
        onChange={(e) =>
          onChange("looking_for_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Open To"
        value={pref.open_to_id}
        options={lookups.openTo}
        onChange={(e) => onChange("open_to_id", Number(e.target.value))}
      />

      <MySelect
        label="Zodiac"
        value={pref.zodiac_id}
        options={lookups.zodiac}
        onChange={(e) =>
          onChange("zodiac_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Family Plan"
        value={pref.family_plan_id}
        options={lookups.familyPlan}
        onChange={(e) =>
          onChange("family_plan_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Education Preference"
        value={pref.education_id}
        options={lookups.education}
        onChange={(e) =>
          onChange("education_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Communication Style"
        value={pref.communication_style_id}
        options={lookups.communicationStyle}
        onChange={(e) =>
          onChange("communication_style_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Love Style"
        value={pref.love_style_id}
        options={lookups.loveStyle}
        onChange={(e) => onChange("love_style_id", Number(e.target.value))}
      />

      <MySelect
        label="Drinking Habit"
        value={pref.drinking_id}
        options={lookups.drinking}
        onChange={(e) => onChange("drinking_id", Number(e.target.value))}
      />

      <MySelect
        label="Smoking Habit"
        value={pref.smoking_id}
        options={lookups.smoking}
        onChange={(e) => onChange("smoking_id", Number(e.target.value))}
      />

      <MySelect
        label="Workout Habit"
        value={pref.workout_id}
        options={lookups.workout}
        onChange={(e) => onChange("workout_id", Number(e.target.value))}
      />

      <MySelect
        label="Dietary Preference"
        value={pref.dietary_id}
        options={lookups.dietary}
        onChange={(e) => onChange("dietary_id", Number(e.target.value))}
      />

      <MySelect
        label="Sleeping Habit"
        value={pref.sleeping_habit_id}
        options={lookups.sleepingHabit}
        onChange={(e) =>
          onChange("sleeping_habit_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Religion Preference"
        value={pref.religion_id}
        options={lookups.religion}
        onChange={(e) => onChange("religion_id", Number(e.target.value))}
      />

      <MySelect
        label="Personality Type"
        value={pref.personality_type_id}
        options={lookups.personalityType}
        onChange={(e) =>
          onChange("personality_type_id", Number(e.target.value))
        }
      />

      <MySelect
        label="Pet Preference"
        value={pref.pet_id}
        options={lookups.pet}
        onChange={(e) => onChange("pet_id", Number(e.target.value))}
      />

      <button className="btn btn-primary mt-4" onClick={save}>
        Save & Continue
      </button>
    </div>
  );
}

export default UserPreferences;
