import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FollowersCount: 0,
  FollowingsCount: 0,
  Followings: [],
  Followers: [],
};

const NonPersistProfileSlice = createSlice({
  name: "NonPersistProfile",
  initialState,
  reducers: {
    setFollowersCount: (state, action) => {
      state.FollowersCount = action.payload;
    },
    setFollowingsCount: (state, action) => {
      state.FollowingsCount = action.payload;
    },
    setFollowingsWithProfile: (state, action) => {
      state.Followings = action.payload;
    },
    setFollowersWithProfile: (state, action) => {
      state.Followers = action.payload;
    },
  },
});

export const {
  setFollowersCount,
  setFollowingsCount,
  setFollowingsWithProfile,
  setFollowersWithProfile,
} = NonPersistProfileSlice.actions;
export default NonPersistProfileSlice.reducer;
