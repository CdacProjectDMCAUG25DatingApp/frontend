import { useNavigate } from "react-router";
import config from "../services/config";
import { utils } from "../utils";

export default function UserLikeCard({
  user,
  showLikeBack,
  showMessage,
  showRemove,
  onLikeBack,
  onIgnore,
  onChat,
  onRemove,
  onCardClick      // custom card click handler
}) {

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
  };

  const age = calculateAge(user.dob);

  return (
    <div
      className="card bg-dark border-secondary text-white rounded-4 p-3 mb-4 d-flex flex-row align-items-center justify-content-between"
      style={{ cursor: "pointer" }}
      onClick={() => onCardClick && onCardClick(user)}   // main card click
    >
      <div className="d-flex align-items-center gap-3">
        <img
          src={utils.urlConverter(user.photo_url)}
          alt="profile"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #777"
          }}
        />

        <div className="d-flex flex-column">
          <h6 className="mb-1">{user.user_name}</h6>
          {onChat ? <small>Last Message : {user.last_message}</small> :<small className="text-secondary">{age} · {user.gender}</small>}
          <small className="text-muted">{user.tagline}</small>
        </div>
      </div>

      <div className="d-flex gap-2">
        {showLikeBack && (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onLikeBack(user.token);
            }}>
            Like Back
          </button>
        )}

        {showMessage && (
          <button
            className="btn btn-outline-info btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              alert("Chat coming soon!");
            }}>
            Message
          </button>
        )}

        {onIgnore && (
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onIgnore(user.token);
            }}>
            Ignore
          </button>
        )}

        {onRemove && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(user.token);
            }}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
