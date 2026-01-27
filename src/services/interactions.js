import axios from "axios"
import config from "./config"
import { toast } from "react-toastify"


export const serviceGetCandidate = async() => {
    const response = await axios.get(config.BASE_URL + '/interactions/getcandidates', { headers: {token : window.sessionStorage.getItem('token') }})
    if(response.status == 'error'){
        toast.error("Something Went Wrong"+response.error)
        return
    }
    if(response.data.status =='success'){
        
        return response.data.data
    }
}

export const serviceGetCandidatesAgain = async () => {
  const response = await axios.get(
    config.BASE_URL + '/interactions/getcandidates_again',
    { headers: { token: window.sessionStorage.getItem("token") } }
  );

  if (response.data.status === "success") {
    return response.data.data;
  }
  return [];
};
