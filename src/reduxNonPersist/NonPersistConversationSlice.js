import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_conversations: [],
};

const NonPersistConversationSlice = createSlice({
  name: "NonPersistConversations",
  initialState,
  reducers: {
    set_all_conversations: (state, action) => {
      state?.all_conversations?.push(action.payload);
    },
  },
});

export const { set_all_conversations } = NonPersistConversationSlice.actions;
export default NonPersistConversationSlice.reducer;
