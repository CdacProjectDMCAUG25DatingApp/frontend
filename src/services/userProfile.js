import axios from "axios"
import { toast } from "react-toastify"
import config from "./config"

export async function addUserProfile(gender, bio, religion, location, motherTongue, marital, dob, education, jobTitle, jobIndustry) {
    try {
        const url = config.BASE_URL + '/user/userprofile'
        const body = { gender, bio, religion, location, motherTongue, marital, dob, education, jobTitle, jobIndustry }
        const headers = {
            token: window.sessionStorage.getItem('token')
        }

        const response = await axios.post(url, body, { headers })
        return response.data
    } catch (error) {
        toast.error(error)
    }

}

export async function getUserProfile(){
    try {
        const url = config.BASE_URL + '/user/userprofile'
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        const response = await axios.get(url, { headers })
        return response.data.data[0]
    } catch (error) {
        toast.error(error)
    }
}