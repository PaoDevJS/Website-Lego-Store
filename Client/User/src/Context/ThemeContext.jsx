import { createContext, useState } from "react";

export const AppContext = createContext({});

const ThemeContext = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    user: {},
    isUser: false,
  });
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [email, setEmail] = useState("");
  const [currentCart, setCurrentCart] = useState({
    carts: [],
    isCart: false,
  });
  const [openCart, setOpenCart] = useState({
    isOpen: false,
    product: {}
  });

  return (
    <AppContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        search,
        setSearch,
        currentUser,
        setCurrentUser,
        searchBrand,
        searchCategory,
        setSearchBrand,
        setSearchCategory,
        email,
        setEmail,
        currentCart,
        setCurrentCart,
        openCart,
        setOpenCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ThemeContext;
