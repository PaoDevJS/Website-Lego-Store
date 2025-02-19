import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import isRouter from './router/router.jsx'
import ThemeContext from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeContext>
    <RouterProvider router={isRouter} />
  </ThemeContext>
)
