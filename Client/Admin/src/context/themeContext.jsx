import { createContext, useState } from "react";

export const createThemeApp = createContext({});

export const ThemeContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <createThemeApp.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </createThemeApp.Provider>
  );
};
