import { useEffect, useState } from "react";
import MainCard from "./MainCard";
import { serviceGetCandidate, serviceGetCandidatesAgain } from "../services/interactions";

const ProfileCardStack = () => {
  const savedIndex = Number(sessionStorage.getItem("swipeIndex") || 0);

  const [index, setIndex] = useState(savedIndex);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      let data = await serviceGetCandidate();

      if (!data || data.length === 0) {
        data = await serviceGetCandidatesAgain();
      }

      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  const handleSwipe = async () => {
    const newIndex = index + 1;

    if (newIndex >= candidates.length) {
      const more = await serviceGetCandidatesAgain();
      setCandidates(more);

      setIndex(0);
      sessionStorage.setItem("swipeIndex", 0);
    } else {
      setIndex(newIndex);
      sessionStorage.setItem("swipeIndex", newIndex);
    }
  };

  if (!candidates.length || !candidates[index]) {
    return <h2>Loading...</h2>;
  }

  return (
    <MainCard
      key={candidates[index].token}
      candidate={candidates[index]}
      userGender={candidates[index].candidateData.gender}
      onSwipe={handleSwipe}
    />
  );
};

export default ProfileCardStack;
