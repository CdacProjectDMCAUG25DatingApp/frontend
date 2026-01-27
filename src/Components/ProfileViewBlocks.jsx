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
    const { setPhotos, setUserDetails } = useContext(UserContext);

    const [profile, setProfile] = useState({});
    const [originalProfile, setOriginalProfile] = useState({});
    const [dirtyFields, setDirtyFields] = useState({});

    /* ================= INIT ================= */
    useEffect(() => {
        const merged = {
            ...dataObj,
            image_prompt: photos?.[index]?.prompt || "",
        };
        setProfile(merged);
        setOriginalProfile(merged);
        setDirtyFields({});
    }, [dataObj, photos, index]);

    /* ================= CHANGE HANDLER ================= */
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

    /* ================= UPDATE HANDLER ================= */
    const handleUpdate = async () => {
        if (!Object.keys(dirtyFields).length) return;

        const token = sessionStorage.getItem("token");

        try {
            // Split fields into PROFILE TABLE vs PREFERENCES TABLE
            const profileFields = [
                "bio",
                "height",
                "weight",
                "gender",
                "tagline",
                "dob",
                "marital_status",
                "location",
                "mother_tongue",
                "religion",
                "education",
                "job_industry_id",
            ];

            const profilePayload = {};
            const preferencePayload = {};

            Object.keys(dirtyFields).forEach((key) => {
                if (profileFields.includes(key)) {
                    profilePayload[key] = dirtyFields[key];
                } else {
                    preferencePayload[key] = dirtyFields[key];
                }
            });

            // 🔥 Update PROFILE table
            if (Object.keys(profilePayload).length > 0) {
                await axios.patch(`${config.BASE_URL}/user/profile`, profilePayload, {
                    headers: { token },
                });
            }

            // 🔥 Update PREFERENCES table
            if (Object.keys(preferencePayload).length > 0) {
                await axios.patch(
                    `${config.BASE_URL}/user/userdetails`,
                    preferencePayload,
                    { headers: { token } }
                );
            }

            // 🔥 Update Image Prompt
            if (dirtyFields.image_prompt !== undefined) {
                await axios.patch(
                    `${config.BASE_URL}/user/photo/prompt`,
                    {
                        photo_id: photos[index].photo_id,
                        prompt: dirtyFields.image_prompt,
                    },
                    { headers: { token } }
                );

                // update UI photo context
                setPhotos((prev) => {
                    const copy = [...prev];
                    copy[index] = {
                        ...copy[index],
                        prompt: dirtyFields.image_prompt,
                    };
                    return copy;
                });
            }

            // 🔥 Update userDetails in context
            setUserDetails((prev) => ({
                ...prev,
                ...dirtyFields,
            }));

            setOriginalProfile(profile);
            setDirtyFields({});
        } catch (err) {
            console.log("Update failed:", err);
        }
    };

    /* ================= FETCH LOOKUPS ================= */

    const [jobIndustryList, setJobIndustryList] = useState([]);
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

    useEffect(() => {
        const headers = { token: sessionStorage.getItem("token") };

        axios.get(`${config.BASE_URL}/api/job-industry`, { headers }).then((r) => setJobIndustryList(r.data.data));
        axios.get(`${config.BASE_URL}/api/lookingfor`, { headers }).then((r) => setLookingForList(r.data.data));
        axios.get(`${config.BASE_URL}/api/lovestyle`, { headers }).then((r) => setLoveStyleList(r.data.data));
        axios.get(`${config.BASE_URL}/api/mother-tongue`, { headers }).then((r) => setMotherTongueList(r.data.data));
        axios.get(`${config.BASE_URL}/api/familyplan`, { headers }).then((r) => setFamilyPlanList(r.data.data));
        axios.get(`${config.BASE_URL}/api/drinking`, { headers }).then((r) => setDrinkingList(r.data.data));
        axios.get(`${config.BASE_URL}/api/education`, { headers }).then((r) => setEducationList(r.data.data));
        axios.get(`${config.BASE_URL}/api/communicationstyle`, { headers }).then((r) => setCommunicationStyleList(r.data.data));
        axios.get(`${config.BASE_URL}/api/opento`, { headers }).then((r) => setOpenToList(r.data.data));
        axios.get(`${config.BASE_URL}/api/personalitytype`, { headers }).then((r) => setPersonalityTypeList(r.data.data));
        axios.get(`${config.BASE_URL}/api/pet`, { headers }).then((r) => setPetList(r.data.data));
        axios.get(`${config.BASE_URL}/api/religion`, { headers }).then((r) => setReligionList(r.data.data));
        axios.get(`${config.BASE_URL}/api/sleepingHabit`, { headers }).then((r) => setSleepingHabitList(r.data.data));
        axios.get(`${config.BASE_URL}/api/workout`, { headers }).then((r) => setWorkoutList(r.data.data));
        axios.get(`${config.BASE_URL}/api/zodiac`, { headers }).then((r) => setZodiacList(r.data.data));
        axios.get(`${config.BASE_URL}/api/smoking`, { headers }).then((r) => setSmokingList(r.data.data));
        axios.get(`${config.BASE_URL}/api/dietary`, { headers }).then((r) => setDietaryList(r.data.data));
        axios.get(`${config.BASE_URL}/api/gender`, { headers }).then((r) => setGenderList(r.data.data));
    }, []);

    /* ================= DROP-DOWN MAP ================= */
    const dropDownData = {
        job_industry: { label: "Job Industry", options: jobIndustryList },
        looking_for: { label: "Looking For", options: lookingForList },
        love_style: { label: "Love Style", options: loveStyleList },
        mother_tongue: { label: "Mother Tongue", options: motherTongueList },
        family_plan: { label: "Family Plan", options: familyPlanList },
        drinking: { label: "Drinking", options: drinkingList },
        smoking: { label: "Smoking", options: smokingList },
        dietary: { label: "Dietary", options: dietaryList },
        education: { label: "Education", options: educationList },
        communication_style: {
            label: "Communication Style",
            options: communicationStyleList,
        },
        open_to: { label: "Open To", options: openToList },
        preferred_gender: { label: "Preferred Gender", options: genderList },
        personality_type: {
            label: "Personality Type",
            options: personalityTypeList,
        },
        pet: { label: "Pet", options: petList },
        religion: { label: "Religion", options: religionList },
        sleeping_habit: {
            label: "Sleeping Habit",
            options: sleepingHabitList,
        },
        workout: { label: "Workout", options: workoutList },
        zodiac: { label: "Zodiac", options: zodiacList },
    };

    /* ================= UI ================= */
    return (
        <div className="container-fluid py-5 border-bottom ">
            <div
                className={`row align-items-center g-5 ${reverse ? "flex-row-reverse" : ""
                    }`}
            >
                {/* ==== IMAGE ==== */}
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

                {/* ==== FIELDS ==== */}
                <div className="col-lg-8">
                    <div className="card  rounded-4">
                        <div className="card-body p-4">
                            {Object.entries(profile)
                                .filter(([key]) => key !== "image_prompt")
                                .map(([key, value]) => {
                                    /* ===== DOB ===== */
                                    if (key === "dob") {
                                        return (
                                            <div key={key} className="mb-3">
                                                <label className="text-secondary text-uppercase small">
                                                    Date of Birth
                                                </label>

                                                {editable ? (
                                                    <Calendar
                                                        id="dob"
                                                        value={value ? new Date(value) : null}
                                                        onChange={(e) => handleChange("dob", e.value)}
                                                        showIcon
                                                        iconPos="right"
                                                        placeholder="Select Date"
                                                        className="w-100"
                                                        inputClassName="form-control "
                                                        showButtonBar
                                                        touchUI={window.innerWidth < 768}
                                                    />
                                                ) : (
                                                    <p className="form-control ">
                                                        {value
                                                            ? new Date(value).toLocaleDateString()
                                                            : "Not set"}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }

                                    /* ===== MARITAL STATUS ===== */
                                    if (key === "marital_status") {
                                        const maritalOptions = [
                                            { id: 1, name: "Yes" },
                                            { id: 0, name: "No" },
                                            { id: 2, name: "Hide" },
                                        ];

                                        return (
                                            <MySelect
                                                key={key}
                                                label="Marital Status"
                                                value={value}
                                                options={maritalOptions}
                                                noDropdown={!editable}
                                                onChange={(e) =>
                                                    handleChange("marital_status", e.target.value)
                                                }
                                            />
                                        );
                                    }

                                    /* ===== SELECT FIELDS ===== */
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

                                    /* ===== NORMAL TEXT INPUT ===== */
                                    return (
                                        <div key={key} className="mb-3">
                                            <label className="text-secondary text-uppercase small">
                                                {key.replace(/_/g, " ")}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control "
                                                value={value || ""}
                                                disabled={!editable}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                            />
                                        </div>
                                    );
                                })}

                            {/* ==== IMAGE PROMPT FIELD ==== */}
                            {(editable || photos?.[index]?.prompt) && (
                                <>
                                    <hr className=" mt-4" />
                                    <h6 className="text-uppercase text-secondary">
                                        Image Prompt
                                    </h6>

                                    <textarea
                                        className="form-control"
                                        value={profile.image_prompt || ""}
                                        disabled={!editable}
                                        onChange={(e) => handleChange("image_prompt", e.target.value)}
                                    />
                                </>
                            )}

                            {/* ==== SAVE / CANCEL ==== */}
                            {editable && Object.keys(dirtyFields).length > 0 && (
                                <div className="text-end mt-4 d-flex justify-content-end gap-2">
                                    <button className="btn btn-secondary" onClick={() => {
                                        setProfile(originalProfile);
                                        setDirtyFields({});
                                    }}>
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
