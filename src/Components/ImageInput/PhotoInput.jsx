import { useEffect, useState } from "react";
import Modal from "./Modal";
import preloadImg from "../../assets/preload.jpg";

const PhotoInput = ({
  id,
  from = "",
  dataURLtoFile,
  setImg,
  imageurl,
  imageWidth = 300,
  imageHeight = 500,
}) => {
  const [avatarUrl, setAvatarUrl] = useState(preloadImg);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (imageurl && !imageurl.endsWith("/null")) {
      setAvatarUrl(imageurl);
    } else {
      setAvatarUrl(preloadImg);
    }
  }, [imageurl]);

  const updateAvatar = (canvas) => {
    const dataURL = canvas.toDataURL("image/jpeg", 0.9);
    setAvatarUrl(dataURL);
    dataURLtoFile(id, canvas, setImg);
  };

  const isAddPhotos = from === "addphotos";

  return (
    <div
      className={isAddPhotos ? "photo-input-addphotos" : "photo-input-default"}
      style={{ width: "100%" }}
    >
      <div
        style={{
          width: "100%",
          height: imageHeight,
          borderRadius: isAddPhotos ? "16px" : "14px",
          overflow: "hidden",
          background: "#000",
          border: isAddPhotos ? "none" : "2px solid #007bff",
          position: "relative",
        }}
      >
        <img
          src={avatarUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <button
        className="btn btn-outline-primary mt-3"
        style={{ width: "100%" }}
        onClick={() => setModalOpen(true)}
      >
        Select Photo
      </button>

      {modalOpen && (
        <Modal updateAvatar={updateAvatar} closeModal={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default PhotoInput;
