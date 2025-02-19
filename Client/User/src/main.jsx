import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/router'
import { RouterProvider } from 'react-router-dom'
import ThemeContext from "./Context/ThemeContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContext>
      <RouterProvider router={router} />  
    </ThemeContext>
  </StrictMode>,
)
