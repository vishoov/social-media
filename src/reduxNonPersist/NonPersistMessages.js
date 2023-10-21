import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_messages: [],
  all_group_messages: [],
  deleted_message: null,
  delete_group_messages: null,
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
    set_all_group_messages: (state, action) => {
      state.all_group_messages.push(action.payload);
    },
    reset_all_group_messages: (state, action) => {
      state.all_group_messages = [];
    },
    set_delete_group_messages: (state, action) => {
      state.delete_group_messages = action.payload;
    },
  },
});

export const {
  set_all_messages,
  reset_all_messages,
  set_deleted_message,
  set_all_group_messages,
  reset_all_group_messages,
  set_delete_group_messages,
} = NonPersistMessageSlice.actions;
export default NonPersistMessageSlice.reducer;
