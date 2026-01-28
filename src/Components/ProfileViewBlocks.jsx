import { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import { utils } from "../utils";

import PhotoInput from "./ImageInput/PhotoInput";
import MySelect from "../Components/MySelect";

import { useSelector, useDispatch } from "react-redux";
import { setPhotos } from "../redux/photosSlice";
import { setUserDetails } from "../redux/userDetailsSlice";
import { updateUserDetails } from "../redux/userDetailsThunks";

import { Calendar } from "primereact/calendar";

export const ProfileViewBlock = ({
  dataObj,
  photos,
  reverse,
  editable,
  index,
}) => {
  const dispatch = useDispatch();

  // ******** FIX: read current Redux userdetails ********
  const reduxUserDetails = useSelector((s) => s.userDetails.data);

  const [profile, setProfile] = useState({});
  const [originalProfile, setOriginalProfile] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});

  // --------------------------
  // INIT BLOCK FIELDS
  // --------------------------
  useEffect(() => {
    const merged = {
      ...dataObj,
      image_prompt: photos?.[index]?.prompt || "",
    };

    setProfile(merged);
    setOriginalProfile(merged);
    setDirtyFields({});
  }, [dataObj, photos, index]);

  // --------------------------
  // HANDLE FIELD CHANGE
  // --------------------------
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));

    if (originalProfile[field] !== value) {
      setDirtyFields((prev) => ({ ...prev, [field]: value }));
    } else {
      setDirtyFields((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // --------------------------
  // SAVE BLOCK UPDATE
  // --------------------------
  const handleUpdate = async () => {
    if (!Object.keys(dirtyFields).length) return;

    const token = sessionStorage.getItem("token");
    const headers = { token };

    try {
      const fieldsToUpdate = { ...dirtyFields };

      // 1) Update Photo Prompt
      if (fieldsToUpdate.image_prompt !== undefined) {
        await axios.patch(
          `${config.BASE_URL}/photos/prompt`,
          {
            photo_id: photos[index].photo_id,
            prompt: fieldsToUpdate.image_prompt,
          },
          { headers }
        );

        dispatch(
          setPhotos(
            photos.map((p, i) =>
              i === index ? { ...p, prompt: fieldsToUpdate.image_prompt } : p
            )
          )
        );

        delete fieldsToUpdate.image_prompt;
      }

      // 2) Update Profile/Preferences
      if (Object.keys(fieldsToUpdate).length > 0) {
        await dispatch(updateUserDetails(fieldsToUpdate));
      }

      // 3) FIX: MERGE WITH CURRENT REDUX USERDETAILS
      dispatch(
        setUserDetails({
          ...reduxUserDetails,
          ...profile,
        })
      );

      // reset
      setOriginalProfile(profile);
      setDirtyFields({});
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // --------------------------
  // LOAD DROPDOWN DATA
  // --------------------------
  const [lists, setLists] = useState({
    jobIndustry: [],
    lookingFor: [],
    loveStyle: [],
    motherTongue: [],
    familyPlan: [],
    drinking: [],
    education: [],
    communicationStyle: [],
    openTo: [],
    personalityType: [],
    pet: [],
    religion: [],
    sleepingHabit: [],
    workout: [],
    zodiac: [],
    smoking: [],
    dietary: [],
    gender: [],
  });

  useEffect(() => {
    const headers = { token: sessionStorage.getItem("token") };

    const endpoints = {
      jobIndustry: "/api/job-industry",
      lookingFor: "/api/lookingfor",
      loveStyle: "/api/lovestyle",
      motherTongue: "/api/mother-tongue",
      familyPlan: "/api/familyplan",
      drinking: "/api/drinking",
      education: "/api/education",
      communicationStyle: "/api/communicationstyle",
      openTo: "/api/opento",
      personalityType: "/api/personalitytype",
      pet: "/api/pet",
      religion: "/api/religion",
      sleepingHabit: "/api/sleepingHabit",
      workout: "/api/workout",
      zodiac: "/api/zodiac",
      smoking: "/api/smoking",
      dietary: "/api/dietary",
      gender: "/api/gender",
    };

    Object.entries(endpoints).forEach(([key, url]) => {
      axios.get(config.BASE_URL + url, { headers }).then((r) => {
        setLists((prev) => ({ ...prev, [key]: r.data.data || [] }));
      });
    });
  }, []);

  // Dropdown mapping
  const dropDownData = {
    gender: { label: "Gender", options: lists.gender },
    religion: { label: "Religion", options: lists.religion },
    mother_tongue: { label: "Mother Tongue", options: lists.motherTongue },
    education: { label: "Education", options: lists.education },

    job_industry_id: { label: "Job Industry", options: lists.jobIndustry },
    preferred_gender_id: {
      label: "Preferred Gender",
      options: lists.gender,
    },
    looking_for_id: { label: "Looking For", options: lists.lookingFor },
    open_to_id: { label: "Open To", options: lists.openTo },
    zodiac_id: { label: "Zodiac", options: lists.zodiac },
    family_plan_id: { label: "Family Plan", options: lists.familyPlan },
    communication_style_id: {
      label: "Communication Style",
      options: lists.communicationStyle,
    },
    love_style_id: { label: "Love Style", options: lists.loveStyle },

    drinking_id: { label: "Drinking", options: lists.drinking },
    smoking_id: { label: "Smoking", options: lists.smoking },
    workout_id: { label: "Workout", options: lists.workout },
    dietary_id: { label: "Dietary Preference", options: lists.dietary },
    sleeping_habit_id: {
      label: "Sleeping Habit",
      options: lists.sleepingHabit,
    },

    religion_id: {
      label: "Preferred Religion",
      options: lists.religion,
    },
    personality_type_id: {
      label: "Personality Type",
      options: lists.personalityType,
    },
    pet_id: { label: "Pet Preference", options: lists.pet },
    education_id: { label: "Preferred Education", options: lists.education },
  };

  // --------------------------
  // UI
  // --------------------------
  return (
    <div className="container-fluid py-5 border-bottom">
      <div
        className={`row align-items-center g-5 ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        {/* PHOTO */}
        <div className="col-lg-4 text-center">
          <div
            className="card border-light rounded-4 overflow-hidden mx-auto"
            style={{ width: "300px", height: "500px" }}
          >
            <PhotoInput
              dataURLtoFile={utils.dataURLtoFile}
              imageurl={utils.urlConverter(photos?.[index]?.photo_url)}
            />
          </div>
        </div>

        {/* FIELDS */}
        <div className="col-lg-8">
          <div className="card rounded-4">
            <div className="card-body p-4">
              {Object.entries(profile)
                .filter(([key]) => key !== "image_prompt")
                .map(([key, value]) => {
                  if (key === "dob") {
                    return (
                      <div key={key} className="mb-3">
                        <label className="text-secondary small">
                          Date of Birth
                        </label>
                        {editable ? (
                          <Calendar
                            value={value ? new Date(value) : null}
                            onChange={(e) => handleChange("dob", e.value)}
                            showIcon
                            className="w-100"
                          />
                        ) : (
                          <p className="form-control">
                            {value
                              ? new Date(value).toLocaleDateString()
                              : "Not set"}
                          </p>
                        )}
                      </div>
                    );
                  }

                  if (key === "marital_status") {
                    return (
                      <MySelect
                        key={key}
                        label="Marital Status"
                        value={value}
                        options={[
                          { id: 1, name: "Yes" },
                          { id: 0, name: "No" },
                          { id: 2, name: "Hide" },
                        ]}
                        noDropdown={!editable}
                        onChange={(e) =>
                          handleChange("marital_status", e.target.value)
                        }
                      />
                    );
                  }

                  // SELECT DROPDOWNS
                  if (dropDownData[key]) {
                    return (
                      <MySelect
                        key={key}
                        label={dropDownData[key].label}
                        value={value}
                        options={dropDownData[key].options}
                        noDropdown={!editable}
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    );
                  }

                  return null;
                })}

              {/* IMAGE PROMPT */}
              {(editable || photos?.[index]?.prompt) && (
                <>
                  <hr className="mt-4" />
                  <h6 className="text-uppercase text-secondary">
                    Image Prompt
                  </h6>

                  <textarea
                    className="form-control"
                    value={profile.image_prompt || ""}
                    disabled={!editable}
                    onChange={(e) =>
                      handleChange("image_prompt", e.target.value)
                    }
                  ></textarea>
                </>
              )}

              {/* UPDATE BUTTON */}
              {editable && Object.keys(dirtyFields).length > 0 && (
                <div className="text-end mt-4 d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setProfile(originalProfile);
                      setDirtyFields({});
                    }}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleUpdate}>
                    Update This Section
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
