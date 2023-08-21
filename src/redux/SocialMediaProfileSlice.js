import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    open: false,
  },
};

export const socialMediaUserDataSlice = createSlice({
  name: "SocialMediaProfile",
  initialState: initialState,
  reducers: {
    setOpen: (state, action) => {
      state.value.SocialMediaUserData = action.payload;
    },
  },
});

export const { setSocialMediaUserData, setSocialMediaUserError } =
  socialMediaUserDataSlice.actions;
export default socialMediaUserDataSlice.reducer;
