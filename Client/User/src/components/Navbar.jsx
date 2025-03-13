import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AppContext } from "../Context/ThemeContext"

// React icons
import { TiArrowLeftThick } from "react-icons/ti"
import { FaRegUserCircle, FaPlus } from "react-icons/fa"

const Navbar = () => {
  const {openMenu, setOpenMenu} = useContext(AppContext)
  
  useEffect(() => {
    
  }, [])
  
  return (
    <>
      {/* Mobile */}
      <div className={`${openMenu? "top-0 left-0 w-[60%] h-full" : "top-0 left-[-60%] w-[60%] h-full"} lg:hidden fixed bg-white py-4 px-7 z-50 transition-all duration-300 ease-linear shadow-lg shadow-black rounded-md`}>
        {/* come black */}  
        <button onClick={() => setOpenMenu(false)} className="flex items-center gap-1 cursor-pointer my-5">
          <TiArrowLeftThick  />
          <span>Quay lại</span>
        </button>

        {/* Login & register */}
        <div className="flex items-center gap-5">
          <button className="bg-black text-white w-[50%] p-3 rounded-md font-[500]">
            <Link to={`/customer/account/login`} className="flex justify-center items-center gap-2">
              <FaRegUserCircle size={20}/>
              Đăng nhập
            </Link>
          </button>
          <button className="bg-red-700 text-white w-[50%] p-3 rounded-md font-[500]">
            <Link to={`/customer/account/register`} className="flex justify-center items-center gap-2">
              <FaPlus size={18} />
              Tạo tài khoản
            </Link>
          </button>
        </div>
      </div>
      {/* PC */}
      <div className="hidden lg:block">

      </div>
    </>
  )
}

export default Navbar