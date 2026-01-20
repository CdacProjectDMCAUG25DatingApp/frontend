import { useEffect, useState } from "react";
import Modal from "./Modal";
import preloadImg from "../../assets/preload.jpg";

const PhotoInput = ({
  id,
  dataURLtoFile,
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

  const updateAvatar = (imgSrc, canvas) => {
    setAvatarUrl(imgSrc);
    dataURLtoFile(id, canvas);
  };

  return (
    <div
      style={{
        width: imageWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* IMAGE BOX */}
      <div
        style={{
          width: imageWidth,
          height: imageHeight,
          borderRadius: "14px",
          overflow: "hidden",
          border: "2px solid #007bff",
          position: "relative",
          background: "#000",
        }}
      >
        {/* info icon */}
        {id === 0 && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "#007bff",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              color: "#fff",
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            i
          </div>
        )}

        {/* IMAGE */}
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* BUTTON UNDER IMAGE */}
      <button
        type="button"
        className="btn btn-outline-primary mt-3 w-100"
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
