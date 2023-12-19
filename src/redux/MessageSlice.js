import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: {},
  selectedGroup: {},
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
  },
});

export const { setSelectedConversation, setSelectedGroup } =
  MessageSlice.actions;
export default MessageSlice.reducer;
