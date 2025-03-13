import AllItemProduct from "../components/AllItemProduct"
import SideBarProduct from "../components/SideBarProduct"

const Products = () => {
  return (
    <div className="container m-auto 2xl:px-10 px-0">
      <div className="flex gap-7">
        {/* Sidebar product */}
        <div className="border lg:w-[30%] 2xl:w-[25%] h-full">
          <SideBarProduct />
        </div>
        {/* all items product */}
        <div className="border lg:w-[70%] 2xl:w-[75%] h-full">
          <AllItemProduct />
        </div>            
      </div>
    </div>
  )
}

export default Products