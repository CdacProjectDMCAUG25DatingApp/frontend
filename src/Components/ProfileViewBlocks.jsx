import { useEffect, useState, useContext } from "react";
import axios from "axios";
import config from "../services/config";
import { utils } from "../utils";
import PhotoInput from "./ImageInput/PhotoInput";
import MySelect from "../Components/MySelect";
import { UserContext } from "../app/App";
import { Calendar } from "primereact/calendar";


export const ProfileViewBlock = ({
    dataObj,
    photos,
    reverse,
    editable,
    index,
}) => {
    const [profile, setProfile] = useState({});
    const [originalProfile, setOriginalProfile] = useState({});
    const [dirtyFields, setDirtyFields] = useState({});
    const { photos: contextPhotos, setPhotos } = useContext(UserContext);
    const maritalStatusOptions = [{ id: 1, value: 1, name: "Yes" },
    { id: 0, value: 0, name: "No" },
    { id: 2, value: null, name: "Hide" },
    ];

    /* ================= INIT ================= */
    useEffect(() => {
        setProfile({
            ...dataObj,
            image_prompt: photos?.[index]?.prompt || ""
        });
        setOriginalProfile({
            ...dataObj,
            image_prompt: photos?.[index]?.prompt || ""
        });
        setDirtyFields({});
    }, [dataObj, photos, index]);

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
            // 🔹 update preferences
            await axios.patch(
                `${config.BASE_URL}/user/userdetails`,
                dirtyFields,
                { headers: { token: sessionStorage.getItem("token") } }
            );

            // 🔹 update image prompt (only if changed)
            if (dirtyFields.image_prompt !== undefined) {
                await axios.patch(
                    `${config.BASE_URL}/user/photo/prompt`,
                    {
                        photo_id: photos[index].photo_id,
                        prompt: dirtyFields.image_prompt
                    },
                    { headers: { token: sessionStorage.getItem("token") } }
                );

                // 🔥 FIX: update local photo prompt so UI does not revert
                setPhotos(prev => {
                    const copy = [...prev];
                    copy[index] = { ...copy[index], prompt: dirtyFields.image_prompt };
                    return copy;
                });
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
    const [smokingList, setSmokingList] = useState([]);
    const [dietaryList, setDietaryList] = useState([]);
    const [genderList, setGenderList] = useState([]);


    /* ================= DROPDOWN CONFIG (FIXED) ================= */
    const dropDownData = {
        job_industry: { label: "Job Industry", options: jobIndustryList },
        location: { label: "Location", options: locationList },
        looking_for: { label: "Looking For", options: lookingForList },
        love_style: { label: "Love Style", options: loveStyleList },
        mother_tongue: { label: "Mother Tongue", options: motherTongueList },
        family_plan: { label: "Family Plan", options: familyPlanList },
        drinking: { label: "Drinking", options: drinkingList },
        smoking: { label: "Smoking", options: smokingList },         // 🔥 FIXED
        dietary: { label: "Dietary", options: dietaryList },         // 🔥 FIXED
        education: { label: "Education", options: educationList },
        communication_style: { label: "Communication Style", options: communicationStyleList },
        open_to: { label: "Open To", options: openToList },
        preferred_gender: { label: "Preferred Gender", options: genderList },  // 🔥 FIXED
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
        axios.get(`${config.BASE_URL}/api/smoking`, { headers }).then(r => setSmokingList(r.data.data));
        axios.get(`${config.BASE_URL}/api/dietary`, { headers }).then(r => setDietaryList(r.data.data));
        axios.get(`${config.BASE_URL}/api/gender`, { headers }).then(r => setGenderList(r.data.data));

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
                            {Object.entries(profile)
                                .filter(([key]) => key !== "image_prompt")
                                .map(([key, value]) => {

                                    /* ================= DOB (Calendar) ================= */
                                    if (key === "dob") {
                                        return (
                                            <div key={key} className="mb-3">
                                                <label className="text-secondary text-uppercase small">Date of Birth</label>

                                                {editable ? (
                                                    /* When editing → show Calendar */
                                                    <Calendar
                                                        id="dob"
                                                        value={value ? new Date(value) : null}
                                                        onChange={(e) => handleChange("dob", e.value)}
                                                        showIcon
                                                        iconPos="right"
                                                        placeholder="Select Date"
                                                        className="w-100"
                                                        inputClassName="form-control bg-dark text-white"
                                                        showButtonBar
                                                        touchUI={window.innerWidth < 768}
                                                    />
                                                ) : (
                                                    /* When NOT editing → show formatted date */
                                                    <p className="form-control bg-dark text-white">
                                                        {value ? new Date(value).toLocaleDateString() : "Not set"}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }

                                    /* ================= MARITAL STATUS (Dropdown) ================= */
                                    if (key === "marital_status") {
                                        return (
                                            value && <MySelect
                                                key={key}
                                                label="Marital Status"
                                                value={value === null || value === undefined ? "" : Number(value)}
                                                options={maritalStatusOptions}
                                                noDropdown={!editable}
                                                onChange={(e) =>
                                                    editable && handleChange("marital_status", Number(e.target.value))
                                                }
                                            />
                                        );
                                    }


                                    /* ================= NORMAL SELECT FIELDS ================= */
                                    if (dropDownData[key]) {
                                        return (
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
                                        );
                                    }

                                    /* ================= NORMAL INPUTS ================= */
                                    return (
                                        <div key={key} className="mb-3">
                                            <label className="text-secondary text-uppercase small">
                                                {key.replace(/_/g, " ")}
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control bg-dark text-white"
                                                value={value || ""}
                                                disabled={!editable}
                                                onChange={(e) =>
                                                    editable && handleChange(key, e.target.value)
                                                }
                                            />
                                        </div>
                                    );
                                })}



                            {/* IMAGE PROMPT */}
                            {(editable || photos?.[index]?.prompt) && (
                                <>
                                    <hr className="border-secondary mt-4" />
                                    <h6 className="text-uppercase text-secondary">Image Prompt</h6>

                                    <textarea
                                        className="form-control bg-dark text-white"
                                        value={profile.image_prompt || ""}
                                        disabled={!editable}
                                        onChange={(e) =>
                                            editable && handleChange("image_prompt", e.target.value)
                                        }
                                    />
                                </>
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



                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
