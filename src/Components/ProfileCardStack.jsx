import { useEffect, useState } from "react"
import MainCard from "./MainCard"
import { serviceGetCandidate } from "../services/interactions"
import axios from "axios"
import config from "../services/config"



const ProfileCardStack = () => {
  const [index, setIndex] = useState(0)
  const [gender, setGender] = useState("")
  const [genderList, setGenderList] = useState([])
  const [candidates, setCandidates] = useState([])
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await serviceGetCandidate()
      const genderRes = await axios.get(config.BASE_URL + "/api/gender", {
        headers: {
          token: sessionStorage.getItem("token")
        }
      });
      setGenderList(genderRes.data.data)
      console.log(genderRes)
      console.log(data)
      setCandidates(data)
    }
    fetchCandidates()
  }, [])

  const getMappedGender = () => {
    const userGender = genderList.filter(g => g.gender_id ==  candidates[0].candidateData.gender)
    return userGender[0].name
  }

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
      candidate={candidates[index]}
      userGender={getMappedGender()}
      onSwipe={handleSwipe}

    />
  )
}

export default ProfileCardStack
