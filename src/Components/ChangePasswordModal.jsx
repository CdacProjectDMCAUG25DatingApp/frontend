import axios from "axios";
import config from "../services/config";
import { toast } from "react-toastify";

export default function ChangePasswordModal({ show, onClose }) {
  if (!show) return null;

  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;

    try {
      const res = await axios.put(
        `${config.BASE_URL}/settings/change-password`,
        { oldPassword, newPassword },
        { headers: { token } }
      );

      if (res.data.status === "success") {
        toast.success(res.data.data);    // SUCCESS MESSAGE
        onClose();
      } else {
        toast.error(res.data.error);     // BACKEND ERROR MESSAGE
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="modal-backdrop">
      <form className="modal-box" onSubmit={handleSubmit}>
        <h3>Change Password</h3>

        <input name="oldPassword" type="password" placeholder="Old Password" required />
        <input name="newPassword" type="password" placeholder="New Password" required />

        <button type="submit">Update</button>
        <button type="button" onClick={onClose} className="close-btn">Close</button>
      </form>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top:0; left:0;
          width:100%; height:100%;
          background: rgba(0,0,0,0.8);
          display:flex; justify-content:center; align-items:center;
        }
        .modal-box {
          background:#111; padding:30px; border-radius:15px;
          border:2px solid white; width:350px; color:white;
          display:flex; flex-direction:column;
        }
        input {
          background:#000; color:white;
          border:1px solid #555; padding:10px;
          margin-bottom:15px; border-radius:8px;
        }
        button {
          background:white; color:black;
          padding:10px; border:none; border-radius:10px; margin-top:10px;
        }
        .close-btn { background:#444; color:white; }
      `}</style>
    </div>
  );
}
