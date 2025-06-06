import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import LayoutCategory from "../Layout/LayoutCategory"
import LayoutBrand from "../Layout/LayoutBrand"
import ListCategories from "../pages/Category/listCategories"
import AddCategory from "../pages/Category/addCategory"
import ListBrands from "../pages/Brand/listBrands"
import AddBrand from "../pages/Brand/addBrand"
import Login from "../pages/Login"
import LayoutProduct from "../Layout/LayoutProduct"
import ListProduct from "../pages/product/listProducts"
import CreateProduct from "../pages/product/createProduct"
import UpdateCategory from "../pages/Category/updateCategory"
import UpdateBrand from "../pages/Brand/updateBrand"
import UpdateProduct from "../pages/product/updateProduct"
import LayoutCustomer from "../layout/LayoutCustomer"
import ListCustomer from "../pages/Customer/isListCustomer"
import ProductDetail from "../pages/product/productDetail"
import Dashboard from "../pages/Dashboard"
import IsAddCustomer from "../pages/Customer/addCustomer"
import InfoDetailOfCustomer from "../pages/Customer/infoDetailOfCustomer"
import UpdateCustomer from "../pages/Customer/updateCustomer"
import LayoutOrder from "../layout/LayoutOrder"
import { elements } from "chart.js"
import ListOrders from "../pages/order/listOrders"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/danh-muc",
                element: <LayoutCategory />,
                children: [
                    {
                        path: "/danh-muc/danh-sach-danh-muc",
                        element: <ListCategories />
                    },
                    {
                        path: "/danh-muc/them-danh-muc-moi",
                        element: <AddCategory />
                    },
                    {
                        path: "/danh-muc/cap-nhat-danh-muc/:id",
                        element: <UpdateCategory />
                    }
                ]
            },
            {
                path: "/thuong-hieu",
                element: <LayoutBrand />,
                children: [
                    {
                        path: "/thuong-hieu/danh-sach-thuong-hieu",
                        element: <ListBrands />
                    },
                    {
                        path: "/thuong-hieu/them-thuong-hieu-moi",
                        element: <AddBrand />
                    },
                    {
                        path: "/thuong-hieu/cap-nhat-thuong-hieu/:id",
                        element: <UpdateBrand />
                    }
                ]
            },    
            {
                path: "/san-pham",
                element: <LayoutProduct />,
                children: [
                    {
                        path: "/san-pham/danh-sach-san-pham",
                        element: <ListProduct />
                    },
                    {
                        path: "/san-pham/them-san-pham-moi",
                        element: <CreateProduct />
                    },
                    {
                        path: "/san-pham/cap-nhat-san-pham/:id",
                        element: <UpdateProduct />
                    },
                    {
                        path: "/san-pham/chi-tiet-san-pham/:id",
                        element: <ProductDetail />
                    },
                ]
            },
            {
                path: "/khach-hang",
                element: <LayoutCustomer />,
                children: [
                    {
                        path: "/khach-hang/danh-sach-khach-hang",
                        element: <ListCustomer />
                    },
                    {
                        path: "/khach-hang/them-khach-hang",
                        element: <IsAddCustomer />
                    },
                    {
                        path: "/khach-hang/thong-tin-chi-tiet-khach-hang/:id",
                        element: <InfoDetailOfCustomer />
                    },
                    {
                        path: "/khach-hang/cap-nhat-thong-tin-khach-hang/:id",
                        element: <UpdateCustomer />
                    },
                ]

            },
            {
                path: "/don-hang", 
                element: <LayoutOrder />,
                children: [
                    {
                        path: "/don-hang/danh-sach-don-hang",
                        element: <ListOrders />
                    },
                    {
                        path: "/don-hang/don-hang-cho-xu-ly",
                        element: <ListOrders />
                    },
                    {
                        path: "/don-hang/don-hang-van-chuyen",
                        element: <ListOrders />
                    },
                    {
                        path: "/don-hang/don-hang-hoan-thanh",
                        element: <ListOrders />
                    },
                    {
                        path: "/don-hang/don-hang-da-huy",
                        element: <ListOrders />
                    },
                ]
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])

export default routes