import { useEffect, useState, useContext } from "react";
import axios from "axios";
import config from "../services/config";
import { utils } from "../utils";
import PhotoInput from "./ImageInput/PhotoInput";
import MySelect from "../Components/MySelect";
import { UserContext } from "../app/App";

export const ProfileViewBlock = ({
  dataObj,
  photos,
  reverse,
  editable,
  index,
}) => {
  const { setUserDetails } = useContext(UserContext);
  console.log(dataObj)
  const [profile, setProfile] = useState({});
  const [originalProfile, setOriginalProfile] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});

  /* ================= INIT ================= */
  useEffect(() => {
    setProfile(dataObj || {});
    setOriginalProfile(dataObj || {});
    setDirtyFields({});
  }, [dataObj]);

  /* ================= CHANGE ================= */
  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));

    if (originalProfile[field] !== value) {
      setDirtyFields(prev => ({ ...prev, [field]: value }));
    } else {
      setDirtyFields(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!Object.keys(dirtyFields).length) return;

    try {
      await axios.patch(
        `${config.BASE_URL}/user/userdetails`,
        dirtyFields,
        { headers: { token: sessionStorage.getItem("token") } }
      );

      if (editable) {
        setUserDetails(prev => ({ ...prev, ...dirtyFields }));
      }

      setOriginalProfile(profile);
      setDirtyFields({});
    } catch (err) {
      console.log("Patch failed:", err);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setDirtyFields({});
  };

  /* ================= LOOKUPS ================= */
  const [jobIndustryList, setJobIndustryList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [lookingForList, setLookingForList] = useState([]);
  const [loveStyleList, setLoveStyleList] = useState([]);
  const [motherTongueList, setMotherTongueList] = useState([]);
  const [familyPlanList, setFamilyPlanList] = useState([]);
  const [drinkingList, setDrinkingList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [communicationStyleList, setCommunicationStyleList] = useState([]);
  const [openToList, setOpenToList] = useState([]);
  const [personalityTypeList, setPersonalityTypeList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [religionList, setReligionList] = useState([]);
  const [sleepingHabitList, setSleepingHabitList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  const [zodiacList, setZodiacList] = useState([]);

  /* ================= DROPDOWN CONFIG (FIXED) ================= */
  const dropDownData = {
    job_industry: { label: "Job Industry", options: jobIndustryList },
    location: { label: "Location", options: locationList },
    looking_for: { label: "Looking For", options: lookingForList },
    love_style: { label: "Love Style", options: loveStyleList },
    mother_tongue: { label: "Mother Tongue", options: motherTongueList },
    family_plan: { label: "Family Plan", options: familyPlanList },
    drinking: { label: "Drinking", options: drinkingList },
    education: { label: "Education", options: educationList },
    communication_style: { label: "Communication Style", options: communicationStyleList },
    open_to: { label: "Open To", options: openToList },
    personality_type: { label: "Personality Type", options: personalityTypeList },
    pet: { label: "Pet", options: petList },
    religion: { label: "Religion", options: religionList },
    sleeping_habit: { label: "Sleeping Habit", options: sleepingHabitList },
    workout: { label: "Workout", options: workoutList },
    zodiac: { label: "Zodiac", options: zodiacList },
  };

  /* ================= FETCH LOOKUPS ================= */
  useEffect(() => {
    const headers = { token: sessionStorage.getItem("token") };

    axios.get(`${config.BASE_URL}/api/job-industry`, { headers }).then(r => setJobIndustryList(r.data.data));
    axios.get(`${config.BASE_URL}/api/lookingfor`, { headers }).then(r => setLookingForList(r.data.data));
    axios.get(`${config.BASE_URL}/api/lovestyle`, { headers }).then(r => setLoveStyleList(r.data.data));
    axios.get(`${config.BASE_URL}/api/mother-tongue`, { headers }).then(r => setMotherTongueList(r.data.data));
    axios.get(`${config.BASE_URL}/api/familyplan`, { headers }).then(r => setFamilyPlanList(r.data.data));
    axios.get(`${config.BASE_URL}/api/drinking`, { headers }).then(r => setDrinkingList(r.data.data));
    axios.get(`${config.BASE_URL}/api/education`, { headers }).then(r => setEducationList(r.data.data));
    axios.get(`${config.BASE_URL}/api/communicationstyle`, { headers }).then(r => setCommunicationStyleList(r.data.data));
    axios.get(`${config.BASE_URL}/api/opento`, { headers }).then(r => setOpenToList(r.data.data));
    axios.get(`${config.BASE_URL}/api/personalitytype`, { headers }).then(r => setPersonalityTypeList(r.data.data));
    axios.get(`${config.BASE_URL}/api/pet`, { headers }).then(r => setPetList(r.data.data));
    axios.get(`${config.BASE_URL}/api/religion`, { headers }).then(r => setReligionList(r.data.data));
    axios.get(`${config.BASE_URL}/api/sleepingHabit`, { headers }).then(r => setSleepingHabitList(r.data.data));
    axios.get(`${config.BASE_URL}/api/workout`, { headers }).then(r => setWorkoutList(r.data.data));
    axios.get(`${config.BASE_URL}/api/zodiac`, { headers }).then(r => setZodiacList(r.data.data));
  }, []);

  /* ================= UI ================= */
  return (
    <div className="container-fluid py-5 border-bottom border-secondary">
      <div className={`row align-items-center g-5 ${reverse ? "flex-row-reverse" : ""}`}>

        {/* IMAGE */}
        <div className="col-lg-4 text-center">
          <div className="card bg-dark border-light rounded-4 overflow-hidden mx-auto"
               style={{ width: "300px", height: "500px" }}>
            <PhotoInput
              dataURLtoFile={utils.dataURLtoFile}
              imageurl={utils.urlConverter(photos?.[index]?.photo_url)}
            />
          </div>
        </div>

        {/* FIELDS */}
        <div className="col-lg-8">
          <div className="card bg-dark text-white border-secondary rounded-4">
            <div className="card-body p-4">

              {Object.entries(profile).map(([key, value]) =>
                dropDownData[key] ? (
                  <MySelect
                    key={key}
                    label={dropDownData[key].label}
                    value={value}
                    options={dropDownData[key].options}
                    noDropdown={!editable}
                    onChange={(e) =>
                      editable && handleChange(key, e.target.value)
                    }
                  />
                ) : null
              )}

              {editable && Object.keys(dirtyFields).length > 0 && (
                <div className="text-end mt-4 d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleUpdate}>
                    Update This Section
                  </button>
                </div>
              )}

              {/* IMAGE PROMPT */}
              {(editable || photos.image_prompt) && (
                <>
                  <hr className="border-secondary mt-4" />
                  <h6 className="text-uppercase text-secondary">Image Prompt</h6>
                  <textarea
                    className="form-control bg-dark text-white"
                    defaultValue={photos?.[index]?.prompt ?? ""}
                  />
                </>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
