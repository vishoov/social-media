import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_conversations: [],
  all_conversation_requests: [],
};

const NonPersistConversationSlice = createSlice({
  name: "NonPersistConversations",
  initialState,
  reducers: {
    set_all_conversations: (state, action) => {
      state?.all_conversations?.push(action.payload);
    },
    set_all_conversation_requests: (state, action) => {
      state?.all_conversation_requests?.push(action.payload);
    },
  },
});

export const { set_all_conversations, set_all_conversation_requests } =
  NonPersistConversationSlice.actions;
export default NonPersistConversationSlice.reducer;
