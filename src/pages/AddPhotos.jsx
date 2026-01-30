import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addPhotos } from "../services/addphotos";
import { useNavigate } from "react-router";
import PhotoInput from "../Components/ImageInput/PhotoInput";
import axios from "axios";
import config from "../services/config";
import { loadPhotos } from "../redux/userDetailsThunks";
import { useDispatch } from "react-redux";

function AddPhotos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [img, setImg] = useState({});

  useEffect(() => {
    const preloadImages = async () => {
      const preloadUrl = "/src/assets/preload.png";

      for (let i = 0; i < 6; i++) {
        const file = await urlToFile(preloadUrl, i);
        setImg((prev) => ({ ...prev, [`img${i}`]: file }));
      }
    };

    preloadImages();
  }, []);

  const urlToFile = async (url, id) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `photo${id}.jpg`, { type: blob.type });
  };

  const dataURLtoFile = (id, canvas) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], `photo${id}.jpg`, { type: blob.type });

      setImg((prev) => ({
        ...prev,
        [`img${id}`]: file,
      }));
    });
  };

  const upload = async () => {
    for (let i = 0; i < 6; i++) {
      if (!img[`img${i}`]) {
        toast.error("Please fill all 6 photos");
        return;
      }
    }

    const response = await addPhotos(img);

    if (!response) {
      toast.error("Server unavailable");
      return;
    }

    if (response.status === "success") {
      toast.success("Photos Added!");

      await dispatch(loadPhotos());

      const token = sessionStorage.getItem("token");

      const prefRes = await axios.get(config.BASE_URL + "/user/userdetails", {
        headers: { token }
      });

      // SAFE PARSE
      const raw = prefRes.data?.data;
      const details = Array.isArray(raw) ? raw[0] : raw;

      // Proceed
      if (!details || !details.looking_for_id) {
        return navigate("/preferences");
      }

      navigate("/home/people");

    } else {
      toast.error(response.error);
    }
  };

  const labels = [
    "Profile Picture (DP)",
    "Card Image",
    "Profile View Image 1",
    "Profile View Image 2",
    "Profile View Image 3",
    "Profile View Image 4",
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4">Upload Your Photos</h2>

      <div className="row g-4 justify-content-center">
        {Array.from({ length: 6 }).map((_, id) => (
          <div key={id} className="col-md-4 d-flex flex-column align-items-center">

            <p className="text-light fw-bold mb-2">{labels[id]}</p>

            <PhotoInput
              id={id}
              setImg={setImg}
              from="addphotos"
              dataURLtoFile={dataURLtoFile}
              imageWidth={id === 0 ? 250 : 300}      // DP circle
              imageHeight={id === 0 ? 250 : 500}     // Others 300x500
              isDP={id === 0}                        // circle flag
            />

          </div>
        ))}
      </div>

      <div className="row g-4 justify-content-center">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg w-75 mt-5"
          onClick={upload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default AddPhotos;
