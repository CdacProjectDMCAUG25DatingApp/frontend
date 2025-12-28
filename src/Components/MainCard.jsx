import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import "../Styles/MainCard.css";
import RBCard from "./RBCard";
import config from "../services/config";

const MainCard = ({ image, onSwipe, candidate, score , photos }) => {
  console.log(candidate,photos)
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-50, 50]);
  const opacity = useTransform(
    x,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );

  const controls = useAnimation();

  const style = {
    flex : 1,
    borderRadius: 10,
    height: "70svh",
    maxHeight: "450px",
};

return (
  <motion.div
    drag="x"
    style={{ x, rotate, opacity, ...style }}
    dragConstraints={{ left: -1000, right: 1000 }}
    onDragEnd={(e, info) => {
      if (Math.abs(info.offset.x) <= 150) {
        controls.start({ x: 0 });
        return;
      } if (info.offset.x < 0) {

        // handleSwipeLeft();
        onSwipe("left")
        controls.start({ x: -300 })
      } else {
        onSwipe("right")
        // handleSwipeRight();
        controls.start({ x: 300 })
      }
    }}
    animate={controls}
  >
    <RBCard
      name={candidate.user_name}
      title={photos[0].prompt}
      handle="javicodes"
      status="Online" 
      contactText="Contact Me"
      avatarUrl={ (config.BASE_URL+"/profilePhotos/"+image) || "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80"}
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={false}
      onContactClick={() => console.log('Contact clicked')}
    >

    </RBCard>
  </motion.div>
);
};



export default MainCard;
