import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import config from "../../../services/config";
import { toast } from "react-toastify";
import { fetchPhotos } from "../../../services/addPhotos";
// import { getUserPreferences } from "../../../services/userPreferences";
import { getUserProfile } from "../../../services/userProfile";

export default function EditProfile() {
    const { user, setUser } = useContext(UserContext)
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [religion, setReligion] = useState("");
    const [location, setLocation] = useState("");
    const [motherTongue, setMotherTongue] = useState("");
    const [marital, setMarital] = useState("");
    const [dob, setdob] = useState("");
    const [education, setEducation] = useState("");
    const [jobIndustry, setJobIndustry] = useState("");
    const [jobTitle, setJobTitle] = useState("");

    const [genderList, setGenderList] = useState([]);
    const [religionList, setReligionList] = useState([]);
    const [motherTongueList, setMotherTongueList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [jobIndustryList, setJobIndustryList] = useState([]);

    // const[userPreferences,setUserPreferences] = useState({
    //     looking_for_id:0,
    //     open_to_id:0,
    //     zodiac_id:0,
    //     education_id:0,
    //     family_plan_id:0,
    //     communication_style_id:0,
    //     love_style_id:0,
    //     drinking_id:0,
    //     smoking_id:0,
    //     workout_id:0,
    //     dietary_id:0,
    //     sleeping_habit_id:0,
    //     religion_id:0,
    //     personality_type_id:0,
    //     pet_id:0,
    //     })

    const [userProfile, setUserProfile] = useState({
        bio:'',
        weight: 0,
        height: 0,
        gender: 0,
        location: 0,
        religion: 0,
        mother_tongue: 0,
        marital_status: 0,
        dob: '',
        education: 0,
        job_title: '',
        job_industry_id: 0,
    })

    const [img, setImg] = useState({
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        img5: null,
        img6: null
    });

    const tempImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"

    const [userImg, setUserImg] = useState({
        userImg1: { imgName: tempImg, imgPrompt: '' },
        userImg2: { imgName: tempImg, imgPrompt: '' },
        userImg3: { imgName: tempImg, imgPrompt: '' },
        userImg4: { imgName: tempImg, imgPrompt: '' },
        userImg5: { imgName: tempImg, imgPrompt: '' },
        userImg6: { imgName: tempImg, imgPrompt: '' }
    })



    useEffect(() => {
        fetchAllLookups()
        callGetPhotos()
        // callFetchUserPreferences()
        callFetchUserProfile()
    }, [])

    const callFetchUserProfile = async () => {
        const response = await getUserProfile()
        console.log(response)
        const preferences = {
            bio: response.bio,
            weight: response.weight,
            height: response.height,
            gender: response.gender,
            location: response.location,
            religion: response.religion,
            mother_tongue: response.mother_tongue,
            marital_status: response.marital_status,
            dob: response.dob,
            education: response.education,
            job_title: response.job_title,
            job_industry_id: response.job_industry_id,
        }
        setUserProfile(preferences)
    }

    // const callFetchUserPreferences = async () =>{
    //     const response = await getUserPreferences()
    //     const preferences = {
    //     looking_for_id: response.looking_for_id,
    //     open_to_id: response.open_to_id,
    //     zodiac_id: response.zodiac_id,
    //     education_id: response.education_id,
    //     family_plan_id: response.family_plan_id,
    //     communication_style_id: response.communication_style_id,
    //     love_style_id: response.love_style_id,
    //     drinking_id: response.drinking_id,
    //     smoking_id: response.smoking_id,
    //     workout_id: response.workout_id,
    //     dietary_id: response.dietary_id,
    //     sleeping_habit_id: response.sleeping_habit_id,
    //     religion_id: response.religion_id,
    //     personality_type_id: response.personality_type_id,
    //     pet_id: response.pet_id,
    //     }
    // }

    const callGetPhotos = async () => {
        const response = await fetchPhotos()
        const userImg1 = { imgName: response[0]?.photo_url, imgPrompt: response[0]?.prompt }
        const userImg2 = { imgName: response[1]?.photo_url, imgPrompt: response[1]?.prompt }
        const userImg3 = { imgName: response[2]?.photo_url, imgPrompt: response[2]?.prompt }
        const userImg4 = { imgName: response[3]?.photo_url, imgPrompt: response[3]?.prompt }
        const userImg5 = { imgName: response[4]?.photo_url, imgPrompt: response[4]?.prompt }
        const userImg6 = { imgName: response[5]?.photo_url, imgPrompt: response[5]?.prompt }
        setUserImg({ userImg1, userImg2, userImg3, userImg4, userImg5, userImg6 })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed!")
            e.target.value = ""; // reset input
            return;
        }
        if (file.size < 5 * 1024 * 1024) {
            setImg((prev) => ({
                ...prev,
                [name]: file,
            }));
        } else {
            toast.error("Image Max Size 5mb")
        }
    };

    const fetchAllLookups = async () => {
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        try {
            const [
                genderRes,
                religionRes,
                motherTongueRes,
                educationRes,
                jobIndustryRes,
            ] = await Promise.all([
                axios.get(config.BASE_URL + "/api/gender", { headers }),
                axios.get(config.BASE_URL + "/api/religion", { headers }),
                axios.get(config.BASE_URL + "/api/mother-tongue", { headers }),
                axios.get(config.BASE_URL + "/api/education", { headers }),
                axios.get(config.BASE_URL + "/api/job-industry", { headers }),
            ]);

            setGenderList(genderRes.data.data);
            setReligionList(religionRes.data.data);
            setMotherTongueList(motherTongueRes.data.data);
            setEducationList(educationRes.data.data);
            setJobIndustryList(jobIndustryRes.data.data);

        } catch (error) {
            console.error("Lookup fetch error:", error);
        }
    }


    return (
        <div className="container-fluid  min-vh-100 p-4">
            <div className="container border rounded p-4">
                <div className="row">
                    {/* LEFT IMAGES */}
                    <div className="col-md-3 d-flex flex-column gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="text-center">
                                <label className="border rounded d-flex align-items-center justify-content-center" style={{ height: 200, cursor: "pointer" }}>
                                    <img
                                        src={`http://localhost:4000/profilePhotos/${userImg[`userImg${i}`].imgName}`}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                    <input type="file"
                                        name={`img${i}`}
                                        accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                                        className="form-control mt-2"
                                        onChange={handleImageChange}
                                        hidden />
                                </label>
                                <input placeholder={`prompt${i} `} type="text" className="form-control form-control-sm border-secondary mt-2" />
                            </div>
                        ))}
                    </div>

                    {/* CENTER FORM */}
                    <div className="col-md-6">
                        <div className="row mb-4">
                            <div className="col-12">
                                <label className="form-label fw-semibold">Bio</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Write something about yourself..."
                                    defaultValue={userProfile.bio}
                                    style={{ resize: "none" }}
                                ></textarea>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Weight (Kgs)</label>
                                <input className="form-control  " type='number' defaultValue={userProfile.weight} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Height (Meter)</label>
                                <input className="form-control  " type='number' defaultValue={userProfile.height} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select className="form-select  " value={userProfile.gender}>
                                    {genderList.map((item) => (
                                        <option key={item.gender_id} value={item.gender_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Location</label>
                                <select className="form-select  ">
                                    <option>City A</option>
                                    <option>City B</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Religion</label>
                                <select className="form-select  " value={userProfile.religion} >
                                    {religionList.map((item) => (
                                        <option key={item.religion_id} value={item.religion_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Mother Tongue</label>
                                <select className="form-select  " value={userProfile.mother_tongue}>
                                    {motherTongueList.map((item) => (
                                        <option key={item.language_id} value={item.language_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <div className="row align-items-center g-3 m-1">
                                    <div className="col-12 col-md-6">
                                        <label className="col-form-label fw-semibold">Marital Status</label>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="d-flex gap-4">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="marital"
                                                    id="married"
                                                    value="1"
                                                    checked={userProfile.marital_status == 1}
                                                    onChange={(e) => setMarital(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="married">Yes</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="marital"
                                                    checked={userProfile.marital_status == 0}
                                                    id="single"
                                                    value="0"
                                                    onChange={(e) => setMarital(e.target.value)} />
                                                <label className="form-check-label" htmlFor="single">No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" className="form-control  " value={userProfile.dob.substring(0, 10)} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Job Industry</label>
                                <select className="form-select  " value={userProfile.job_industry_id}>
                                    {jobIndustryList.map((item) => (
                                        <option key={item.industry_id} value={item.industry_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Job Title</label>
                                <input className="form-control  " value={userProfile.job_title} />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Education</label>
                                <select className="form-select" value={userProfile.education} onChange={e => setEducation(e.target.value)}>
                                    <option value="">Select Education</option>
                                    {educationList.map((item) => (
                                        <option key={item.education_id} value={item.education_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-outline-secondary w-100 px-4 py-3 " style={{ maxWidth: "300px" }}>Save</button>
                        </div>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="col-md-3 d-flex flex-column gap-4">
                        {[4, 5, 6].map((i) => (
                            <div key={i} className="text-center">
                                <label className="border rounded d-flex align-items-center justify-content-center" style={{ height: 200, cursor: "pointer" }}>
                                    <img
                                        src={`http://localhost:4000/profilePhotos/${userImg[`userImg${i}`].imgName}`}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                    <input type="file"
                                        name={`img${i}`}
                                        accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                                        className="form-control mt-2"
                                        onChange={handleImageChange}
                                        hidden />
                                </label>
                                <input placeholder={`prompt${i} `} type="text" className="form-control form-control-sm border-secondary mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
