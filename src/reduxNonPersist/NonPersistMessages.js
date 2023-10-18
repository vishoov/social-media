import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_messages: [],
  deleted_message: null,
};

const NonPersistMessageSlice = createSlice({
  name: "NonPersistMessage",
  initialState,
  reducers: {
    set_all_messages: (state, action) => {
      state?.all_messages?.push(action.payload);
    },

    reset_all_messages: (state, action) => {
      state.all_messages = [];
    },
    set_deleted_message: (state, action) => {
      state.deleted_message = action.payload;
    },
  },
});

export const { set_all_messages, reset_all_messages, set_deleted_message } =
  NonPersistMessageSlice.actions;
export default NonPersistMessageSlice.reducer;
