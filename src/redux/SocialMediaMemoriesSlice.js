import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    socialMediaMemories: [],
    socialMediaAnotherUserMemories: [],
    memoryCreationError: null,
    memoryNotFoundError: null,
    MemoryNotFoundForOtherUserError: null,
    abnormalError: null,
  },
};

export const socialMediaMemoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    setSocialMediaMemories: (state, action) => {
      state.value.socialMediaMemories.push(action.payload);
    },
    setSocialMediaAnotherUserMemories: (state, action) => {
      state.value.socialMediaAnotherUserMemories = action.payload;
    },
    setMemoryCreationError: (state, action) => {
      state.value.memoryCreationError = action.payload;
    },
    setMemoryNotFoundError: (state, action) => {
      state.value.memoryNotFoundError = action.payload;
    },
    setAbnormalError: (state, action) => {
      state.value.abnormalError = action.payload;
    },
    setMemoryNotFoundForOtherUserError: (state, action) => {
      state.value.MemoryNotFoundForOtherUserError = action.payload;
    },
  },
});

export const {
  setSocialMediaMemories,
  setSocialMediaAnotherUserMemories,
  setMemoryCreationError,
  setMemoryNotFoundError,
  setAbnormalError,
  setMemoryNotFoundForOtherUserError,
} = socialMediaMemoriesSlice.actions;
export default socialMediaMemoriesSlice.reducer;
