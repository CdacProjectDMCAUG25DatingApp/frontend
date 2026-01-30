import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import "../Styles/MainCard.css";
import RBCard from "./RBCard";
import config from "../services/config";
import axios from "axios";
import { useRef } from "react";

const MainCard = ({ onSwipe, candidate}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-50, 50]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const controls = useAnimation();

  // 🔥 STATE TO BLOCK CLICK
  const isDragging = useRef(false);
  const isAnimating = useRef(false);

  const style = {
    flex: 1,
    borderRadius: 10,
    height: "70svh",
    maxHeight: "450px",
  };

  const handleSwipeLeft = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${config.BASE_URL}/swipe/left`,
        {
          swiper_id: sessionStorage.getItem("token"),
          swiped_token: candidate.token,
        },
        { headers: { token } }
      );
    } catch (err) {
      console.error("Swipe left error:", err);
    }
  };

  const handleSwipeRight = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${config.BASE_URL}/swipe/right`,
        {
          swiper_id: sessionStorage.getItem("token"),
          swiped_token: candidate.token,
        },
        { headers: { token } }
      );
    } catch (err) {
      console.error("Swipe right error:", err);
    }
  };

  return (
    <motion.div
      drag="x"
      style={{ x, rotate, opacity, ...style }}
      dragConstraints={{ left: -1000, right: 1000 }}
      dragElastic={0.25}
      onDragStart={() => {
        isDragging.current = true;
      }}

      onDragEnd={(e, info) => {
        // RELEASE DRAG
        setTimeout(() => {
          isDragging.current = false;
        }, 150);

        // Not enough swipe: restore card
        if (Math.abs(info.offset.x) <= 100) {
          isAnimating.current = true;
          controls.start({ x: 0, opacity: 1, transition: { duration: 0.35 } })
            .then(() => {
              isAnimating.current = false;
            });
          return;
        }

        // LEFT SWIPE
        if (info.offset.x < 0) {
          isAnimating.current = true;
          handleSwipeLeft();
          onSwipe("left");
          controls.start({
            x: -350, opacity: 0, transition: { duration: 0.45 }
          }).then(() => {
            isAnimating.current = false;
          });
        }
        // RIGHT SWIPE
        else {
          isAnimating.current = true;
          handleSwipeRight();
          onSwipe("right");
          controls.start({
            x: 350, opacity: 0, transition: { duration: 0.45 }
          }).then(() => {
            isAnimating.current = false;
          });
        }
      }}

      animate={controls}
    >
      <RBCard
        candidate={candidate}
        userGender={candidate.candidateData.gender}
        name={candidate.candidateData.user_name}
        title={candidate.candidateData.tagline}
        dob={candidate.candidateData.dob}
        gender={candidate.candidateData.gender}
        location_user={candidate.candidateData.location}
        score={candidate.score}
        match_interests_count={candidate.match_interests_count}
        isDraggingRef={isDragging}     
        isAnimatingRef={isAnimating}
        avatarUrl={config.BASE_URL + "/profilePhotos/" + candidate.photos[0].photo_url}
        showUserInfo={true}
        enableTilt={true}
        enableMobileTilt={false}
      />
    </motion.div>
  );
};

export default MainCard;
