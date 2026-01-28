import axios from "axios";
import config from "./config";

export const addPhotos = async (imgObj) => {
  try {
    const token = sessionStorage.getItem("token");
    const headers = { token };

    const formData = new FormData();

    for (let i = 0; i < 6; i++) {
      formData.append("photos", imgObj[`img${i}`]);
    }

    const res = await axios.post(
      config.BASE_URL + "/photos/upload",
      formData,
      { headers }
    );

    return res.data;
  } catch (err) {
    return null;
  }
};
