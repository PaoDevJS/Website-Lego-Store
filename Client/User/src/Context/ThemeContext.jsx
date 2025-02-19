import { createContext } from "react"

export const AppContext = createContext({})

const ThemeContext = ({ children }) => {

    return (
        <AppContext.Provider value={{}}>
            { children }
        </AppContext.Provider>
    )
}

export default ThemeContext