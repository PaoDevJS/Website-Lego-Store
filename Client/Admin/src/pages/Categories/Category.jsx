import CategoriesDetal from "./CategoriesDetal"
import { useLocation, Outlet } from "react-router-dom"


const Category = () => {
    const category = "/category"
    const location = useLocation().pathname
  return (
    <>
        {
          category === location ? <CategoriesDetal /> : <Outlet />
        }
    </>
  )
}

export default Category