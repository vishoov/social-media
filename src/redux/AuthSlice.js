import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    signupData: null,
    signupError: null,
    signinData: null,
    signinError: null,
    otherError: null,
    userDetails: null,
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // all the action will be defined here!
    DO_SIGNUP: (state, action) => {
      state.value.signupData = action.payload;
    },
    SIGNUP_ERROR: (state, action) => {
      state.value.signupError = action.payload;
    },
    DO_SIGNIN: (state, action) => {
      state.value.signinData = action.payload;
    },
    SIGNIN_ERROR: (state, action) => {
      state.value.signinError = action.payload;
    },
    USER_NOT_FOUND: (state, action) => {
      state.value.otherError = action.payload;
    },
    USER_DETAILS: (state, action) => {
      state.value.userDetails = action.payload;
    },
    OTHER_ERROR: (state, action) => {
      state.value.otherError = action.payload;
    }
  },
});

export const {
  DO_SIGNUP,
  SIGNUP_ERROR,
  DO_SIGNIN,
  SIGNIN_ERROR,
  USER_NOT_FOUND,
  USER_DETAILS,
  OTHER_ERROR
} = AuthSlice.actions;
export default AuthSlice.reducer;
