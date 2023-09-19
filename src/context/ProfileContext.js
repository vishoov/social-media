import createDataContext from "./createDataContext";

const ProfileReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODEL":
      return { ...state, open: action.payload };
    // case "EDIT_STYLE":
    //   return {
    //     ...state,
    //     style: action.payload,
    //   };
    case "SHOW_MEMORIES":
      return {
        ...state,
        showMemories: action.payload,
      };
    case "SET_FOLLOWERS_COUNT":
      return {
        ...state,
        FollowersCount: action.payload,
      };
    case "SET_FOLLOWINGS_COUNT":
      return {
        ...state,
        FollowingsCount: action.payload,
      };
    case "FOLLOWERS_COUNT_ERROR":
      return {
        ...state,
        FollowersCountError: action.payload,
      };
    case "FOLLOWINGS_COUNT_ERROR":
      return {
        ...state,
        FollowingsCountError: action.payload,
      };
    default:
      return state;
  }
};

const openModel = (dispatch) => (what) => {
  dispatch({ type: "OPEN_MODEL", payload: what });
};

// const editStyle = (dispatch) => (newStyle) => {
//   dispatch({ type: "EDIT_STYLE", payload: newStyle });
// };

const showMemories = (dispatch) => (open) => {
  dispatch({ type: "SHOW_MEMORIES", payload: open });
};

const setFollowersCount = (dispatch) => (payload) => {
  dispatch({
    type: "SET_FOLLOWERS_COUNT",
    payload: payload,
  });
};

const setFollowingsCount = (dispatch) => (payload) => {
  dispatch({
    type: "SET_FOLLOWINGS_COUNT",
    payload: payload,
  });
};

const setFollowersCountError = (dispatch) => (payload) => {
  dispatch({
    type: "FOLLOWERS_COUNT_ERROR",
    payload: payload,
  });
};

const setFollowingsCountError = (dispatch) => (payload) => {
  dispatch({
    type: "FOLLOWINGS_COUNT_ERROR",
    payload: payload,
  });
};
export const { Context, Provider } = createDataContext(
  ProfileReducer,
  {
    openModel,
    showMemories,
    setFollowersCount,
    setFollowingsCount,
    setFollowersCountError,
    setFollowingsCountError,
  },
  {
    open: false,
    showMemories: -1,
    FollowersCount: 0,
    FollowingsCount: 0,
    FollowersCountError: null,
    FollowingsCountError: null,
  }
);
