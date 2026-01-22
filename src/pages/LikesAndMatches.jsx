import { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import UserLikeCard from "../Components/UserLikeCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Styles/likesnmatches.css";

export default function LikesAndMatches() {
  const [likes, setLikes] = useState([]);
  const [matches, setMatches] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    loadLikes();
    loadMatches();
  }, []);

  const loadLikes = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/likeesandmatches/likes/liked-you`,
        { headers: { token } }
      );
      setLikes(res.data.data || []);
    } catch (err) {
      console.log("Error loading Likes", err);
    }
  };

  const loadMatches = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/likeesandmatches/likes/matches`,
        { headers: { token } }
      );
      setMatches(res.data.data || []);
    } catch (err) {
      console.log("Error loading Matches", err);
    }
  };

  // OPEN PROFILE VIEW
  const openFullProfile = async (user) => {
    try {
      const headers = { token: user.token };

      const detailsRes = await axios.get(
        `${config.BASE_URL}/likeesandmatches/like/likeduserdetails`,
        { headers }
      );

      const photosRes = await axios.get(
        `${config.BASE_URL}/likeesandmatches/like/likeduserphotos`,
        { headers }
      );

      navigate("/home/profileview", {
        state: {
          dataObj: detailsRes.data.data,
          photos: photosRes.data.data,
          editable: false,
          back: "/likes-matches"
        }
      });

    } catch (err) {
      console.log("Failed loading full profile", err);
    }
  };

  // LIKE BACK
  const likeBack = async (candidateToken) => {
    try {
      const res = await axios.post(
        `${config.BASE_URL}/likeesandmatches/likes/like`,
        { token: candidateToken, is_super_like: 0 },
        { headers: { token } }
      );

      toast.success("Liked Back!");

      const liked_uid = res?.data?.data?.liked_uid;
      removeCardAnimation(liked_uid, "likes");

      if (res?.data?.data?.match === true) {
        toast.success("It's a Match!");
        const matchedPerson = likes.find(u => u.token === candidateToken);
        setMatches(prev => [...prev, matchedPerson]);
        setLikes(prev => prev.filter(u => u.token !== candidateToken));
      }
    } catch (err) {
      toast.error("Like Back Failed");
      console.log(err);
    }
  };

  // IGNORE
  const ignoreUser = async (candidateToken) => {
    try {
      const res = await axios.delete(
        `${config.BASE_URL}/likeesandmatches/likes/ignore`,
        {
          headers: { token },
          data: { token: candidateToken }
        }
      );

      const ignored_uid = res?.data?.data?.uid;
      toast.success("Ignored");
      removeCardAnimation(ignored_uid, "likes");

    } catch (err) {
      toast.error("Ignore Failed");
      console.log(err);
    }
  };

  // REMOVE MATCH
  const removeMatch = async (candidateToken) => {
    try {
      const res = await axios.delete(
        `${config.BASE_URL}/likeesandmatches/matches/remove`,
        {
          headers: { token },
          data: { token: candidateToken }
        }
      );

      const removed_uid = res?.data?.data?.uid;
      toast.success("Match Removed");
      removeCardAnimation(removed_uid, "matches");

    } catch (err) {
      toast.error("Failed To Remove Match");
      console.log(err);
    }
  };

  const removeCardAnimation = (uid, list) => {
    const elem = document.getElementById(`card-${uid}`);
    if (!elem) return;

    elem.classList.add("fade-out");

    setTimeout(() => {
      if (list === "likes") setLikes(prev => prev.filter(u => u.uid !== uid));
      if (list === "matches") setMatches(prev => prev.filter(u => u.uid !== uid));
    }, 250);
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="text-center mb-4">Likes & Matches</h2>

      <div className="row">

        {/* LIKED YOU */}
        <div className="col-lg-6">
          <h4 className="mb-3 text-center">Liked You</h4>

          {likes.length === 0 ? (
            <p className="text-center">No likes yet.</p>
          ) : (
            likes.map(user => (
              <div id={`card-${user.uid}`} key={user.uid} className="fade-card">
                <UserLikeCard
                  user={user}
                  showLikeBack
                  onLikeBack={likeBack}
                  onIgnore={ignoreUser}
                  onCardClick={openFullProfile}   // <<< CLICK HERE OPENS PROFILE
                />
              </div>
            ))
          )}
        </div>

        {/* MATCHES */}
        <div className="col-lg-6">
          <h4 className="mb-3 text-center">Matches</h4>

          {matches.length === 0 ? (
            <p className="text-center">No matches yet.</p>
          ) : (
            matches.map(user => (
              <div id={`card-${user.uid}`} key={user.uid} className="fade-card">
                <UserLikeCard
                  user={user}
                  showMessage
                  showRemove
                  onRemove={() => removeMatch(user.token)}
                  onCardClick={openFullProfile}   // <<< SAME HERE
                />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
