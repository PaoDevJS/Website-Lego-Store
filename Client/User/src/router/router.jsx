import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LayoutLoginAndRegister from '../Layouts/LayoutLoginAndRegister'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import ForgetPassword from '../pages/forget-password/ForgetPassword'
import RestPassword from '../pages/forget-password/RestPassword'
import InterOTP from '../pages/forget-password/interOTP'
import Product from "../utils/product"
import LayoutProduct from '../Layouts/LayoutProduct'
import ProductDetail from '../utils/productDetail'
import Contact from '../pages/Contact'
import AboutUs from '../pages/AboutUs'

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />
        },
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
                {
                    path: "/customer/account/forget-password",
                    element: <ForgetPassword />
                },
                {
                    path: "/customer/account/inter-password",
                    element: <InterOTP />
                },
                {
                    path: "/customer/account/rest-password",
                    element: <RestPassword />
                },
            ]
        },
        {
            path: "/cart",
            element: <Cart />
        },
        {
            path: "/product",
            element: <LayoutProduct />,
            children: [
                {
                    path: "/product/list-products",
                    element: <Product />
                },
                {
                    path: "/product/product-detail/:id",
                    element: <ProductDetail />
                }
            ]

        }, {
            path: "/contact",
            element: <Contact />
        }, {
            path: "/about-us",
            element: <AboutUs />
        },
    ]
}])

export default router