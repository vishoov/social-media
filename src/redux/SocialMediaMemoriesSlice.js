import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    socialMediaMemories: [],
    socialMediaAnotherUserMemories: [],
  },
};

export const socialMediaMemoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    setSocialMediaMemories: (state, action) => {
      state.value.socialMediaMemories = action.payload;
    },
    setSocialMediaAnotherUserMemories: (state, action) => {
      state.value.socialMediaAnotherUserMemories = action.payload;
    },
  },
});

export const { setSocialMediaMemories, setSocialMediaAnotherUserMemories } =
  socialMediaMemoriesSlice.actions;
export default socialMediaMemoriesSlice.reducer;
