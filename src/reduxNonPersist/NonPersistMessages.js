import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_messages: [],
};

const NonPersistMessageSlice = createSlice({
  name: "NonPersistMessage",
  initialState,
  reducers: {
    set_all_messages: (state, action) => {
      state?.all_messages?.push(action.payload);
    },
  },
});

export const { set_all_messages } = NonPersistMessageSlice.actions;
export default NonPersistMessageSlice.reducer;
