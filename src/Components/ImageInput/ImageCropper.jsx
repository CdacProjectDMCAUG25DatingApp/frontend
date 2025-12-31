import { useRef, useState } from "react";
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";

const MIN_DIMENSION_X = 60;
const MIN_DIMENSION_Y = 100;
const ASPECT_RATIO = MIN_DIMENSION_X / MIN_DIMENSION_Y;

const ImageCropper = ({ closeModal, updateAvatar }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState()
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION_X || naturalHeight < MIN_DIMENSION_Y) {
          setError(`Image must be at least ${MIN_DIMENSION_X} x ${MIN_DIMENSION_Y} pixels.`);
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION_X / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      {/* File input */}
      <div className="mb-3">
        <label className="form-label visually-hidden">
          Choose profile photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="form-control form-control-sm"
        />
      </div>

      {error && <div className="text-danger small mb-2">{error}</div>}

      {imgSrc && (
        <div className="d-flex flex-column align-items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            ruleOfThirds

          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              className="img-fluid"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <button
            className="btn btn-info text-white mt-4 px-4 rounded-pill"
            onClick={() => {
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              
              updateAvatar(dataUrl , previewCanvasRef.current);
              closeModal();
            }}
          >
            Crop Image
          </button>
        </div>
      )}


      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
