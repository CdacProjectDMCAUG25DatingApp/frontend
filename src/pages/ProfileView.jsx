import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import config from "../services/config";
import { utils } from "../utils";

import PhotoInput from "../Components/ImageInput/PhotoInput";
import MySelect from "../Components/MySelect";
import { ProfileViewBlock } from "../Components/ProfileViewBlocks";

import { updateUserDetails } from "../redux/userDetailsThunks";
import { setPhotos } from "../redux/photosSlice";
import { setUserDetails } from "../redux/userDetailsSlice";

export const ProfileView = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // -------------------------------
  //  MERGE PROPS + NAVIGATION DATA
  // -------------------------------
  const navState = location.state || {};

  const {
    editable: propEditable,
    dataObj: propDataObj,
    photos: propPhotos
  } = props || {};

  const editable = navState.editable ?? propEditable ?? false;
  const dataObj = navState.dataObj ?? propDataObj ?? null;
  const photos = navState.photos ?? propPhotos ?? [];

  // Guard
  if (!dataObj || photos.length === 0) return null;

  // -------------------------------
  //  LOCAL STATE
  // -------------------------------
  const [genderList, setGenderList] = useState([]);
  const [reportReasons, setReportReasons] = useState([]);

  const [profile, setProfile] = useState({});
  const [original, setOriginal] = useState({});
  const [dirty, setDirty] = useState({});

  const [reportVisible, setReportVisible] = useState(false);
  const [reason, setReason] = useState(null);
  const [customReason, setCustomReason] = useState("");

  // -------------------------------
  //  INITIAL LOAD
  // -------------------------------
  useEffect(() => {
    const headers = { token: sessionStorage.getItem("token") };

    axios.get(`${config.BASE_URL}/api/gender`, { headers })
      .then(r => setGenderList(r.data.data));

    axios.get(`${config.BASE_URL}/api/report-reasons`, { headers })
      .then(r => setReportReasons(r.data.data));
  }, []);

  // -------------------------------
  //  INITIALIZE PROFILE
  // -------------------------------
  useEffect(() => {
    const merged = {
      ...dataObj,
      image_prompt: photos[0]?.prompt || ""
    };
    setProfile(merged);
    setOriginal(merged);
    setDirty({});
  }, [dataObj, photos]);

  // -------------------------------
  //  CHANGE HANDLER
  // -------------------------------
  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));

    if (original[field] !== value) {
      setDirty(prev => ({ ...prev, [field]: value }));
    } else {
      setDirty(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // -------------------------------
  //  SAVE HANDLER
  // -------------------------------
  const handleUpdate = async () => {
    if (!Object.keys(dirty).length) return;

    const headers = { token: sessionStorage.getItem("token") };

    const updatePayload = { ...dirty };
    const promptValue = updatePayload.image_prompt;
    delete updatePayload.image_prompt;

    try {
      // Update profile fields
      if (Object.keys(updatePayload).length) {
        await dispatch(updateUserDetails(updatePayload));
      }

      // Update prompt
      if (promptValue !== undefined) {
        await axios.patch(
          `${config.BASE_URL}/photos/prompt`,
          { photo_id: photos[0].photo_id, prompt: promptValue },
          { headers }
        );

        dispatch(
          setPhotos(
            photos.map((p, idx) =>
              idx === 0 ? { ...p, prompt: promptValue } : p
            )
          )
        );
      }

      // Sync redux
      dispatch(setUserDetails({ ...dataObj, ...dirty }));

      setOriginal(profile);
      setDirty({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setProfile(original);
    setDirty({});
  };

  // -------------------------------
  //  GROUPED BLOCKS
  // -------------------------------
  const blocks = [
    {
      dob: dataObj.dob,
      location: dataObj.location,
      mother_tongue: dataObj.mother_tongue,
      religion: dataObj.religion,
    },
    {
      education: dataObj.education,
      job_industry_id: dataObj.job_industry_id,
      looking_for_id: dataObj.looking_for_id,
      open_to_id: dataObj.open_to_id,
    },
    {
      drinking_id: dataObj.drinking_id,
      smoking_id: dataObj.smoking_id,
      workout_id: dataObj.workout_id,
      dietary_id: dataObj.dietary_id,
      sleeping_habit_id: dataObj.sleeping_habit_id,
    },
    {
      love_style_id: dataObj.love_style_id,
      communication_style_id: dataObj.communication_style_id,
      family_plan_id: dataObj.family_plan_id,
      personality_type_id: dataObj.personality_type_id,
      pet_id: dataObj.pet_id,
      zodiac_id: dataObj.zodiac_id,
      preferred_gender_id: dataObj.preferred_gender_id,
    },
  ];

  // -------------------------------
  // REPORT
  // -------------------------------
 const submitReport = async () => {
    if (!reason) return;

    try {
      const token = await config.getToken("token");

      await axios.post(
        config.BASE_URL + "/settings/report",
        {
          reported_id: profileData?.token || finalData?.token,
          reason_id: reason,
          reason_custom: reason === 99 ? customReason : null,
        },
        { headers: { token } }
      );

      Toast.show({ type: "success", text1: "User Reported" });
    } catch (err) {
      Toast.show({ type: "error", text1: "Failed to report" });
    }

    setReportVisible(false);
    setReason(null);
    setCustomReason("");
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="container-fluid px-lg-5">

      <button
        className="btn btn-outline-light mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {!editable && (
        <div className="d-flex justify-content-end mb-3">
          <div className="dropdown">
            <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
              ⋮
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <button className="dropdown-item" onClick={() => setReportVisible(true)}>
                  Report
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TOP CARD */}
      <div className="card shadow-lg mb-5">
        <div className="card-body p-5">
          <div className="row g-5">

            <div className="col-lg-4 text-center">
              <div className="card border-light rounded-4 overflow-hidden mx-auto"
                style={{ width: "300px", height: "500px" }}>
                <PhotoInput
                  imageurl={utils.urlConverter(photos[0]?.photo_url)}
                  photo_id={photos[0]?.photo_id}
                  index={0}
                  editable={editable}
                />

              </div>
            </div>

            <div className="col-lg-8">
              <h1 className="fw-bold">{dataObj.user_name}</h1>
              <p className="text-secondary">{dataObj.tagline}</p>

              <hr />

              <h6 className="text-uppercase text-secondary">Bio</h6>
              <textarea
                className="form-control mb-4"
                value={profile.bio || ""}
                disabled={!editable}
                onChange={e => handleChange("bio", e.target.value)}
                style={{ height: "130px" }}
              />

              <div className="row g-3">
                {["height", "weight"].map(f => (
                  <div className="col-md-4" key={f}>
                    <label className="small text-secondary">{f}</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profile[f] || ""}
                      disabled={!editable}
                      onChange={e => handleChange(f, e.target.value)}
                    />
                  </div>
                ))}

                <div className="col-md-4">
                  <MySelect
                    label="Gender"
                    value={profile.gender}
                    options={genderList}
                    noDropdown={!editable}
                    onChange={e => handleChange("gender", e.target.value)}
                  />
                </div>
              </div>

              {(editable || profile.image_prompt) && (
                <>
                  <hr className="mt-4" />
                  <h6 className="text-uppercase text-secondary">Image Prompt</h6>
                  <textarea
                    className="form-control"
                    value={profile.image_prompt || ""}
                    disabled={!editable}
                    onChange={e => handleChange("image_prompt", e.target.value)}
                  />
                </>
              )}

              {editable && Object.keys(dirty).length > 0 && (
                <div className="mt-4 d-flex justify-content-end gap-3">
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleUpdate}>
                    Save
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* BLOCKS */}
      {blocks.map((grp, index) => (
        <ProfileViewBlock
          key={index}
          dataObj={grp}
          photos={photos}
          editable={editable}
          index={Math.min(index + 1, photos.length - 1)}
          reverse={index % 2 === 1}
        />
      ))}

      {/* REPORT MODAL */}
      {reportVisible && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Report User</h5>
                <button className="btn-close btn-close-white"
                  onClick={() => setReportVisible(false)} />
              </div>

              <div className="modal-body">
                <MySelect
                  label="Reason"
                  value={reason}
                  options={reportReasons.map(r => ({
                    id: r.reason_id,
                    name: r.name
                  }))}
                  onChange={(e) => setReason(e.target.value)}
                />

                {reason === 99 && (
                  <textarea
                    className="form-control mt-3"
                    placeholder="Enter custom reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                  />
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary"
                  onClick={() => setReportVisible(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger"
                  onClick={submitReport}>
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
