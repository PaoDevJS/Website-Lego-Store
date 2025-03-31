import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { useContext } from "react"
import { AppContext } from "../Context/ThemeContext"

// React icons
import { FaUser, FaSearch, FaShopify } from "react-icons/fa"
import { CgMenuRound } from "react-icons/cg"
import Search from "./Search"
// import Hero from "./Hero"

const Header = () => {
  const { setOpenMenu, setSearch, currentUser } = useContext(AppContext)

  return (
    <header className="py-4 px-7 lg:px-10 shadow-md bg-white">
      <div className="container m-auto">
        <div className="flex items-center justify-between">
          <div className="2xl:w-[20%] lg:w-[35%]">
            {/* Menu */}
            <button onClick={() => setOpenMenu(true)}>
              <CgMenuRound size={35} className="block lg:hidden cursor-pointer text-gray-700"/>
            </button>

            {/* Search */}
            <form className="hidden lg:block">
              <div className="gap-4 flex items-center h-full p-2 border-b border-gray-500">
                <FaSearch size={20} className="text-gray-500"/>
                <input type="text" placeholder="Bạn đang cần tìm sản phẩm gì?" className="w-full outline-none placeholder:text-[16px] placeholder:text-gray-600 placeholder:font-[500]"/>
              </div>
            </form>
          </div>

          {/* Logo  */}
          <Link to="/">
            <h1 className="py-3 px-5 rounded-md bg-gradient-to-l to-gray-400 from-red-600 text-3xl uppercase font-bold text-white"> LegoWorld<span className="text-lg">Store</span> </h1>
          </Link>

          {/* Login/Register */}
          <div className="2xl:w-[20%] lg:w-[30%] justify-end flex items-center gap-7">
            <button className="relative group"> 
              <Link to={"/cart"}>
                <FaShopify size={25}/>
              </Link>
              <p className="absolute group-hover:block hidden min-w-[100px] rounded bg-white py-2 left-[50%] top-[35px] translate-x-[-50%] border">Giỏ hàng</p>
            </button>
            {
              currentUser.isUser === false ? (
                <button className="lg:block hidden relative group">
                  <Link to="/customer/account/login">
                    <FaUser size={23}/>
                  </Link>
                  <p className="absolute group-hover:block hidden min-w-[100px] rounded bg-white py-2 left-[30%] top-[35px] translate-x-[-50%] border">Đăng nhập</p>
                </button>
              ) : (
                <div className="lg:block hidden">
                  <img src={currentUser.user.userDetailId.image} alt="avatar" className="w-[30px] h-[30px] rounded-full cursor-pointer"/>
                </div>
              )
            }

            <div className="lg:hidden block">
              <button onClick={() => setSearch(true)} className="cursor-pointer relative group">
                <FaSearch size={23}/>
                <p className="absolute group-hover:block hidden min-w-[100px] rounded bg-white py-2 left-[50%] top-[35px] translate-x-[-50%] border">Tìm kiếm</p>
              </button>
              <Search />
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </header>
  )
}

export default Header