import { useState } from "react";
import ProfileCardComponent from "./ProfileCardComponent";


const cards = [
    {
        id: 1,
        image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
        color: '#55ccff'
    },
    {
        id: 2,
        image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
        color: '#e8e8e8'
    },
    {
        id: 3,
        image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
        color: '#0a043c'
    },
    {
        id: 4,
        image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
        color: 'black'
    }
];



const ProfileCardStack = () => {
  const [index, setIndex] = useState(0);

  const handleSwipe = (direction) => {
    console.log("Swiped:", direction, cards[index]);
    setIndex((prev) => prev + 1);
  };

  if (index >= cards.length) {
    return <h2>No more cards</h2>;
  }

  return (
    <ProfileCardComponent
      key={cards[index].id}
      image={cards[index].image}
      color={cards[index].color}
      onSwipe={handleSwipe}
    />
  );
};

export default ProfileCardStack;
