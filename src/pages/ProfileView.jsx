import { useLocation } from "react-router";
import { utils } from "../utils";
import { ProfileViewBlock } from "../Components/ProfileViewBlocks";
import PhotoInput from "../Components/ImageInput/PhotoInput";
import { useContext } from "react";
import { UserContext } from "../app/App";

export const ProfileView = () => {
  const { state } = useLocation();
  const { dataObj, photos, editable } = state || {};

  const {
    userDetails,
    photos: myPhotos
  } = useContext(UserContext);

  // ✔ Final data selection
  const finalData = editable ? userDetails : dataObj;
  const finalPhotos = editable ? myPhotos : photos;

  if (!finalData) return null;

  const repeatedBlocks = [
    {
      job_industry: finalData.job_industry,
      location: finalData.location,
      looking_for: finalData.looking_for,
      love_style: finalData.love_style,
      mother_tongue: finalData.mother_tongue,
    },
    {
      family_plan: finalData.family_plan,
      drinking: finalData.drinking,
      education: finalData.education,
      communication_style: finalData.communication_style,
    },
    {
      open_to: finalData.open_to,
      personality_type: finalData.personality_type,
      pet: finalData.pet,
      preferred_gender: finalData.preferred_gender,
      religion: finalData.religion,
    },
    {
      sleeping_habit: finalData.sleeping_habit,
      workout: finalData.workout,
      zodiac: finalData.zodiac,
    },
  ];

  return (
    <div className="container-fluid px-lg-5">

      {/* HERO */}
      <div className="card bg-dark text-white shadow-lg mb-5">
        <div className="card-body p-5">
          <div className="row align-items-start g-5">

            {/* PHOTO */}
            <div className="col-lg-4 text-center">
              <div
                className="card bg-black border-light rounded-4 overflow-hidden mx-auto"
                style={{ maxWidth: "320px", height: "480px" }}
              >
                <PhotoInput
                  dataURLtoFile={utils.dataURLtoFile}
                  imageurl={utils
                    .urlConverter(finalPhotos?.[1]?.photo_url)}
                />
              </div>
            </div>

            {/* TEXT DETAILS */}
            <div className="col-lg-8">
              <h1 className="fw-bold">{finalData.user_name}</h1>
              <p className="fst-italic text-secondary">{finalData.tagline}</p>

              <hr className="border-secondary" />

              {/* BIO */}
              <h6 className="text-uppercase text-secondary">Bio</h6>
              {editable ? (
                <textarea
                  className="form-control bg-dark text-white mb-4"
                  defaultValue={finalData.bio}
                  style={{ height: "130px" }}
                />
              ) : (
                <p className="border rounded p-3 mb-4">{finalData.bio}</p>
              )}

              {/* HEIGHT + WEIGHT + GENDER */}
              <div className="row g-3">
                {["height", "weight", "gender"].map(field => (
                  <div className="col-md-4" key={field}>
                    <label className="small text-secondary text-uppercase">
                      {field}
                    </label>
                    <input
                      className="form-control bg-dark text-white"
                      readOnly={!editable}
                      defaultValue={finalData[field] ?? ""}
                    />
                  </div>
                ))}
              </div>

              {/* IMAGE PROMPT */}
              {(editable || finalData.image_prompt) && (
                <>
                  <hr className="border-secondary mt-4" />
                  <h6 className="text-uppercase text-secondary">Image Prompt</h6>
                  <textarea
                    className="form-control bg-dark text-white"
                    defaultValue={finalData.image_prompt ?? ""}
                  />
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* BLOCKS */}
      {repeatedBlocks.map((fields, i) => (
        <ProfileViewBlock
          key={i}
          dataObj={fields}
          photos={finalPhotos}
          editable={editable}
          index={i}
          reverse={i % 2 === 1}
        />
      ))}
    </div>
  );
};
