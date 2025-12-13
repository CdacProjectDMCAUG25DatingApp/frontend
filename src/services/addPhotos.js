import axios from "axios";
import config from "./config";

const headers = {
    token: window.sessionStorage.getItem('token')
}

export async function addPhotos(form) {
    const body = form
    try {
        const response = await axios.post(config.BASE_URL + "/photos/addPhotos", body, { headers })
        return response
    } catch (err) {
        console.log(err)
    }
}

export async function fetchPhotos() {
    try {
        const response = await axios.get(config.BASE_URL + "/photos/userphotos", { headers })
        if (response.data.status) {
            return response.data.data
        }
    } catch (err) {
        console.log(err)
    }
}