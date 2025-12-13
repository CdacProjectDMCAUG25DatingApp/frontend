import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import config from "../../../services/config";
import { toast } from "react-toastify";

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

    const [img, setImg] = useState({
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        img5: null,
        img6: null
    });


    useEffect(() => {
        fetchAllLookups();
    }, []);

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
                                        src={
                                            img[`img${i}`]
                                                ? URL.createObjectURL(img[`img${i}`])
                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"
                                        }
                                        alt={`img${i}`}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                    <input type="file"
                                        name={`img${i}`}
                                        accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                                        className="form-control mt-2"
                                        onChange={handleImageChange}
                                        hidden />
                                </label>
                                <input placeholder={`prompt${i} `} type="text" className="form-control form-control-sm border-secondary mt-2"/>
                            </div>
                        ))}
                    </div>

                    {/* CENTER FORM */}
                    <div className="col-md-6">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Weight (Kgs)</label>
                                <input className="form-control  " type='number'/>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Height (Meter)</label>
                                <input className="form-control  " type='number'/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select className="form-select  ">
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
                                <select className="form-select  ">
                                    {religionList.map((item) => (
                                        <option key={item.religion_id} value={item.religion_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Mother Tongue</label>
                                <select className="form-select  ">
                                    {motherTongueList.map((item) => (
                                        <option key={item.language_id} value={item.language_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
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
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" className="form-control  " />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Job Industry</label>
                                <select className="form-select  ">
                                    {jobIndustryList.map((item) => (
                                        <option key={item.industry_id} value={item.industry_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Job Title</label>
                                <input className="form-control  " />
                            </div>

                            <div className="col-md-12">
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

                        <div className="text-center mt-4">
                            <button className="btn btn-outline-secondary px-5" style={{ height: "75px", width: '300px' }}>Save</button>
                        </div>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="col-md-3 d-flex flex-column gap-4">
                        {[4, 5, 6].map((i) => (
                            <div key={i} className="text-center">
                                <label className="border rounded d-flex align-items-center justify-content-center" style={{ height: 200, cursor: "pointer" }}>
                                    <img
                                        src={
                                            img[`img${i}`]
                                                ? URL.createObjectURL(img[`img${i}`])
                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"
                                        }
                                        alt={`img${i}`}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                    <input type="file"
                                        name={`img${i}`}
                                        accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                                        className="form-control mt-2"
                                        onChange={handleImageChange}
                                        hidden />
                                </label>
                                <input placeholder={`prompt${i} `} type="text" className="form-control form-control-sm border-secondary mt-2"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
