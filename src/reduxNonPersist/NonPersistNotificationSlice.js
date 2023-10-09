import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memoriesNotification: [],
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
  },
});

export const { setMemoriesNotification, setMemoriesNotificationsUsingApi } =
  NonPersistNotificationSlice.actions;
export default NonPersistNotificationSlice.reducer;
