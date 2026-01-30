import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import "react-image-crop/dist/ReactCrop.css";

const MIN_DIMENSION_X = 60;
const MIN_DIMENSION_Y = 100;
const ASPECT_RATIO = MIN_DIMENSION_X / MIN_DIMENSION_Y;

const ImageCropper = ({ closeModal, updateAvatar ,isDP=false}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageURL = reader.result.toString();
      setImgSrc(imageURL);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;

    const cropWidthInPercent = (MIN_DIMENSION_X / width) * 100;
    const initial = centerCrop(
      makeAspectCrop(
        { unit: "%", width: cropWidthInPercent },
        ASPECT_RATIO,
        width,
        height
      ),
      width,
      height
    );

    setCrop(initial);
  };

  const handleCrop = () => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    updateAvatar(previewCanvasRef.current);
    closeModal();
  };

  return (
    <>
      <div className="mb-3">
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={onSelectFile}
          className="form-control form-control-sm"
        />
      </div>

      {error && <div className="text-danger small mb-2">{error}</div>}

      {imgSrc && (
        <div className="d-flex flex-column align-items-center">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            keepSelection
            aspect={isDP ? 1 : ASPECT_RATIO}
            circularCrop={isDP} 
          >
            <img
              ref={imgRef}
              src={imgSrc}
              className="img-fluid"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <button
            className="btn btn-info mt-4 px-4 rounded-pill text-white"
            onClick={handleCrop}
          >
            Crop Image
          </button>
        </div>
      )}

      <canvas ref={previewCanvasRef} style={{ display: "none" }} />
    </>
  );
};

export default ImageCropper;
