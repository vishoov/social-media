import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socialMediaMemories: [],
  socialMediaMemoriesOfAnotherUser: [],
  memoryCount: 0,
  tracks: null,
};

const NonPersistMemoriesSlice = createSlice({
  name: "NonPersistMemories",
  initialState,
  reducers: {
    setSocialMediaMemories: (state, action) => {
      state?.socialMediaMemories?.push(...action.payload);
    },
    setSocialMediaMemoriesOfAnotherUser: (state, action) => {
      state.socialMediaMemoriesOfAnotherUser.push(...action.payload);
    },
    setSocialMediaMemoriesOfAnotherUserFirstTime: (state, action) => {
      state.socialMediaMemoriesOfAnotherUser = action.payload;
    },
    setMemoryCount: (state, action) => {
      state.memoryCount = action.payload;
    },
  },
});

export const {
  setSocialMediaMemories,
  setSocialMediaMemoriesOfAnotherUser,
  setSocialMediaMemoriesOfAnotherUserFirstTime,
  setMemoryCount,
} = NonPersistMemoriesSlice.actions;
export default NonPersistMemoriesSlice.reducer;
