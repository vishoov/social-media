import { createContext, useReducer } from "react";

const Context = (reducer, actions, initialState) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};

    for (let Key in actions) {
      boundActions[Key] = actions[Key](dispatch);
    }

    return (
      <Context.Provider value={{ state: state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};

export default Context;
