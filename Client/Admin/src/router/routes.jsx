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

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
                    }
                ]
            },,
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
                    }
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