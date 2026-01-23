import { useEffect, useState } from "react"
import MainCard from "./MainCard"
import { serviceGetCandidate, serviceGetCandidatesAgain } from "../services/interactions"

const ProfileCardStack = () => {
  const [index, setIndex] = useState(0)
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const fetchCandidates = async () => {
      let data = await serviceGetCandidate()

      if (!data || data.length === 0) {
        data = await serviceGetCandidatesAgain()
      }
      setCandidates(data || [])
    }

    fetchCandidates()
  }, [])

  const handleSwipe = async (direction) => {
    const newIndex = index + 1
    setIndex(newIndex)

    // Load again when finished OR even on very first swipe (your condition)
    if (newIndex >= candidates.length) {
      const more = await serviceGetCandidatesAgain()
      
      setCandidates(more)
      setIndex(0)
    }
  }

  if (!candidates.length || !candidates[index]) {
    return <h2>Loading...</h2>
  }

  return (
    <MainCard
      key={candidates[index].token}
      candidate={candidates[index]}
      userGender={candidates[index].candidateData.gender}
      onSwipe={handleSwipe}
    />
  )
}

export default ProfileCardStack
