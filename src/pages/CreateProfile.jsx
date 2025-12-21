import React, { useContext, useEffect, useState } from 'react'
import { addUserProfile } from '../services/userprofile';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import config from '../services/config';
import { UserContext } from '../app/App';


function CreateProfile() {
    const navigate = useNavigate()
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

    useEffect(() => {
        fetchAllLookups();
    }, []);

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


    async function submitProfile() {
        try {
            if (gender == "" && bio == "" && religion == "" && location == "" && motherTongue == "" && marital == "" && dob == "" && education == "" && jobTitle == "" && jobIndustry == "") {
                toast.warn("Fill All Fields")
            } else {
                const response = await addUserProfile(gender, bio, religion, location, motherTongue, marital, dob, education, jobTitle, jobIndustry)
                console.error(response);
                if (response == null) {
                    toast.error("Server Down")
                }
                if (response.status == "success") {
                    toast.success("Profile Completed")
                    navigate("/addphotos")
                } else {
                    if (response.error.errno == 1062) {
                        toast.error("You Already have a profile")
                    }
                    else {
                        toast.error(response.error.code)
                    }
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
                    <label className="col-form-label">Gender</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        {genderList.map((item) => (
                            <option key={item.gender_id} value={item.gender_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Bio</label>
                </div>
                <div className="col-6">
                    <input type="text" className="form-control" onChange={e => setBio(e.target.value)} />
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
                    <label className="col-form-label">Where You Live</label>
                </div>
                <div className="col-6">
                    <input type="text" className="form-control" onChange={e => setLocation(e.target.value)} />
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Mother Tongue</label>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={e => setMotherTongue(e.target.value)}>
                        <option value="">Select Language</option>
                        {motherTongueList.map((item) => (
                            <option key={item.language_id} value={item.language_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row g-3 align-items-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Marital Status</label>
                </div>
                <div className="col-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="marital" id="yes" value="1" onChange={(e) => setMarital(e.target.value)} />
                        <label className="form-check-label" htmlFor="yes">Yes</label>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="marital" id="no" value="0" onChange={(e) => setMarital(e.target.value)} />
                        <label className="form-check-label" htmlFor="no">No</label>
                    </div>
                </div>
            </div>


            <div className="row g-3 align-items-center m-1">
                <div className="col-6">
                    <label htmlFor="dateInput" className="col-form-label">Select DOB</label>
                </div>
                <div className="col-6">
                    <input type="date" value={dob} className="form-control" id="dateInput" onChange={(e) => setdob(e.target.value)} />
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
                    <label className="col-form-label">Job Title</label>
                </div>
                <div className="col-6">
                    <input type="text" className="form-control" onChange={e => setJobTitle(e.target.value)} />
                </div>
            </div>
            <div className="row g-3 align-items-center justify-content-center m-1">
                <div className="col-6">
                    <label className="col-form-label">Job Industry</label>
                </div>
                <div className="col-6">
                    <select className="form-select" value={jobIndustry} onChange={e => setJobIndustry(e.target.value)}>
                        <option value="">Select Industry</option>
                        {jobIndustryList.map((item) => (
                            <option key={item.industry_id} value={item.industry_id}>
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




export default CreateProfile