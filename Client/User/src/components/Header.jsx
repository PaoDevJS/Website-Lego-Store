import { Link } from "react-router-dom"

// React icons
import { FaUser, FaSearch, FaShopify } from "react-icons/fa"


const Header = () => {
  return (
    <header className="py-4 px-7 shadow-md">
      <div className="container m-auto">
        <div className="flex items-center justify-between border">
          {/* Logo */}
          <Link to="/">
            <h1 className="py-3 px-5 rounded-md bg-gradient-to-l to-gray-400 from-red-600 text-3xl uppercase font-bold text-white"> LegoWorld<span className="text-lg">Store</span> </h1>
          </Link>

          {/* navbar */}

          {/* Login/Register */}
          <div className="flex items-center gap-7">
            <button className="relative group">
              <FaSearch size={20}/>

              <div className="absolute w-[100px] py-1 rounded-md border">
                  <p className="">Tìm kiếm</p>
              </div>
            </button>
            <button>
              <Link>
                <FaShopify size={20}/>
              </Link>
            </button>
            <button>
              <Link>
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