import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: {},
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const { setSelectedConversation } = MessageSlice.actions;
export default MessageSlice.reducer;
