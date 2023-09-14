import createDataContext from "./createDataContext";

const HOME_REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_HOME_MEMORIES_CONTENT":
      return {
        ...state,
        HomeMemoriesContent: [action.payload, ...state.HomeMemoriesContent],
      };
    case "SET_HOME_MEMORIES_CONTENT_WITH_API_CALL":
      return {
        ...state,
        HomeMemoriesContent: action.payload,
      };
    case "SET_HOME_MEMORIES_CONTENT_ERROR":
      return {
        ...state,
        HomeMemoriesContentError: action.payload,
      };
    default:
      return state;
  }
};

const setHomeMemoriesContent = (dispatch) => (payload) => {
  dispatch({
    type: "SET_HOME_MEMORIES_CONTENT",
    payload: payload,
  });
};

const setHomeMemoriesContentWithApiCall = (dispatch) => (payload) => {
  dispatch({
    type: "SET_HOME_MEMORIES_CONTENT_WITH_API_CALL",
    payload: payload,
  });
};
const setHomeMemoriesContentError = (dispatch) => (payload) => {
  dispatch({
    type: "SET_HOME_MEMORIES_CONTENT_ERROR",
    payload: payload,
  });
};

export const { Context, Provider } = createDataContext(
  HOME_REDUCER,
  {
    // all actions
    setHomeMemoriesContent,
    setHomeMemoriesContentWithApiCall,
    setHomeMemoriesContentError,
  },
  {
    // all states
    HomeMemoriesContent: [],
    HomeMemoriesContentError: [],
  }
);
