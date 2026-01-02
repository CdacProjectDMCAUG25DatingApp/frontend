import { useRef, useState } from "react";
import Modal from "./Modal";
import preloadImg from "../../assets/preload.jpg";


const Profile = ({ id, dataURLtoFile }) => {
  const avatarUrl = useRef(
    preloadImg
  )
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc, canvas) => {
    avatarUrl.current = imgSrc;
    dataURLtoFile(id, canvas)
  };

  return (
    <div className="card shadow-sm text-center" style={{ width: "356px", borderRadius: "15px" }}>
      <div className="card-body d-flex flex-column align-items-center">
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "500px",
            padding: "12px",          // ✅ padding preserved
          }}
        >
          {id === 0 && (
            <div
              className="position-absolute"
              style={{
                top: "18px",
                right: "18px",
                zIndex: 2,
              }}
            >
              <span
                title="This is your profile card photo"
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                i
              </span>
            </div>
          )}

          <img
            src={avatarUrl.current}
            alt="Avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",     // ✅ maintains aspect ratio
              borderRadius: "12px",
              border: "2px solid #007bff",
              display: "block",
            }}
          />
        </div>

        <button
          type="button"
          className="btn btn-outline-primary btn-lg w-75 mt-3"
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
