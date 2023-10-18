import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memoriesNotification: [],
  messageNotification: null,
  groupCreationNotification: null,
};

const NonPersistNotificationSlice = createSlice({
  name: "NonPersistNotification",
  initialState,
  reducers: {
    setMemoriesNotification: (state, action) => {
      state?.memoriesNotification?.unshift(action.payload);
    },
    setMemoriesNotificationsUsingApi: (state, action) => {
      state.memoriesNotification = action.payload;
    },
    setMessagesNotification: (state, action) => {
      state.messageNotification = action.payload;
    },
    setGroupCreationNotification: (state, action) => {
      state.groupCreationNotification = action.payload;
    },
  },
});

export const {
  setMemoriesNotification,
  setMemoriesNotificationsUsingApi,
  setMessagesNotification,
  setGroupCreationNotification,
} = NonPersistNotificationSlice.actions;
export default NonPersistNotificationSlice.reducer;
