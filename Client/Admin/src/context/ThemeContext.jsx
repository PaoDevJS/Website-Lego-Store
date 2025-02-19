import { createContext } from "react"

export const ThemeApp = createContext({})

const ThemeContext = ({ children }) => {
    return (
        <ThemeApp.Provider value={{}}>
            { children }
        </ThemeApp.Provider>
    )
}

export default ThemeContext;