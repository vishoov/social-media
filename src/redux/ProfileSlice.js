import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileUserPersonalDataError: null,
  profilePicUploadError: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileUserPersonalDataError: (state, action) => {
      state.profileUserPersonalDataError = action.payload;
    },
    setProfilePicUploadError: (state, action) => {
      state.profilePicUploadError = action.payload;
    },
  },
});

export const { setProfileUserPersonalDataError, setProfilePicUploadError } =
  profileSlice.actions;
export default profileSlice.reducer;
