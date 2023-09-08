import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  HomeMemoriesContent: [],
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
  },
});

export const { setHomeMemoriesContent } = HomeSlice.actions;
export default HomeSlice.reducer;
