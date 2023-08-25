import createDataContext from "./createDataContext";

const ProfileReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODEL":
      return { ...state, open: action.payload };
    case "EDIT_STYLE":
      return {
        ...state,
        style: action.payload,
      };
    case "SHOW_MEMORIES":
      return {
        ...state,
        showMemories: action.payload,
      };
    default:
      return state;
  }
};

const openModel = (dispatch) => (what) => {
  dispatch({ type: "OPEN_MODEL", payload: what });
};

const editStyle = (dispatch) => (newStyle) => {
  dispatch({ type: "EDIT_STYLE", payload: newStyle });
};

const showMemories = (dispatch) => (open) => {
  dispatch({ type: "SHOW_MEMORIES", payload: open });
};

export const { Context, Provider } = createDataContext(
  ProfileReducer,
  {
    openModel,
    editStyle,
    showMemories,
  },
  {
    open: false,
    style: {
      width: 800,
      height: 750,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 2,
      borderRadius: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    showMemories: -1,
  }
);
