import { createContext, useReducer } from 'react';
import DarkModeReducer from './darkModelReducer';

const INIT_STATE = {
  darkMode: false,
};

export const DarkModeContext = createContext(INIT_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INIT_STATE);
  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
