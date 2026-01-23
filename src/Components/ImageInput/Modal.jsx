import { useEffect } from "react";
import ImageCropper from "./ImageCropper";

const Modal = ({ updateAvatar, closeModal }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.75)",
          zIndex: 1040,
        }}
      />

      <div
        className="d-block"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark text-light rounded-4 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title">Crop Image</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeModal}
              />
            </div>

            <div className="modal-body">
              <ImageCropper updateAvatar={updateAvatar} closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
