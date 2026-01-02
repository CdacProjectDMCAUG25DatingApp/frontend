import axios from "axios"
import { toast } from "react-toastify"
import config from "./config"

export async function addUserPreferences(lookingFor, openTo, zodiac, familyPlan, education, communicationStyle, lovestyle, drinking, smoking, workout
    , dietary, sleepingHabit, Religion, personalityType, pet ,gender) {
    try {
        const url = config.BASE_URL + '/user/userpreferences'
        const body = { lookingFor, openTo, zodiac, familyPlan, education, communicationStyle, lovestyle,
             drinking, smoking, workout, dietary, sleepingHabit, Religion, personalityType, pet ,gender}
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        const response = await axios.post(url, body, { headers })
        return response.data
    } catch (error) {
        toast.error(error)
    }

}

export async function getUserPreferences(){
    
}