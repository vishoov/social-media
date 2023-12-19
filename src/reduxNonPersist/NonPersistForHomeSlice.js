import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  HomeMemoriesContent: [],
  tracks: [],
};

export const NonPersistForHomeSlice = createSlice({
  name: "NonPersistForHome",
  initialState,
  reducers: {
    setHomeMemoriesContent: (state, action) => {
      state.HomeMemoriesContent.unshift(action.payload);
    },
    setHomeMemoriesContentWithApiCall: (state, action) => {
      state.HomeMemoriesContent = action.payload;
    },
    setTracksFromSpotify: (state, action) => {
      console.log("setTracksFromSpotify", action.payload);
      state.tracks = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks.push(action.payload);
    },
  },
});

export const {
  setHomeMemoriesContent,
  setHomeMemoriesContentWithApiCall,
  setTracksFromSpotify,
  setTracks,
} = NonPersistForHomeSlice.actions;
export default NonPersistForHomeSlice.reducer;
