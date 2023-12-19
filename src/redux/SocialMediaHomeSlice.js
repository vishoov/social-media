import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

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
