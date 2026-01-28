import axios from "axios";
import config from "../services/config";

import { setUserDetails } from "./userDetailsSlice";
import { setPhotos } from "./photosSlice";

// LOAD FULL DETAILS
export const loadUserDetails = () => async (dispatch) => {
  const token = sessionStorage.getItem("token");
  const headers = { token };

  const res = await axios.get(config.BASE_URL + "/user/userdetails", { headers });
  dispatch(setUserDetails(res.data.data[0] || {}));
};

// UPDATE DETAILS (PROFILE + PREFERENCES in 1 API)
export const updateUserDetails = (fields) => async (dispatch) => {
  const token = sessionStorage.getItem("token");
  const headers = { token };

  await axios.put(config.BASE_URL + "/user/userdetails", fields, { headers });

  // Reload full details
  const res = await axios.get(config.BASE_URL + "/user/userdetails", { headers });
  dispatch(setUserDetails(res.data.data[0] || {}));
};

// LOAD PHOTOS
export const loadPhotos = () => async (dispatch) => {
  const token = sessionStorage.getItem("token");
  const headers = { token };

  const res = await axios.get(config.BASE_URL + "/photos/userphotos", { headers });
  dispatch(setPhotos(res.data.data || []));
};
