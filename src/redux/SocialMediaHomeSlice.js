import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  HomeMemoriesContent: [],
  HomeMemoriesContentError: [],
};

export const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {},
});

export const {
  setHomeMemoriesContent,
  setHomeMemoriesContentWithApiCall,
  setHomeMemoriesContentError,
} = HomeSlice.actions;
export default HomeSlice.reducer;
