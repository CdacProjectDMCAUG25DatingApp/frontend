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



    useEffect(() => {
        const allocateImg = async () => {
            for (let i = 0; i <= 5; i++) {
                const file = await urlToFile("src\assets\preload.png", i)
                setImg(prevImg => ({ ...prevImg, [`img${i}`]: file }))
            }
        }
        allocateImg()
        console.log(img)
    }, [])



    const upload = async () => {
        const response = await addPhotos(img)
        if (response == null) {
            toast.error("Server Down")
            return
        }
        console.log(response)
        if (response.data.status == "success") {
            toast.success("Photos Added")
            navigate('/preferences')
        } else {
            toast.error(response.error)
        }

    }

    async function urlToFile(url, fileName) {
        try {
            // 1. Fetch the data from the URL
            const response = await fetch(url);

            // 2. Convert the response into a Blob
            const blob = await response.blob();

            // 3. Create a File object from the Blob
            // The type is automatically inherited from the Blob's MIME type
            return new File([blob], `image${fileName}`, { type: blob.type });
        } catch (error) {
            console.error("Conversion failed:", error);
        }
    }

    async function dataURLtoFile(id, canvas) {
        canvas.toBlob((blob) => {
            const file = new File([blob], `image${id}.png`, { type: blob.type });
            console.log(file)
            setImg((prev) => ({
                ...prev,
                [`img${id}`]: file
            }))
            console.log(img)
        })
    }


    return (<div className="container py-5">
        <div className="row g-4 justify-content-center">
            {Array.from({ length: 6 }, (v, id) => (

                <div key={id} className="col-md-4 d-flex justify-content-center">
                    <Profile key={id} id={id} dataURLtoFile={dataURLtoFile} />
                </div>
            ))}
        </div>
        <div className="row g-4 justify-content-center">
            <button
                type="button"
                className="btn btn-outline-primary btn-lg w-75 mt-5"
                title="Change photo"
                onClick={() => upload()}
            >
                Upload
            </button>
        </div>
    </div>

    )
}

export default AddPhotos