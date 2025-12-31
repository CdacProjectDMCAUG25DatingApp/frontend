import { useRef, useState } from "react";
import Modal from "./Modal";

const Profile = ({ id, dataURLtoFile }) => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc, canvas) => {
    avatarUrl.current = imgSrc;
    dataURLtoFile(id, canvas)
  };

  return (
    <div className="card shadow-sm text-center" style={{ width: "20rem", borderRadius: "15px" }}>
      <div className="card-body d-flex flex-column align-items-center">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="img-fluid rounded mb-3"
          style={{
            width: "300px",
            height: "500px",
            objectFit: "cover",
            border: "2px solid #007bff", // theme accent color
          }}
        />

        <button
          type="button"
          className="btn btn-outline-primary btn-lg w-75"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          Select Photo
        </button>

        {modalOpen && (
          <Modal
            updateAvatar={updateAvatar}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>

  );
};

export default Profile;
