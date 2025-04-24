import { createContext, useState } from "react";

export const createThemeApp = createContext({});

export const ThemeContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [orders, setOrders] = useState([]);
  return (
    <createThemeApp.Provider
      value={{ currentUser, setCurrentUser, orders, setOrders }}
    >
      {children}
    </createThemeApp.Provider>
  );
};
