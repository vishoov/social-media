import createDataContext from "./createDataContext";

const USER_REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_SIGN_UP_ERROR":
      return {
        ...state,
        signupError: action.payload,
      };
    case "SET_SIGN_IN_ERROR":
      return {
        ...state,
        signinError: action.payload,
      };
    case "SET_SHOULD_SPEAK":
      return {
        ...state,
        shouldSpeak: action.payload,
      };
    case "SET_SOCIAL_MEDIA_USER_ERROR":
      return {
        ...state,
        socialMediaUserError: action.payload,
      };
    default:
      return state;
  }
};

const setSignUpError = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SIGN_UP_ERROR",
    payload: payload,
  });
};

const setSignInError = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SIGN_IN_ERROR",
    payload: payload,
  });
};
const setShouldSpeak = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SHOULD_SPEAK",
    payload: payload,
  });
};
const setSocialMediaUserError = (dispatch) => (payload) => {
  dispatch({
    type: "SET_SOCIAL_MEDIA_USER_ERROR",
    payload: payload,
  });
};

export const { Context, Provider } = createDataContext(
  USER_REDUCER,
  {
    // all actions
    setSignUpError,
    setSignInError,
    setShouldSpeak,
    setSocialMediaUserError,
  },
  {
    // all states
    signupError: null,
    signinError: null,
    shouldSpeak: false,
    socialMediaUserError: null,
  }
);
