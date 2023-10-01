import createDataContext from "./createDataContext";

const SEARCH_REDUCER = (state, action) => {
  switch (action.type) {
    case "REQUEST_USER_SEARCH_DATA":
      return {
        ...state,
        requestUserSearchData: action.payload,
      };
    case "SET_SEARCH_DATA":
      return {
        ...state,
        searchData: action.payload,
      };
    case "SET_SEARCH_DATA_FOR_MESSAGES":
      return {
        ...state,
        searchDataForMessages: action.payload,
      };
    default:
      return state;
  }
};

const setRequestUserSearchData = (dispatch) => (payload) => {
  dispatch({
    type: "REQUEST_USER_SEARCH_DATA",
    payload: payload,
  });
};

const setSearchData = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SEARCH_DATA",
    payload: payload,
  });
};

const setSearchDataForMessages = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SEARCH_DATA_FOR_MESSAGES",
    payload: payload,
  });
};

export const { Context, Provider } = createDataContext(
  SEARCH_REDUCER,
  {
    // all actions
    setRequestUserSearchData,
    setSearchData,
    setSearchDataForMessages,
  },
  {
    // all states
    requestUserSearchData: null,
    searchData: [],
    searchDataForMessages: [],
  }
);
