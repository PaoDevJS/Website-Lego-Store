import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Category from "../pages/Categories/Category"
import CreateCategory from "../pages/Categories/CreateCategory"
import EditCategory from "../pages/Categories/EditCategory"

const isRouter = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/category",
            element: <Category />,
            children: [
                {
                    path: "/category/create",
                    element: <CreateCategory />
                },
                {
                    path: "/category/edit/:id",
                    element: <EditCategory />
                }
            ]
        },
    ]
}])

export default isRouter