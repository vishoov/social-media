import createDataContext from "./createDataContext";

const MESSAGE_REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_SENT_MESSAGES":
      if (action?.payload?.should_be_empty) {
        return [];
      } else {
        return {
          ...state,
          sent_messages: [...state.sent_messages, action.payload],
        };
      }
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
    case "SET_ALL_CONVERSATIONS":
      return {
        ...state,
        all_conversations: [...state.all_conversations, action.payload],
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

const set_all_conversations = (dispatch) => (payload) => {
  dispatch({
    type: "SET_ALL_CONVERSATIONS",
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
    set_all_conversations,
  },
  {
    // all states
    sent_messages: [],
    received_messages: [],
    error: null,
    all_conversations: [],
  }
);
