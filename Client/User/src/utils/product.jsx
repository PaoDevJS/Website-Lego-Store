import AllItemProduct from "../components/AllItemProduct"
import SideBarProduct from "../components/SideBarProduct"

const Products = () => {
  return (
    <div className="container m-auto 2xl:px-10 px-0 my-7">
      <div className="flex lg:flex-row flex-col gap-5 lg:gap-10 py-4 px-7 lg:justify-center">
        {/* Sidebar product */}
        <div className="lg:w-[30%] 2xl:w-[25%] h-full rounded-md overflow-hidden">
          <SideBarProduct />
        </div>
        {/* all items product */}
        <div className="lg:w-[70%] 2xl:w-[75%] h-full rounded-md overflow-hidden">
          <AllItemProduct />
        </div>            
      </div>
    </div>
  )
}

export default Products