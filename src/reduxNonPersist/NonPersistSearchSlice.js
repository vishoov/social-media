import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestUserSearchData: null,
  searchData: [],
  searchDataForMessages: [],
};

const NonPersistSearchSlice = createSlice({
  name: "NonPersistSearch",
  initialState: initialState,
  reducers: {
    setRequestUserSearchData: (state, action) => {
      state.requestUserSearchData = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },

    setSearchDataForMessages: (state, action) => {
      state.searchDataForMessages = action.payload;
    },
  },
});

export const {
  setRequestUserSearchData,
  setSearchData,
  setSearchDataForMessages,
} = NonPersistSearchSlice.actions;

export default NonPersistSearchSlice.reducer;
