import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memoriesNotification: [],
};

const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setMemoriesNotification: (state, action) => {
      state.memoriesNotification.unshift(action.payload);

      while (state.memoriesNotification.length > 10) {
        state.memoriesNotification.pop();
      }
    },
  },
});

export const { setMemoriesNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
