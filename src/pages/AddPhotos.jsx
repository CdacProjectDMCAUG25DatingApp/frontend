import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { addPhotos, fetchPhotos } from '../services/addphotos';
import { useNavigate } from 'react-router';
import axios from 'axios';
import config from '../services/config';


function AddPhotos() {

    const navigate = useNavigate()
    const [img, setImg] = useState({
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        img5: null,
        img6: null
    });

    useEffect(() => {
        callAddPhotos()
    }, [])

    const callAddPhotos = async () => {
        const response = await fetchPhotos()
        console.log(response)
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

    const submitPhotos = async (e) => {
        try {
            if (img.img1 == null && img.img2 == null && img.img3 == null && img.img4 == null && img.img5 == null && img.img6 == null) {
                toast.warn("Fill All Fields")
            } else {
                const form = new FormData();
                form.append("img1", img.img1)
                form.append("img2", img.img2)
                form.append("img3", img.img3)
                form.append("img4", img.img4)
                form.append("img5", img.img5)
                form.append("img6", img.img6)

                const response = await addPhotos(form)
                if (response == null) {
                    toast.error("Server Down")
                    return
                }
                if (response.data.status == "success") {
                    toast.success("Photos Added")
                    const responsePreferences = await axios.get(config.BASE_URL + '/user/userpreferences', {
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    })
                    if (responsePreferences.data.data.length == 1) {
                        navigate("/home")
                    } else {
                        navigate("/preferences")
                    }
                } else {
                    toast.error(response.error)
                }
            }
        } catch (err) {
            console.error("addUserProfile error:", err);
        }

    }

    return (<div className='container pt-5'>
        <div className='row g-3 align-items-center justify-content-center'>
            <div className="card p-3 col-4 m-3 g-3  align-items-center justify-content-center" style={{ width: "20rem" }}>
                <img
                    src={img.img1 ? URL.createObjectURL(img.img1) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"}
                    className="img-fluid rounded"
                    alt="preview"
                />
                <input
                    type="file"
                    name="img1"
                    accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                    className="form-control mt-2"
                    onChange={handleImageChange}
                />
            </div>
            <div className="card p-3 col-4 m-3 g-3 align-items-center justify-content-center" style={{ width: "20rem" }}>
                <img
                    src={img.img2 ? URL.createObjectURL(img.img2) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"}
                    className="img-fluid rounded"
                    alt="preview"
                />

                <input
                    type="file"
                    name="img2"
                    accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                    className="form-control mt-2"
                    onChange={handleImageChange}
                />
            </div>
            <div className="card p-3 col-4 m-3 g-3 align-items-center justify-content-center" style={{ width: "20rem" }}>
                <img
                    src={img.img3 ? URL.createObjectURL(img.img3) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"}
                    className="img-fluid rounded"
                    alt="preview"
                />

                <input
                    type="file"
                    name="img3"
                    accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                    className="form-control mt-2"
                    onChange={handleImageChange}
                />
            </div>
            <div className='row'>
            </div>
            <div className="card p-3 col-4 m-3 g-3 align-items-center justify-content-center" style={{ width: "20rem" }}>
                <img
                    src={img.img4 ? URL.createObjectURL(img.img4) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"}
                    className="img-fluid rounded"
                    alt="preview"
                />

                <input
                    type="file"
                    name="img4"
                    accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                    className="form-control mt-2"
                    onChange={handleImageChange}
                />
            </div>
            <div className="card p-3 col-4 m-3 g-3 align-items-center justify-content-center" style={{ width: "20rem" }}>
                <img
                    src={img.img5 ? URL.createObjectURL(img.img5) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"}
                    className="img-fluid rounded"
                    alt="preview"
                />

                <input
                    type="file"
                    name="img5"
                    accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                    className="form-control mt-2"
                    onChange={handleImageChange}
                />
            </div>
            <div className="card p-3 col-4 m-3 g-3 align-items-center justify-content-center" style={{ width: "20rem" }}>
                <img
                    src={img.img6 ? URL.createObjectURL(img.img6) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s"}
                    className="img-fluid rounded"
                    alt="preview"
                />

                <input
                    type="file"
                    name="img6"
                    accept="image/png, image/jpeg, image/jpg, image/webp ,image/heic"
                    className="form-control mt-2"
                    onChange={handleImageChange}
                />
            </div>
            <div className='row m-3 g-3 align-items-center justify-content-center '>
                <button className='btn btn-primary p-3 col-3 m-3 align-items-center justify-content-center' onClick={submitPhotos}>Save</button>
            </div>
        </div>
    </div>
    )
}

export default AddPhotos