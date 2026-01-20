import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { addPhotos, fetchPhotos } from '../services/addphotos'
import { useNavigate } from 'react-router'
import PhotoInput from '../Components/ImageInput/PhotoInput';
import { utils } from '../utils';

function AddPhotos() {

    const navigate = useNavigate()
    const [img, setImg] = useState({})

    useEffect(() => {
        const allocateImg = async () => {
            for (let i = 0; i <= 5; i++) {
                const file = await utils.urlToFile("src\assets\preload.png", i)
                setImg(prevImg => ({ ...prevImg, [`img${i}`]: file }))
            }
        }
        allocateImg()
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

    return (
        <div className="container py-5">

            <h2 className="text-center text-light mb-5 fw-bold">
                Upload Your Photos
            </h2>

            <div className="row g-4 justify-content-center">
                {Array.from({ length: 6 }, (_, id) => (
                    <div key={id} className="col-md-4 col-lg-3 text-center">
                        <div
                            className="card bg-dark border-light rounded-4 overflow-hidden mx-auto shadow"
                            style={{ width: "300px", height: "500px" }}
                        >
                            <PhotoInput
                                id={id}
                                dataURLtoFile={utils.dataURLtoFile}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-5">
                <button className="btn btn-primary px-5 py-2 btn-lg" onClick={upload}>
                    Upload Photos
                </button>
            </div>

        </div>
    );
}

export default AddPhotos;