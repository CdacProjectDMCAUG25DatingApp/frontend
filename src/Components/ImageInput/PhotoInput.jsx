import { useEffect, useState } from "react";
import Modal from "./Modal";
import preloadImg from "../../assets/preload.jpg";
import axios from "axios";
import config from "../../services/config";
import { useDispatch, useSelector } from "react-redux";
import { setPhotos } from "../../redux/photosSlice";
import { utils } from "../../utils";

const PhotoInput = ({
  id,
  from = "",
  setImg,
  imageurl,
  imageWidth = 300,
  imageHeight = 500,
  photo_id,
  index,
  editable = true,
  isDP = false, // ⭐ NEW FLAG
}) => {
  const [avatarUrl, setAvatarUrl] = useState(preloadImg);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const photos = useSelector((s) => s.photos.data);

  useEffect(() => {
    if (imageurl && !imageurl.endsWith("/null")) {
      setAvatarUrl(imageurl);
    } else {
      setAvatarUrl(preloadImg);
    }
  }, [imageurl]);

  // -----------------------------
  // Upload New Photo
  // -----------------------------
  const updateAvatar = async (canvas) => {
    const dataURL = canvas.toDataURL("image/jpeg", 0.9);
    setAvatarUrl(dataURL);

    if (!photo_id) {
      utils.dataURLtoFile(id, canvas, setImg);
      return;
    }

    const file = await utils.canvasToFile(canvas, "replaced.jpg");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("photo_id", photo_id);

    try {
      const res = await axios.put(`${config.BASE_URL}/photos/replace`, formData, {
        headers: {
          token: sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        const { new_url } = res.data.data;

        dispatch(
          setPhotos(
            photos.map((p, i) => (i === index ? { ...p, photo_url: new_url } : p))
          )
        );
      }
    } catch (err) {
      console.log("Photo replace failed:", err);
    }
  };

  const isAddPhotos = from === "addphotos";

  return (
    <div
      className={isAddPhotos ? "photo-input-addphotos" : "photo-input-default"}
      style={{ width: "100%" }}
    >
      <div
        style={{
          width: imageWidth,
          height: imageHeight,
          borderRadius: isDP ? "50%" : "14px", // ★ CIRCLE FOR DP
          overflow: "hidden",
          background: "#000",
          border: isAddPhotos ? "none" : "2px solid #007bff",
          position: "relative",
          margin: "0 auto",
        }}
      >
        <img
          src={avatarUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: isDP ? "50%" : "0", // ★ Ensure circular crop
          }}
        />

        {editable && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "10px",
              background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.6))",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="btn btn-sm btn-light"
              style={{
                borderRadius: "20px",
                padding: "6px 18px",
                fontWeight: "600",
              }}
              onClick={() => setModalOpen(true)}
            >
              Change Photo
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal updateAvatar={updateAvatar} closeModal={() => setModalOpen(false)} isDP={isDP} />
      )}
    </div>
  );
};

export default PhotoInput;
