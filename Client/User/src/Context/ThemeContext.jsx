import { createContext, useState } from "react"

export const AppContext = createContext({})

const ThemeContext = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [search, setSearch] = useState(false)

    return (
        <AppContext.Provider value={{openMenu, setOpenMenu, search, setSearch}}>
            { children }
        </AppContext.Provider>
    )
}

export default ThemeContext