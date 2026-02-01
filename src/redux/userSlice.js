import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    name: "",
    email: "",
    mobile: "",
    onboarding: {
      needs_profile: true,
      needs_photos: true,
      needs_preferences: true
    },
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setOnboarding: (state, action) => {
      state.onboarding = { ...state.onboarding, ...action.payload };
    },
    logout: () => ({
      token: "",
      name: "",
      email: "",
      mobile: "",
      onboarding: {
        needs_profile: true,
        needs_photos: true,
        needs_preferences: true
      }
    })
  }
});

export const { setUser, logout, setOnboarding } = userSlice.actions;
export default userSlice.reducer;
