import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
});

export const { setMemoriesNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
