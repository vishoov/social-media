import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
  searchError: null,
  requestUserSearchData: null,
  requestedUserSearchError: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setSearchDataError: (state, action) => {
      state.searchError = action.payload;
    },
    setRequestUserSearchData: (state, action) => {
      state.requestUserSearchData = action.payload;
    },
    setRequestedUserSearchError: (state, action) => {
      state.requestedUserSearchError = action.payload;
    },
  },
});

export const {
  setSearchData,
  setSearchDataError,
  setRequestUserSearchData,
  setRequestedUserSearchError,
} = searchSlice.actions;
export default searchSlice.reducer;
