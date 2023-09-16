import createDataContext from "./createDataContext";

const MEMORY_REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_SOCIAL_MEDIA_MEMORIES":
      return {
        ...state,
        socialMediaMemories: [...state.socialMediaMemories, ...action.payload],
      };
    case "SET_SOCIAL_MEDIA_MEMORIES_OF_ANOTHER_USER":
      return {
        ...state,
        socialMediaMemoriesOfAnotherUser: [
          ...state.socialMediaMemoriesOfAnotherUser,
          ...action.payload,
        ],
      };
    case "SET_MEMORY_COUNT":
      return {
        ...state,
        memoryCount: action.payload,
      };
    default:
      return state;
  }
};

const setSocialMediaMemories = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SOCIAL_MEDIA_MEMORIES",
    payload: payload,
  });
};

const setSocialMediaMemoriesOfAnotherUser = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SOCIAL_MEDIA_MEMORIES_OF_ANOTHER_USER",
    payload: payload,
  });
};

const setMemoryCount = (dispatch) => (payload) => {
  dispatch({
    type: "SET_MEMORY_COUNT",
    payload: payload,
  });
};

export const { Context, Provider } = createDataContext(
  MEMORY_REDUCER,
  {
    // all actions
    setSocialMediaMemories,
    setSocialMediaMemoriesOfAnotherUser,
    setMemoryCount,
  },
  {
    // all states
    socialMediaMemories: [],
    socialMediaMemoriesOfAnotherUser: [],
    memoryCount: 0,
  }
);
