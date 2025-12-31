import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

const Modal = ({ updateAvatar, closeModal }) => {
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="crop-image-dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark text-light rounded-4 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="crop-image-dialog">
                Crop Image
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
