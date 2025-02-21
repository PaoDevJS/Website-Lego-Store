import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LayoutLoginAndRegister from '../Layouts/LayoutLoginAndRegister'
import Login from '../pages/Login'
import Register from '../pages/Register'

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/customer",
            element: <LayoutLoginAndRegister />,
            children: [
                {
                    path: "/customer/account/login",
                    element: <Login />
                },
                {
                    path: "/customer/account/register",
                    element: <Register />
                },
            ]
        }
    ]
}])

export default router