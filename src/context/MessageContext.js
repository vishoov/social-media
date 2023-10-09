import createDataContext from "./createDataContext";

const MESSAGE_REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_SENT_MESSAGES":
      if (action?.payload?.should_be_empty) {
<<<<<<< HEAD
        return [];
=======
        return null;
>>>>>>> defdabe (NEW)
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
<<<<<<< HEAD
    case "SET_ALL_CONVERSATIONS":
      return {
        ...state,
        all_conversations: [...state.all_conversations, action.payload],
=======
    case "SET_ALL_MESSAGES":
      return {
        ...state,
        all_messages: [...state.all_messages, action.payload],
>>>>>>> defdabe (NEW)
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

<<<<<<< HEAD
const set_all_conversations = (dispatch) => (payload) => {
  dispatch({
    type: "SET_ALL_CONVERSATIONS",
=======
const set_all_messages = (dispatch) => (payload) => {
  dispatch({
    type: "SET_ALL_MESSAGES",
>>>>>>> defdabe (NEW)
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
<<<<<<< HEAD
    set_all_conversations,
=======
    set_all_messages,
>>>>>>> defdabe (NEW)
  },
  {
    // all states
    sent_messages: [],
    received_messages: [],
<<<<<<< HEAD
    error: null,
    all_conversations: [],
=======
    all_messages: [],
    error: null,
>>>>>>> defdabe (NEW)
  }
);
