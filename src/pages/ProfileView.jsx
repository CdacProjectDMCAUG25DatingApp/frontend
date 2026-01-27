import { useLocation } from "react-router";
import { utils } from "../utils";
import { ProfileViewBlock } from "../Components/ProfileViewBlocks";
import PhotoInput from "../Components/ImageInput/PhotoInput";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../app/App";
import axios from "axios";
import config from "../services/config";
import MySelect from "../Components/MySelect";
import { useNavigate } from "react-router";

export const ProfileView = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { dataObj, photos: routePhotos, editable ,token} = state || {};
  const [genderList, setGenderList] = useState([]);
  const {
    userDetails,
    setUserDetails,
    photos: contextPhotos,
    setPhotos
  } = useContext(UserContext);

  const [reportVisible, setReportVisible] = useState(false);
  const [reason, setReason] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [reportReasons, setReportReasons] = useState([]);


  // ================= SOURCE SELECTION =================
  const finalData = editable ? userDetails : dataObj;
  const finalPhotos = editable ? contextPhotos : routePhotos;

  if (!finalData) return null;

  // ================= STATE =================
  const [profile, setProfile] = useState({});
  const [original, setOriginal] = useState({});
  const [dirty, setDirty] = useState({});

  // ================= INIT =================
  useEffect(() => {
    axios.get(`${config.BASE_URL}/api/gender`, {
      headers: { token: sessionStorage.getItem("token") },
    }).then((r) => setGenderList(r.data.data));

    setProfile({
      ...finalData,
      image_prompt: finalPhotos?.[0]?.prompt || "",
    });

    setOriginal({
      ...finalData,
      image_prompt: finalPhotos?.[0]?.prompt || "",
    });

    setDirty({});
  }, [finalData]); // ❗ DO NOT depend on finalPhotos (prevents reset)

  useEffect(() => {
    axios.get(`${config.BASE_URL}/api/report-reasons`, {
      headers: { token: sessionStorage.getItem("token") }
    }).then((r) => setReportReasons(r.data.data));
  }, []);

  const handleBlock = async () => {
    try {
      await axios.post(
        `${config.BASE_URL}/settings/block`,
        { blocked_id: token },
        { headers: { token: sessionStorage.getItem("token") } }
      );

      alert("User Blocked");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Block failed");
    }
  };

  const submitReport = async () => {

    try {
      await axios.post(
        `${config.BASE_URL}/settings/report`,
        {
          reported_id: token,
          reason_id: reason,
          reason_custom: reason === 99 ? customReason : null,
        },
        { headers: { token: sessionStorage.getItem("token") } }
      );

      alert("User Reported");
    } catch (err) {
      alert("Report failed");
    }

    setReportVisible(false);
    setReason(null);
    setCustomReason("");
  };




  // ================= CHANGE =================
  const handleChange = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));

    if (original[field] !== value) {
      setDirty((d) => ({ ...d, [field]: value }));
    } else {
      setDirty((d) => {
        const copy = { ...d };
        delete copy[field];
        return copy;
      });
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    if (!Object.keys(dirty).length) return;

    const preferenceMap = {
      looking_for: "looking_for_id",
      preferred_gender: "preferred_gender_id",
      open_to: "open_to_id",
      zodiac: "zodiac_id",
      family_plan: "family_plan_id",
      education: "education_id",
      communication_style: "communication_style_id",
      love_style: "love_style_id",
      drinking: "drinking_id",
      smoking: "smoking_id",
      workout: "workout_id",
      dietary: "dietary_id",
      sleeping_habit: "sleeping_habit_id",
      religion: "religion_id",
      personality_type: "personality_type_id",
      pet: "pet_id",
    };

    const profileFields = [
      "bio", "height", "weight", "gender", "tagline",
      "dob", "marital_status", "location",
      "mother_tongue", "religion",
      "education", "job_industry_id"
    ];

    const profilePayload = {};
    const preferencePayload = {};

    Object.entries(dirty).forEach(([key, value]) => {
      if (profileFields.includes(key)) {
        profilePayload[key] = value;
      } else if (preferenceMap[key]) {
        preferencePayload[preferenceMap[key]] = value;
      }
    });


    try {
      // 🔹 PATCH userprofile
      // PATCH profile
      if (Object.keys(profilePayload).length) {
        await axios.patch(`${config.BASE_URL}/user/profile`, profilePayload, {
          headers: { token: sessionStorage.getItem("token") },
        });
      }

      // PATCH preferences
      if (Object.keys(preferencePayload).length) {
        await axios.patch(`${config.BASE_URL}/user/userdetails`, preferencePayload, {
          headers: { token: sessionStorage.getItem("token") },
        });
      }


      // 🔹 PATCH image prompt
      if (dirty.image_prompt !== undefined) {
        await axios.patch(
          `${config.BASE_URL}/user/photo/prompt`,
          {
            photo_id: finalPhotos?.[0]?.photo_id,
            prompt: dirty.image_prompt,
          },
          { headers: { token: sessionStorage.getItem("token") } }
        );

        setPhotos((prev) => {
          const copy = [...prev];
          copy[0] = { ...copy[0], prompt: dirty.image_prompt };
          return copy;
        });
      }

      setOriginal(profile);
      setDirty({});
    } catch (err) {
      console.error("Update failed:", err);
    }
  };


  const handleCancel = () => {
    setProfile(original);
    setDirty({});
  };

  // ================= BLOCK DATA =================
  const repeatedBlocks = [
    // ================= BLOCK 2 : PERSONAL DETAILS =================
    {
      dob: finalData.dob,
      location: finalData.location,
      mother_tongue: finalData.mother_tongue,
      religion: finalData.religion,
    },

    // ================= BLOCK 3 : EDUCATION & WORK =================
    {
      education: finalData.education,
      job_industry: finalData.job_industry,
      looking_for: finalData.looking_for,
      open_to: finalData.open_to,
    },

    // ================= BLOCK 4 : LIFESTYLE =================
    {
      drinking: finalData.drinking,
      smoking: finalData.smoking,
      workout: finalData.workout,
      dietary: finalData.dietary,
      sleeping_habit: finalData.sleeping_habit,
    },

    // ================= BLOCK 5 : PERSONALITY & RELATIONSHIP PREFS =================
    {
      love_style: finalData.love_style,
      communication_style: finalData.communication_style,
      family_plan: finalData.family_plan,
      personality_type: finalData.personality_type,
      pet: finalData.pet,
      zodiac: finalData.zodiac,
      preferred_gender: finalData.preferred_gender,
    },
  ];


  return (
    <div className="container-fluid px-lg-5">
      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-light mb-3"
        onClick={() => navigate(-1, { state: { returnIndex: state?.cardIndex } })}
      >
        ← Back
      </button>

      {/* TOP RIGHT MENU */}
      <div className="d-flex justify-content-end mb-3">
        <div className="dropdown">
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            ⋮
          </button>

          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <button className="dropdown-item" onClick={() => setReportVisible(true)}>
                Report
              </button>
            </li>

            <li>
              <button className="dropdown-item" onClick={handleBlock}>
                Block
              </button>
            </li>
          </ul>
        </div>
      </div>


      {/* ================= HERO ================= */}
      <div className="card text-white shadow-lg mb-5">
        <div className="card-body p-5 ">
          <div className="row g-5">

            {/* PHOTO */}
            <div className="col-lg-4 text-center">
              <div className="card  border-light rounded-4 overflow-hidden mx-auto"
                style={{ width: "300px", height: "500px" }}>
                <PhotoInput
                  dataURLtoFile={utils.dataURLtoFile}
                  imageurl={utils.urlConverter(finalPhotos?.[0]?.photo_url)}
                />
              </div>
            </div>

            {/* DETAILS */}
            <div className="col-lg-8">
              <h1 className="fw-bold">{finalData.user_name}</h1>
              <p className="fst-italic text-secondary">{finalData.tagline}</p>

              <hr className="" />

              {/* BIO */}
              <h6 className="text-uppercase text-secondary">Bio</h6>
              <textarea
                className="form-control mb-4"
                value={profile.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
                disabled={!editable}
                style={{ height: "130px" }}
              />

              {/* HEIGHT / WEIGHT / GENDER */}
              <div className="row g-3">
                {["height", "weight"].map((field) => (
                  <div className="col-md-4" key={field}>
                    <label className="small text-secondary text-uppercase">
                      {field}
                    </label>
                    <input
                      type='number'
                      className="form-control"
                      value={profile[field] || ""}
                      disabled={!editable}
                      onChange={(e) =>
                        editable && handleChange(field, e.target.value)
                      }
                    />
                  </div>
                ))}
                <div className="col-md-4">
                  <MySelect
                    label="Gender"
                    value={profile.gender}
                    options={genderList}
                    noDropdown={!editable}
                    onChange={(e) =>
                      editable && handleChange("gender", e.target.value)
                    }
                  />

                </div>
              </div>

              {/* IMAGE PROMPT */}
              {(editable || profile.image_prompt) && (
                <>
                  <hr className=" mt-4" />
                  <h6 className="text-uppercase text-secondary">
                    Image Prompt
                  </h6>
                  <textarea
                    className="form-control "
                    value={profile.image_prompt || ""}
                    onChange={(e) =>
                      editable &&
                      handleChange("image_prompt", e.target.value)
                    }
                    disabled={!editable}
                  />
                </>
              )}

              {/* ACTIONS */}
              {editable && Object.keys(dirty).length > 0 && (
                <div className="mt-4 d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleUpdate}>
                    Update Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= BLOCKS ================= */}
      {repeatedBlocks.map((fields, i) => (
        <ProfileViewBlock
          key={i}
          dataObj={fields}
          photos={finalPhotos}
          editable={editable}
          index={Math.min(i + 1, finalPhotos.length - 1)}
          reverse={i % 2 !== 1}
        />
      ))}

      {reportVisible && (
        <div className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content ">

              <div className="modal-header">
                <h5 className="modal-title">Report User</h5>
                <button className="btn-close btn-close-white"
                  onClick={() => setReportVisible(false)}
                />
              </div>

              <div className="modal-body">
                <MySelect
                  label="Reason"
                  value={reason}
                  options={reportReasons.map((r) => ({
                    id: r.reason_id,
                    name: r.name,
                  }))}
                  onChange={(e) => setReason(e.target.value)}
                />
                {reason === 99 && (
                  <textarea
                    className="form-control"
                    placeholder="Enter custom reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                  />
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setReportVisible(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={submitReport}>
                  Submit Report
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
