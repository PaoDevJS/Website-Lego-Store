import { Link } from "react-router-dom"

// React icons
import { FaUser, FaSearch, FaShopify } from "react-icons/fa"


const Header = () => {
  return (
    <header className="py-4 px-7 shadow-md">
      <div className="container m-auto">
        <div className="flex items-center justify-between">
          {/* Search */}
          <form className="2xl:w-[20%] lg:w-[30%] hidden lg:block">
            <div className="border-b border-gray-500 gap-4 flex items-center p-3">
              <FaSearch size={20} className="text-gray-500"/>
              <input type="text" placeholder="Bạn đang cần tìm sản phẩm gì?" className="w-full outline-none placeholder:text-[16px] placeholder:text-gray-600 placeholder:font-[500]"/>
            </div>
          </form>

          {/* Logo */}
          <Link to="/">
            <h1 className="py-3 px-5 rounded-md bg-gradient-to-l to-gray-400 from-red-600 text-3xl uppercase font-bold text-white"> LegoWorld<span className="text-lg">Store</span> </h1>
          </Link>

          {/* Login/Register */}
          <div className="2xl:w-[20%] lg:w-[30%] justify-end flex items-center gap-7">
            <button> 
              <Link to={"/cart"}>
                <FaShopify size={25}/>
              </Link>
            </button>
            <button>
              <Link to="/customer/account/login">
                <FaUser size={20}/>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header