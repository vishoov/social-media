import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    SocialMediaUserData: null,
    SocialMediaUserError: null,
  },
};

export const socialMediaUserDataSlice = createSlice({
  name: "SocialMediaUser",
  initialState: initialState,
  reducers: {
    setSocialMediaUserData: (state, action) => {
      state.value.SocialMediaUserData = action.payload;
    },
    setSocialMediaUserError: (state, action) => {
      state.value.SocialMediaUserError = action.payload;
    },
  },
});

export const { setSocialMediaUserData, setSocialMediaUserError } =
  socialMediaUserDataSlice.actions;
export default socialMediaUserDataSlice.reducer;
