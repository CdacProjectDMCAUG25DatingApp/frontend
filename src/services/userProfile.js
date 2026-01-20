import axios from "axios"
import { toast } from "react-toastify"
import config from "./config"

export async function addUserProfile(gender, bio, religion, location, motherTongue, marital, dob, education, tagline, jobIndustry) {
    try {
        const url = config.BASE_URL + '/user/userprofile'
        const body = { gender, bio, religion, location, motherTongue, marital, dob:toSqlDate(dob), education, tagline, jobIndustry }
        const headers = {
            token: window.sessionStorage.getItem('token')
        }

        const response = await axios.post(url, body, { headers })
        return response.data
    } catch (error) {
        toast.error(error)
    }

}

const toSqlDate = (date) => {
    if (!date) return null;
    const rawDate = new Date(date)
    const sqlDate = rawDate.toLocaleDateString('en-CA')
    return sqlDate
};

export async function getUserDetails(){
    try {
        const url = config.BASE_URL + '/user/userdetails'
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        const response = await axios.get(url, { headers })
        return response.data.data[0]
    } catch (error) {
        toast.error(error)
    }
}