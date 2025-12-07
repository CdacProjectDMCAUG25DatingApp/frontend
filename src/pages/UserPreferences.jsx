import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import config from '../services/config';
import { UserContext } from '../App';
import { addUserPreferences } from '../services/userPreferences';

function UserPreferences() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const [lookingFor, setLookingFor] = useState("");
    const [openTo, setOpenTo] = useState("");
    const [zodiac, setZodiac] = useState("");
    const [familyPlan, setFamilyPlan] = useState("");
    const [education, setEducation] = useState("");
    const [communicationStyle, setCommunicationStyle] = useState("");
    const [lovestyle, setLoveStyle] = useState("");
    const [drinking, setDrinking] = useState("");
    const [smoking, setSmoking] = useState("");
    const [workout, setWorkout] = useState("");
    const [dietary, setDietary] = useState("");
    const [sleepingHabit, setSleepingHabit] = useState("");
    const [religion, setReligion] = useState("");
    const [personalityType, setPersonalityType] = useState("");
    const [pet, setPet] = useState("");

    const [lookingForList, setLookingForList] = useState([]);
    const [openToList, setOpenToList] = useState([]);
    const [zodiacList, setZodiacList] = useState([]);
    const [familyPlanList, setFamilyPlanList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [communicationStyleList, setCommunicationStyleList] = useState([]);
    const [loveStyleList, setLoveStyleList] = useState([]);
    const [drinkingList, setDrinkingList] = useState([]);
    const [smokingList, setSmokingList] = useState([]);
    const [workoutList, setWorkoutList] = useState([]);
    const [dietaryList, setDietaryList] = useState([]);
    const [sleepingHabitList, setSleepingHabitList] = useState([]);
    const [religionList, setReligionList] = useState([]);
    const [personalityTypeList, setPersonalityTypeList] = useState([]);
    const [petList, setPetList] = useState([]);

    useEffect(() => {
        console.log(user)
        fetchAllLookups();
    }, []);

    const fetchAllLookups = async () => {
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        try {

            const [
                lookingForRes,
                openToRes,
                zodiacRes,
                familyPlanRes,
                educationRes,
                communicationStyleRes,
                loveStyleRes,
                drinkingRes,
                smokingRes,
                workoutRes,
                dietaryRes,
                sleepingHabitRes,
                religionRes,
                personalityTypeRes,
                petRes,

            ] = await Promise.all([
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
                axios.get(config.BASE_URL + "/api/personalityType", { headers }),
                axios.get(config.BASE_URL + "/api/pet", { headers }),
            ]);

            setLookingForList(lookingForRes.data.data);
            setOpenToList(openToRes.data.data);
            setZodiacList(zodiacRes.data.data);
            setFamilyPlanList(familyPlanRes.data.data);
            setEducationList(educationRes.data.data);
            setCommunicationStyleList(communicationStyleRes.data.data)
            setLoveStyleList(loveStyleRes.data.data)
            setDrinkingList(drinkingRes.data.data)
            setSmokingList(smokingRes.data.data)
            setWorkoutList(workoutRes.data.data)
            setDietaryList(dietaryRes.data.data)
            setSleepingHabitList(sleepingHabitRes.data.data)
            setReligionList(religionRes.data.data)
            setPersonalityTypeList(personalityTypeRes.data.data)
            setPetList(petRes.data.data)

        } catch (error) {
            console.error("Lookup fetch error:", error);
        }
    }


    async function submitProfile() {
        try {
            if (lookingFor == "" && openTo == "" && zodiac == "" && familyPlan == "" && education == "" && communicationStyle == "" && lovestyle == "" && drinking == "" && smoking == "" && workout == ""
                && dietary == "" && sleepingHabit == "" && religion == "" && personalityType == "" && pet == "") {
                toast.warn("Fill All Fields")
            } else {
                const response = await addUserPreferences(lookingFor, openTo, zodiac, familyPlan, education, communicationStyle, lovestyle, drinking, smoking, workout
                    , dietary, sleepingHabit, religion, personalityType, pet)
                console.error(response);
                if (response == null) {
                    toast.error("Server Down")
                }
                if (response.status == "success") {
                    toast.success("Preferences Completed")
                    navigate("/home")
                } else {
                    toast.error(response.error.code)
                }
            }
        } catch (err) {
            console.error("addUserProfile error:", err);
        }

    }



    return (
        <div className='container'>
            <h1 className="text-center mt-4">Creating Profile</h1>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Name</label>
                </div>
                <div className="col-6">
                    <input className="form-control" type="text" placeholder={user.name} aria-label="Disabled input example" disabled />
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Email</label>
                </div>
                <div className="col-6">
                    <input className="form-control" type="text" placeholder={user.email} aria-label="Disabled input example" disabled />
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Looking For</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setLookingFor(e.target.value)}>
                        <option value="">Select Choice</option>
                        {lookingForList.map((item) => (
                            <option key={item.looking_for_id} value={item.looking_for_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Open To</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setOpenTo(e.target.value)}>
                        <option value="">Select Choice</option>
                        {openToList.map((item) => (
                            <option key={item.open_to_id} value={item.open_to_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Zodiac</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setZodiac(e.target.value)}>
                        <option value="">Select Zodiac</option>
                        {zodiacList.map((item) => (
                            <option key={item.zodiac_id} value={item.zodiac_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Family Plans</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setFamilyPlan(e.target.value)}>
                        <option value="">Select Family Plans</option>
                        {familyPlanList.map((item) => (
                            <option key={item.family_plan_id} value={item.family_plan_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Education</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setEducation(e.target.value)}>
                        <option value="">Select Education</option>
                        {educationList.map((item) => (
                            <option key={item.education_id} value={item.education_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Communication Style</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setCommunicationStyle(e.target.value)}>
                        <option value="">Select Communication Style</option>
                        {communicationStyleList.map((item) => (
                            <option key={item.communication_style_id} value={item.communication_style_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Love Style</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setLoveStyle(e.target.value)}>
                        <option value="">Select Love Style</option>
                        {loveStyleList.map((item) => (
                            <option key={item.love_style_id} value={item.love_style_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Drinking Habits</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setDrinking(e.target.value)}>
                        <option value="">Select Drinking Habit Style</option>
                        {drinkingList.map((item) => (
                            <option key={item.drinking_id} value={item.drinking_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Smoking Habit</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setSmoking(e.target.value)}>
                        <option value="">Select Smoking Habit</option>
                        {smokingList.map((item) => (
                            <option key={item.smoking_id} value={item.smoking_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">WorkOut Habit</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setWorkout(e.target.value)}>
                        <option value="">Select Workout Habit</option>
                        {workoutList.map((item) => (
                            <option key={item.workout_id} value={item.workout_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Dietry Habit</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setDietary(e.target.value)}>
                        <option value="">Select Dietry Habit</option>
                        {dietaryList.map((item) => (
                            <option key={item.dietary_id} value={item.dietary_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Sleeping Habit</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setSleepingHabit(e.target.value)}>
                        <option value="">Select Sleeping Habits</option>
                        {sleepingHabitList.map((item) => (
                            <option key={item.sleeping_habit_id} value={item.sleeping_habit_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Religion</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setReligion(e.target.value)}>
                        <option value="">Select Religion</option>
                        {religionList.map((item) => (
                            <option key={item.religion_id} value={item.religion_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Personality</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setPersonalityType(e.target.value)}>
                        <option value="">Select personality type</option>
                        {personalityTypeList.map((item) => (
                            <option key={item.personality_type_id} value={item.personality_type_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Pet</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setPet(e.target.value)}>
                        <option value="">Select personality type</option>
                        {petList.map((item) => (
                            <option key={item.pet_id} value={item.pet_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="button" style={{ width: "140px", height: "45px" }} onClick={submitProfile} className="btn btn-primary row g-3 align-items-center justify-content-center m-1 ">Next</button>
        </div>
    )
}




export default UserPreferences