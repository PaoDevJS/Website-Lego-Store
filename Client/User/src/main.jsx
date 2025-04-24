import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/router'
import { RouterProvider } from 'react-router-dom'
import ThemeContext from "./Context/ThemeContext"
import { ToastContainer } from 'react-toastify'
import { store } from './redux/store'
import { Provider } from "react-redux"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContext>
        <RouterProvider router={router} />  
        <ToastContainer />
      </ThemeContext>
    </Provider>
  </StrictMode>,
)
