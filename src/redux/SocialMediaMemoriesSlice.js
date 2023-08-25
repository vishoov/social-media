import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    socialMediaMemories: [],
  },
};

export const socialMediaMemoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    setSocialMediaMemories: (state, action) => {
      state.value.socialMediaMemories = action.payload;
    },
  },
});

export const { setSocialMediaMemories } = socialMediaMemoriesSlice.actions;
export default socialMediaMemoriesSlice.reducer;
