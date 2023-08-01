import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/redux/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
