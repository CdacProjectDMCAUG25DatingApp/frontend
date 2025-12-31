import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../app/App";
import axios from "axios";
import config from "../services/config";
import { toast } from "react-toastify";
import { fetchPhotos } from "../services/addphotos";
import { getUserProfile } from "../services/userprofile";

import MySelect from "../Components/MySelect";




export default function EditProfile() {
    const { user, setUser } = useContext(UserContext)
    
    const [genderList, setGenderList] = useState([]);
    const [religionList, setReligionList] = useState([]);
    const [motherTongueList, setMotherTongueList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [jobIndustryList, setJobIndustryList] = useState([]);



    const [userProfile, setUserProfile] = useState({
        bio: '',
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

    const [userImages, setUserImages] = useState(
        Array.from({ length: 6 }, (_, i) => ({
            id: i + 1,
            imgName: null,
            imgPrompt: "",
            file: null,
        }))
    );

    const callGetPhotos = async () => {
        const response = await fetchPhotos();
        const images = Array.from({ length: 6 }, (_, i) => ({
            id: i + 1,
            imgName: response[i]?.photo_url || null,
            imgPrompt: response[i]?.prompt || "",
        }));

        setUserImages(images);
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

    const callFetchUserProfile = async () => {
        const response = await getUserProfile()
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

    useEffect(() => {
        fetchAllLookups()
        callGetPhotos()
        callFetchUserProfile()
    }, [])


    const handleImageChange = (e, id) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) return;

        if (file.size < 5 * 1024 * 1024) {
            setUserImages(prev => 
                prev.map((img) => 
                    img.id === id ? { ...img, file } : img
                )
            
            );
        } else {
            toast.error("Image Max Size 5mb")
        }

    };

    const handlePromptChange = (e, id) => {
        setUserImages((prev) =>
            prev.map((img) =>
                img.id === id ? { ...img, imgPrompt: e.target.value } : img
            )
        );
    };



    return (<div>Hello</div> ||
        <div className="container-fluid  min-vh-100 p-4">
            <div className="container border rounded p-4">
                <div className="row">
                    {/* LEFT IMAGES */}
                    <div className="col-md-3 d-flex flex-column gap-4">
                        {userImages.slice(0, 3).map((img) => (
                            // <ImageInputs
                            //     key={img.id}
                            //     image={img}
                            //     onImageChange={handleImageChange}
                            //     onPromptChange={handlePromptChange}
                            // />
                            <div>hi</div>
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
                                    value={userProfile.bio}
                                    style={{ resize: "none" }}
                                    onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
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
                                <MySelect
                                    label="Gender"
                                    value={userProfile.gender}
                                    options={genderList}
                                    optionValue="gender_id"
                                    optionLabel="name"
                                    onChange={(e) =>
                                        setUserProfile({ ...userProfile, gender: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Location</label>
                                <select className="form-select  ">
                                    <option>City A</option>
                                    <option>City B</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <MySelect
                                    label="Religion"
                                    value={userProfile.religion}
                                    options={religionList}
                                    optionValue="religion_id"
                                    optionLabel="name"
                                    onChange={(e) =>
                                        setUserProfile({ ...userProfile, religion: e.target.value })
                                    }
                                />

                            </div>
                            <div className="col-md-6">
                                <MySelect
                                    label="Mother Tongue"
                                    value={userProfile.mother_tongue}
                                    options={motherTongueList}
                                    optionValue="language_id"
                                    optionLabel="name"
                                    onChange={(e) =>
                                        setUserProfile({ ...userProfile, mother_tongue: e.target.value })
                                    }
                                />
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
                                                    onChange={(e) => setUserProfile({ ...userProfile, marital_status: e.target.value })}
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
                                                    onChange={(e) => setUserProfile({ ...userProfile, marital_status: e.target.value })} />
                                                <label className="form-check-label" htmlFor="single">No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" className="form-control  " value={userProfile.dob.substring(0, 10)} readOnly/>
                            </div>

                            <div className="col-md-6">
                                <MySelect
                                    label="Job Industry"
                                    value={userProfile.job_industry_id}
                                    options={jobIndustryList}
                                    optionValue="industry_id"
                                    optionLabel="name"
                                    onChange={(e) =>
                                        setUserProfile({ ...userProfile, job_industry_id: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Job Title</label>
                                <input className="form-control  " value={userProfile.job_title} onChange={(e) => setUserProfile({ ...userProfile, job_title: e.target.value })}/>
                            </div>

                            <div className="col-md-6">
                                <MySelect
                                    label="Education"
                                    value={userProfile.education}
                                    options={educationList}
                                    optionValue="education_id"
                                    optionLabel="name"
                                    onChange={(e) =>
                                        setUserProfile({ ...userProfile, education: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-outline-secondary w-100 px-4 py-3 " style={{ maxWidth: "300px" }}>Save</button>
                        </div>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="col-md-3 d-flex flex-column gap-4">
                        {userImages.slice(3, 6).map((img) => (
                            // <ImageInputs
                            //     key={img.id}
                            //     image={img}
                            //     onImageChange={handleImageChange}
                            //     onPromptChange={handlePromptChange}
                            // />
                            <div>hi</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
