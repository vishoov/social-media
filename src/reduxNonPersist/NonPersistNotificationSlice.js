import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memoriesNotification: [],
  messageNotification: null,
  notifications: [],
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
    setNotifications: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
});

export const {
  setMemoriesNotification,
  setMemoriesNotificationsUsingApi,
  setMessagesNotification,
  setNotifications,
} = NonPersistNotificationSlice.actions;
export default NonPersistNotificationSlice.reducer;
