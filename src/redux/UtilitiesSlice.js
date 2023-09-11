import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    followButtonChanged: true,
  },
};

export const UtilitiesSlice = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    setFollowButtonChange: (state, action) => {
      state.profile.followButtonChanged = action.payload;
    },
  },
});

export const { setFollowButtonChange } = UtilitiesSlice.actions;
export default UtilitiesSlice.reducer;
