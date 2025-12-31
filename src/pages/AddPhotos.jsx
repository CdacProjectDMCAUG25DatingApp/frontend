import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { addPhotos, fetchPhotos } from '../services/addphotos'
import { useNavigate } from 'react-router'
import axios from 'axios'
import config from '../services/config'
import Profile from '../Components/ImageInput/Profile';





function AddPhotos() {

    const navigate = useNavigate()
    const [img, setImg] = useState({})

    async function dataURLtoFile(id, canvas) {
        canvas.toBlob((blob) => {
            const file = new File([blob], `image${id}.png`, { type: blob.type });
            console.log(file);
            setImg((prev) => ({
                ...prev,
                [`img${id}`]: file
            }))
            console.log(img)
        });

    }

    const submitPhotos = async (e) => {
        try {
            if (img.img0 == null && img.img1 == null && img.img2 == null && img.img3 == null && img.img4 == null && img.img5 == null) {
                toast.warn("Fill All Fields")
            } else {
                const form = new FormData();
                form.append("img0", img.img0)
                form.append("img1", img.img1)
                form.append("img2", img.img2)
                form.append("img3", img.img3)
                form.append("img4", img.img4)
                form.append("img5", img.img5)

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

    return (<div className="container py-5">
        <div className="row g-4 justify-content-center">
            {Array.from({ length: 6 }, (v, id) => (
                <div key={id} className="col-md-4 d-flex justify-content-center">
                    <Profile key={id} id={id} dataURLtoFile={dataURLtoFile} />
                </div>
            ))}
        </div>
    </div>

    )
}

export default AddPhotos