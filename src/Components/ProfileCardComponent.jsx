import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import "../Styles/ProfileCard.css";

const ProfileCardComponent = ({ image, color, onSwipe }) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-50, 50]);
  const opacity = useTransform(
    x,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );

  const controls = useAnimation();

  const style = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundColor: color,
    boxShadow: "5px 10px 18px #888888",
    borderRadius: 10,
    height: 550,
    width: 300,
    
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
          onSwipe("left");
          controls.start({ x: -300 });
        } else {
          onSwipe("right");
          // handleSwipeRight();
          controls.start({ x: 300 });
        }
      }}
      animate={controls}
    />
  );
};



export default ProfileCardComponent;
