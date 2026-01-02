import axios from "axios";
import config from "./config";



export async function addPhotos({ img0, img1, img2, img3, img4, img5 }) {
    const form = new FormData()
    form.append("img0", img0)
    form.append("img1", img1)
    form.append("img2", img2)
    form.append("img3", img3)
    form.append("img4", img4)
    form.append("img5", img5)
    const headers = {
        token: window.sessionStorage.getItem('token')
    }
    try {
        const response = await axios.post(config.BASE_URL + "/photos/addPhotos", form, { headers })
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
    }
}

export async function fetchPhotos() {
    try {
        const response = await axios.get(config.BASE_URL + "/photos/userphotos", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
        if (response.data.status) {
            return response.data.data
        }
    } catch (err) {
        console.log(err)
    }
}