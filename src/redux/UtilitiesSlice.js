import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    followButtonChanged: true,
  },
  currentInterface: null,
};

export const UtilitiesSlice = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    setFollowButtonChange: (state, action) => {
      state.profile.followButtonChanged = action.payload;
    },
    setCurrentInterface: (state, action) => {
      state.currentInterface = action.payload;
    },
  },
});

export const { setFollowButtonChange, setCurrentInterface } =
  UtilitiesSlice.actions;
export default UtilitiesSlice.reducer;
