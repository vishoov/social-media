import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  HomeMemoriesContent: [],
  HomeMemoriesContentError: [],
};

export const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    setHomeMemoriesContent: (state, action) => {
      state.HomeMemoriesContent.unshift(action.payload);

      while (state.HomeMemoriesContent.length > 10) {
        state.HomeMemoriesContent.pop();
      }
    },
    setHomeMemoriesContentWithApiCall: (state, action) => {
      state.HomeMemoriesContent = action.payload;
    },
    setHomeMemoriesContentError: (state, action) => {
      state.HomeMemoriesContentError = action.payload;
    },
  },
});

export const {
  setHomeMemoriesContent,
  setHomeMemoriesContentWithApiCall,
  setHomeMemoriesContentError,
} = HomeSlice.actions;
export default HomeSlice.reducer;
