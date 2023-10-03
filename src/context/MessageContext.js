import createDataContext from "./createDataContext";

const MESSAGE_REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_SENT_MESSAGES":
      return {
        ...state,
        sent_messages: [...state.sent_messages, action.payload],
      };
    case "SET_RECEIVED_MESSAGES":
      return {
        ...state,
        received_messages: [...state.received_messages, action.payload],
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const set_sent_messages = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SENT_MESSAGES",
    payload: payload,
  });
};

const set_received_messages = (dispatch) => (payload) => {
  dispatch({
    type: "SET_RECEIVED_MESSAGES",
    payload: payload,
  });
};

const set_error = (dispatch) => (payload) => {
  dispatch({
    type: "SET_ERROR",
    payload: payload,
  });
};

export const { Context, Provider } = createDataContext(
  MESSAGE_REDUCER,
  {
    // all actions
    set_sent_messages,
    set_received_messages,
    set_error,
  },
  {
    // all states
    sent_messages: [],
    received_messages: [],
    error: null,
  }
);
