import config from "../services/config";
import "../Styles/ImageInputs.css"

const ImageInputs = ({ image, onImageChange, onPromptChange }) => {
  const tempImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqMra_F5H5e0yEoXaj0-OJANd7DF-aDVJA&s";

  return (
    <div className="text-center">
      <label
        className="image-card"
        htmlFor={`img-${image.id}`}
      >
        <img
          src={
            image.file
              ? URL.createObjectURL(image.file)
              : image.imgName
                ? `${config.BASE_URL}/profilePhotos/${image.imgName}`
                : tempImg
          }
        alt={`Profile ${image.id}`}
        />

        <input
          id={`img-${image.id}`}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onImageChange(e, image.id)}
        />
      </label>

      <input
        value={image.imgPrompt}
        onChange={(e) => onPromptChange(e, image.id)}
        placeholder="Add a prompt"
        className="form-control form-control-sm dark-input mt-2"
      />
    </div>
  );
};

export default ImageInputs;

