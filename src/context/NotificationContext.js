import createDataContext from "./createDataContext";

const NOTIFICATION_REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_MEMORIES_NOTIFICATION":
      return {
        ...state,
        memoriesNotification: [action.payload, ...state.memoriesNotification],
      };
    case "SET_MEMORY_NOTIFICATION_USING_API":
      return {
        ...state,
        memoriesNotification: action.payload,
      };
    default:
      return state;
  }
};

const setMemoriesNotification = (dispatch) => (payload) => {
  dispatch({
    type: "SET_MEMORIES_NOTIFICATION",
    payload: payload,
  });
};

const setMemoriesNotificationsUsingApi = (dispatch) => (payload) => {
  dispatch({
    type: "SET_MEMORY_NOTIFICATION_USING_API",
    payload: payload,
  });
};

export const { Context, Provider } = createDataContext(
  NOTIFICATION_REDUCER,
  {
    // all actions
    setMemoriesNotification,
    setMemoriesNotificationsUsingApi,
  },
  {
    // all states
    memoriesNotification: [],
  }
);
