import { useEffect, useState } from "react"
import MainCard from "./MainCard"
import { serviceGetCandidate } from "../services/interactions"



const ProfileCardStack = () => {
  const [index, setIndex] = useState(0)

  const [candidates, setCandidates] = useState([])
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await serviceGetCandidate()
      setCandidates(data)
    }
    fetchCandidates()
  }, [])

  const handleSwipe = (direction) => {
    console.log("Swiped:", direction, candidates[index])
    setIndex((prev) => prev + 1)
  }

  if (index >= candidates.length) {
    return <h2>No more cards</h2>
  }
  return (
    <MainCard
      key={candidates[index].token}
      image={candidates[index].photos[0].photo_url}
      candidate={candidates[index].candidateData}
      score ={candidates[index].score}
      photos ={candidates[index].photos}
      onSwipe={handleSwipe}
    />
  )
}

export default ProfileCardStack
