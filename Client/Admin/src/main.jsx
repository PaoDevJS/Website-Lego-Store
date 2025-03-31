import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './router/routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { ThemeContext } from './context/themeContext.jsx'
import store from './redux/store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <ThemeContext>
        <RouterProvider router={routes} />
        <ToastContainer />
      </ThemeContext>
    </Provider>
  </>
)
