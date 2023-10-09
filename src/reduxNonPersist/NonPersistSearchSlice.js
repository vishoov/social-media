import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestUserSearchData: null,
  searchData: [],
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
  },
});

export const { setRequestUserSearchData, setSearchData } =
  NonPersistSearchSlice.actions;

export default NonPersistSearchSlice.reducer;
