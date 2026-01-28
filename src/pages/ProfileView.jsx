import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import config from "../services/config";
import { utils } from "../utils";

import PhotoInput from "../Components/ImageInput/PhotoInput";
import MySelect from "../Components/MySelect";
import { ProfileViewBlock } from "../Components/ProfileViewBlocks";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPhotos } from "../redux/photosSlice";
import { setUserDetails } from "../redux/userDetailsSlice";
import { updateUserDetails } from "../redux/userDetailsThunks";

export const ProfileView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const { dataObj, photos: routePhotos, editable, token } = state || {};

  // Redux data (current logged-in user)
  const reduxUserDetails = useSelector((s) => s.userDetails.data);
  const reduxPhotos = useSelector((s) => s.photos.data);

  // final source
  const finalData = editable ? reduxUserDetails : dataObj;
  const finalPhotos = editable ? reduxPhotos : routePhotos;

  if (!finalData) return null;

  // ================== COMPONENT STATES ==================
  const [genderList, setGenderList] = useState([]);

  const [profile, setProfile] = useState({});
  const [original, setOriginal] = useState({});
  const [dirty, setDirty] = useState({});

  // Report
  const [reportVisible, setReportVisible] = useState(false);
  const [reason, setReason] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [reportReasons, setReportReasons] = useState([]);

  // ================== INITIAL LOAD ==================
  useEffect(() => {
    const headers = { token: sessionStorage.getItem("token") };

    axios.get(`${config.BASE_URL}/api/gender`, { headers }).then((r) =>
      setGenderList(r.data.data)
    );

    // initial form load
    const merged = {
      ...finalData,
      image_prompt: finalPhotos?.[0]?.prompt || "",
    };

    setProfile(merged);
    setOriginal(merged);
    setDirty({});
  }, [finalData]); // DO NOT depend on finalPhotos → prevents infinite resets

  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/api/report-reasons`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((r) => setReportReasons(r.data.data));
  }, []);

  // ================== HANDLE CHANGE ==================
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

  // ================== BLOCK USER ==================
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
      alert("Block failed");
    }
  };

  // ================== REPORT USER ==================
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

  // ================== UPDATE PROFILE ==================
  const handleUpdate = async () => {
    if (!Object.keys(dirty).length) return;

    const headers = { token: sessionStorage.getItem("token") };

    const unifiedPayload = { ...dirty };

    // Extract prompt separately
    const promptValue = unifiedPayload.image_prompt;
    delete unifiedPayload.image_prompt;

    try {
      // 1) Update user details via unified PUT (Redux thunk)
      if (Object.keys(unifiedPayload).length > 0) {
        await dispatch(updateUserDetails(unifiedPayload));
      }

      // 2) Update prompt if changed
      if (promptValue !== undefined) {
        await axios.patch(
          `${config.BASE_URL}/photos/prompt`,
          {
            photo_id: finalPhotos?.[0]?.photo_id,
            prompt: promptValue,
          },
          { headers }
        );

        // update redux photos
        dispatch(
          setPhotos(
            finalPhotos.map((p, i) =>
              i === 0 ? { ...p, prompt: promptValue } : p
            )
          )
        );
      }

      // update Redux details
      dispatch(setUserDetails({ ...finalData, ...dirty }));

      setOriginal(profile);
      setDirty({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setProfile(original);
    setDirty({});
  };

  // ================== PROFILE SECTIONS ==================
  const repeatedBlocks = [
    { dob: finalData.dob, location: finalData.location, mother_tongue: finalData.mother_tongue, religion: finalData.religion },

    { education: finalData.education, job_industry: finalData.job_industry, looking_for: finalData.looking_for, open_to: finalData.open_to },

    { drinking: finalData.drinking, smoking: finalData.smoking, workout: finalData.workout, dietary: finalData.dietary, sleeping_habit: finalData.sleeping_habit },

    { love_style: finalData.love_style, communication_style: finalData.communication_style, family_plan: finalData.family_plan, personality_type: finalData.personality_type, pet: finalData.pet, zodiac: finalData.zodiac, preferred_gender: finalData.preferred_gender },
  ];

  // ================== UI ==================
  return (
    <div className="container-fluid px-lg-5">

      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-light mb-3"
        onClick={() =>
          navigate(-1, { state: { returnIndex: state?.cardIndex } })
        }
      >
        ← Back
      </button>

      {/* MENU */}
      <div className="d-flex justify-content-end mb-3">
        <div className="dropdown">
          <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            ⋮
          </button>

          <ul className="dropdown-menu dropdown-menu-dark">
            <li><button className="dropdown-item" onClick={() => setReportVisible(true)}>Report</button></li>
            <li><button className="dropdown-item" onClick={handleBlock}>Block</button></li>
          </ul>
        </div>
      </div>

      {/* ================== HERO CARD ================== */}
      <div className="card text-white shadow-lg mb-5">
        <div className="card-body p-5">
          <div className="row g-5">

            {/* PHOTO */}
            <div className="col-lg-4 text-center">
              <div className="card border-light rounded-4 overflow-hidden mx-auto" style={{ width: "300px", height: "500px" }}>
                <PhotoInput
                  dataURLtoFile={utils.dataURLtoFile}
                  imageurl={utils.urlConverter(finalPhotos?.[0]?.photo_url)}
                />
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="col-lg-8">
              <h1 className="fw-bold">{finalData.user_name}</h1>
              <p className="fst-italic text-secondary">{finalData.tagline}</p>

              <hr />

              {/* BIO */}
              <h6 className="text-uppercase text-secondary">Bio</h6>
              <textarea
                className="form-control mb-4"
                style={{ height: "130px" }}
                value={profile.bio || ""}
                disabled={!editable}
                onChange={(e) => handleChange("bio", e.target.value)}
              />

              {/* HEIGHT – WEIGHT – GENDER */}
              <div className="row g-3">
                {["height", "weight"].map((field) => (
                  <div className="col-md-4" key={field}>
                    <label className="small text-secondary text-uppercase">
                      {field}
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      disabled={!editable}
                      value={profile[field] || ""}
                      onChange={(e) => editable && handleChange(field, e.target.value)}
                    />
                  </div>
                ))}

                <div className="col-md-4">
                  <MySelect
                    label="Gender"
                    value={profile.gender}
                    options={genderList}
                    noDropdown={!editable}
                    onChange={(e) => editable && handleChange("gender", e.target.value)}
                  />
                </div>
              </div>

              {/* IMAGE PROMPT */}
              {(editable || profile.image_prompt) && (
                <>
                  <hr className="mt-4" />
                  <h6 className="text-uppercase text-secondary">Image Prompt</h6>

                  <textarea
                    className="form-control"
                    value={profile.image_prompt || ""}
                    disabled={!editable}
                    onChange={(e) => handleChange("image_prompt", e.target.value)}
                  ></textarea>
                </>
              )}

              {/* UPDATE BUTTONS */}
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

      {/* ================== SECTIONS (BLOCKS) ================== */}
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

      {/* ================== REPORT MODAL ================== */}
      {reportVisible && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Report User</h5>
                <button className="btn-close btn-close-white" onClick={() => setReportVisible(false)} />
              </div>

              <div className="modal-body">
                <MySelect
                  label="Reason"
                  value={reason}
                  options={reportReasons.map((r) => ({ id: r.reason_id, name: r.name }))}
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
