import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  HomeMemoriesContent: [],
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
  },
});

export const { setHomeMemoriesContent, setHomeMemoriesContentWithApiCall } =
  NonPersistForHomeSlice.actions;
export default NonPersistForHomeSlice.reducer;
