import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    activationKeyFailure: null,
  },
};

export const IntermediateSlice = createSlice({
  name: "intermediate",
  initialState: initialState,
  reducers: {
    activationKeyFailure: (state, action) => {
      state.value.activationKeyFailure = action.payload;
    },
  },
});

export const { activationKeyFailure } = IntermediateSlice.actions;
export default IntermediateSlice.reducer;
