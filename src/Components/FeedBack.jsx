import axios from "axios";
import config from "../services/config";
import { toast } from "react-toastify";

export default function FeedbackModal({ show, onClose }) {
  if (!show) return null;

  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = e.target.subject.value;
    const details = e.target.details.value;

    try {
      const res = await axios.post(
        `${config.BASE_URL}/settings/send-feedback`,
        { subject, details },
        { headers: { token } }
      );

      // Backend returns: { status: "success", data: "Feedback submitted" }
      if (res.data.status === "success") {
        toast.success(res.data.data); // success message
        onClose();
      } else {
        toast.error(res.data.error); // backend error message
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="modal-backdrop">
      <form className="modal-box" onSubmit={handleSubmit}>
        <h3>Submit Feedback</h3>

        <input name="subject" placeholder="Subject" required />
        <textarea name="details" placeholder="Enter feedback..." required />

        <button type="submit">Send</button>
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
          border:2px solid white; width:400px; color:white;
          display:flex; flex-direction:column;
        }
        input, textarea {
          background:#000; color:white;
          border:1px solid #555; padding:10px;
          margin-bottom:15px; border-radius:8px;
        }
        textarea { min-height:120px; }
        button {
          background:white; color:black;
          padding:10px; border-radius:10px; margin-top:10px;
        }
        .close-btn { background:#444; color:white; }
      `}</style>
    </div>
  );
}
