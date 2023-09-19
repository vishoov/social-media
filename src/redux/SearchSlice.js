import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
  searchError: null,
  requestedUserSearchError: null,
  isFollowing: false,
  requestedUserSearchdataForPersist: null,
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
    setRequestedUserSearchError: (state, action) => {
      state.requestedUserSearchError = action.payload;
    },
    setIsFollowing: (state, action) => {
      state.isFollowing = action.payload;
    },
    setRequestedUserSearchDataForPersist: (state, action) => {
      state.requestedUserSearchdataForPersist = action.payload;
    },
  },
});

export const {
  setSearchData,
  setSearchDataError,
  setRequestedUserSearchError,
  setIsFollowing,
  setRequestedUserSearchDataForPersist,
} = searchSlice.actions;
export default searchSlice.reducer;
