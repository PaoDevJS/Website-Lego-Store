import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LayoutLoginAndRegister from "../Layouts/LayoutLoginAndRegister";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import ForgetPassword from "../pages/forget-password/ForgetPassword";
import RestPassword from "../pages/forget-password/RestPassword";
import InterOTP from "../pages/forget-password/interOTP";
import Product from "../utils/product";
import LayoutProduct from "../Layouts/LayoutProduct";
import ProductDetail from "../utils/productDetail";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import AccountOfMe from "../pages/isProfile";
import LayoutUser from "../Layouts/LayoutUser";
import IsAddress from "../pages/isAddress";
import CheckPassword from "../pages/Change-Password/CheckPassword";
import LayoutChangePassword from "../Layouts/LayoutChangePassword";
import ChangePassword from "../pages/Change-Password/ChangePassword";
import LayoutOrder from "../Layouts/LayoutOrder";
import CheckOutPayment from "../components/checkoutPayment";
import PaymentSuccess from "../pages/PaymentSuccess";
import ListOrder from "../components/ListOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/customer",
        element: <LayoutLoginAndRegister />,
        children: [
          {
            path: "/customer/account/login",
            element: <Login />,
          },
          {
            path: "/customer/account/register",
            element: <Register />,
          },
          {
            path: "/customer/account/forget-password",
            element: <ForgetPassword />,
          },
          {
            path: "/customer/account/inter-password",
            element: <InterOTP />,
          },
          {
            path: "/customer/account/rest-password",
            element: <RestPassword />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order-checkout",
        element: <CheckOutPayment />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/product",
        element: <LayoutProduct />,
        children: [
          {
            path: "/product/list-products",
            element: <Product />,
          },
          {
            path: "/product/product-detail/:id",
            element: <ProductDetail />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/user",
        element: <LayoutUser />,
        children: [
            {
                path: "/user/profile",
                element: <AccountOfMe />
            },
            {
                path: "/user/address",
                element: <IsAddress />
            },
            {
                path: "/user/verify",
                element: <LayoutChangePassword />,
                children: [
                  {
                    path: "/user/verify/check-password",
                    element: <CheckPassword />
                  },
                  {
                    path: "/user/verify/change-password",
                    element: <ChangePassword />
                  }
                ]
            },
            {
              path: "/user/order",
              element: <ListOrder />
            }
        ]
      },
    ],
  },
]);

export default router;
