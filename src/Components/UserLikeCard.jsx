import { useNavigate } from "react-router";
import axios from "axios";
import config from "../services/config";

export default function UserLikeCard({
  user,
  showLikeBack,
  showMessage,
  showRemove,
  onLikeBack,
  onIgnore,
  onRemove
}) {
  const navigate = useNavigate();

  const openFullProfile = async () => {
    try {
      const headers = { token: sessionStorage.getItem("token") };

      const res = await axios.get(
        `${config.BASE_URL}/user/fullprofile/${user.uid}`,
        { headers }
      );

      const { profile, photos } = res.data.data;

      navigate("/home/profileviewview", {
        state: {
          dataObj: profile,
          photos,
          editable: false,
          back: "/likes-matches"
        }
      });
    } catch (err) {
      console.log("Failed loading full profile", err);
    }
  };

  return (
    <div className="card bg-dark border-secondary text-white rounded-4 p-3 mb-4 d-flex flex-row align-items-center justify-content-between">

      {/* PHOTO */}
      <div className="d-flex align-items-center gap-3">
        <img
          src={user.photo_url}
          alt="profile"
          onClick={openFullProfile}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
            border: "2px solid #555"
          }}
        />

        {/* NAME / AGE / GENDER */}
        <div>
          <h6 className="mb-1">{user.user_name}</h6>
          <small className="text-secondary">
            {user.age} · {user.gender_name}
          </small>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="d-flex gap-2">
        {showLikeBack && (
          <button className="btn btn-outline-primary" onClick={onLikeBack}>
            Like Back
          </button>
        )}

        {showMessage && (
          <button className="btn btn-outline-info" onClick={() => alert("Chat coming soon!")}>
            Message
          </button>
        )}

        {onIgnore && (
          <button className="btn btn-outline-warning" onClick={onIgnore}>
            Ignore
          </button>
        )}

        {onRemove && (
          <button className="btn btn-outline-danger" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
