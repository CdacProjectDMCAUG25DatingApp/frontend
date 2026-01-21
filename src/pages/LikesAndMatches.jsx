import { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import { useNavigate } from "react-router-dom";
import { utils } from "../utils";

export default function LikesAndMatches() {
  const [likes, setLikes] = useState([]);
  const [matches, setMatches] = useState([]);
  const [likedPerson, setLikedPerson] = useState({})
  const navigate = useNavigate();

  const headers = { token: sessionStorage.getItem("token") };

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadLikes();
    loadMatches();
  }, []);

  const loadLikes = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/likeesandmatches/likes/liked-you`, { headers });
      setLikes(res.data.data || []);
      console.log(res.data.data)
    } catch (err) {
      console.log("Error loading Likes", err);
    }
  };

  const loadMatches = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/likeesandmatches/likes/matches`, { headers });
      setMatches(res.data.data || []);
    } catch (err) {
      console.log("Error loading Matches", err);
    }
  };

  /* ================= OPEN PROFILE ================= */
  const openProfile = async (token) => {
    try {
      // Fetch profile details
      const detailsRes = await axios.get(
        `${config.BASE_URL}/likeesandmatches/like/likeduserdetails`,
        { headers: { token } }
      );
      const person = detailsRes.data.data;

      // Fetch photos
      const photosRes = await axios.get(
        `${config.BASE_URL}/likeesandmatches/like/likeduserphotos`,
        { headers: { token } }
      );
      let photos = photosRes.data.data || [];

      // If no photos, insert a safe fallback
      if (photos.length === 0) {
        photos = [
          {
            photo_url: person.primary_photo || "",
            prompt: "",
            photo_id: null
          }
        ];
      }

      navigate("/home/profileview", {
        state: {
          dataObj: person,
          photos: photos,
          editable: false,
          back: "/likes-matches"
        }
      });

    } catch (err) {
      console.error("Error loading full profile", err);
    }
  };



  return (
    <div className="container-fluid py-4">
      <h2 className="text-center mb-4">Likes & Matches</h2>

      <div className="row">
        {/* ================= LEFT SIDE — PEOPLE WHO LIKED ME ================= */}
        <div className="col-lg-6">
          <h4 className="mb-3">People Who Liked You</h4>

          <div className="card bg-dark text-white p-3">
            {likes.length === 0 ? (
              <p>No one has liked your profile yet.</p>
            ) : (
              likes.map((user) => (
                <div
                  key={user.token}
                  className="d-flex align-items-center mb-3 p-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => openProfile(user.token)}
                >
                  <img
                    src={user.photo_url}
                    alt=""
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: 15,
                    }}
                  />

                  <div>
                    <h6 className="m-0">{user.user_name}</h6>
                    <small className="text-secondary">
                      {user.tagline || ""}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE — MATCHES ================= */}
        <div className="col-lg-6">
          <h4 className="mb-3">Your Matches</h4>

          <div className="card bg-dark text-white p-3">
            {matches.length === 0 ? (
              <p>You have no matches yet.</p>
            ) : (
              matches.map((user) => (
                <div
                  key={user.uid}
                  className="d-flex align-items-center mb-3 p-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => openProfile(user)}
                >
                  <img
                    src={utils.urlConverter(user.photo_url)}
                    alt=""
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: 15,
                    }}
                  />

                  <div>
                    <h6 className="m-0">{user.user_name}</h6>
                    <small className="text-secondary">
                      matched at {user.matched_at?.slice(0, 10)}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
