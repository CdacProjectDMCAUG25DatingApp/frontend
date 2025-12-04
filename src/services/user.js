import axios from "axios";
import { toast } from "react-toastify";
import config from "./config";

export async function loginUser(email, password) {
    try {
        const userbody = { email, password }
        const url = config.BASE_URL + '/user/signin'
        const response = await axios.post(url, userbody)
        return response.data
    } catch (ex) {
        if (ex.request) {
            toast.error("Server not responding. Please try again later." + ex.message)
        }else{
            toast.error("Something Went Wrong"+ex.message)
        }
        
    }
}

export async function registerUser(name, email, password, mobile) {
    try {
        const url = config.BASE_URL + '/user/signup'
        const body = { name, email, password, mobile }
        const response = await axios.post(url, body)
        return response.data
    } catch (ex) {
        toast.error(ex)
    }
}

export async function getProfile() {
    try {
        const url = config.BASE_URL + '/user/profile'
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error) {
        toast.error(error)
    }
}

export async function updateUser(mobile) {
    try {
        const url = config.BASE_URL + '/user'
        const body = { mobile }
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        const response = await axios.put(url, body, { headers })
        return response.data
    } catch (error) {
        toast.error(error)
    }
}