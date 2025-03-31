import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/router'
import { RouterProvider } from 'react-router-dom'
import ThemeContext from "./Context/ThemeContext"
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContext>
      <RouterProvider router={router} />  
      <ToastContainer />
    </ThemeContext>
  </StrictMode>,
)
