import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/ThemeContext";

// React icons
import { TiArrowLeftThick } from "react-icons/ti";
import { FaRegUserCircle, FaPlus } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa"

const Navbar = () => {
  const { openMenu, setOpenMenu, currentUser } = useContext(AppContext);
  const path = useLocation().pathname.split("/")[1]

  return (
    <>
      {/* Mobile */}
      <div
        className={`${
          openMenu
            ? "top-0 left-0 w-[50%] h-full"
            : "top-0 left-[-60%] w-[50%] h-full"
        } lg:hidden fixed bg-white py-4 px-7 z-50 transition-all duration-300 ease-linear shadow-lg shadow-black rounded-md`}
      >
        {/* come black */}
        <button
          onClick={() => setOpenMenu(false)}
          className="flex items-center gap-1 cursor-pointer my-5"
        >
          <TiArrowLeftThick />
          <span>Quay lại</span>
        </button>

        <div>
          {/* Login & register */}
          <div className={`items-center my-7 gap-5 ${currentUser.isUser === false ? "flex" : "hidden"}`}>
            <button className="bg-black text-white w-[50%] p-3 rounded-md font-[500]">
              <Link
                to={`/customer/account/login`}
                className="flex justify-center items-center gap-2"
              >
                <FaRegUserCircle size={20} />
                Đăng nhập
              </Link>
            </button>
            <button className="bg-red-700 text-white w-[50%] p-3 rounded-md font-[500]">
              <Link
                to={`/customer/account/register`}
                className="flex justify-center items-center gap-2"
              >
                <FaPlus size={18} />
                Tạo tài khoản
              </Link>
            </button>
          </div>

          {/* list categories */}
          <ul className="px-2 pb-5 flex flex-col gap-2">
            <Link to={"/"}>
              <li className={`text-[18px] font-[600] hover:bg-[#e7e7e9] hover:text-red-600 py-2 px-4 rounded-md ${path === ""? "text-red-600" : "text-black"}`}>Trang chủ</li>
            </Link>
            <Link to={"/product/list-products"}>
              <li className={`text-[18px] font-[600] hover:bg-[#e7e7e9] hover:text-red-600 py-2 px-4 rounded-md flex items-center justify-between ${path === "product"? "text-red-600" : "text-black"}`}>
                Sản phẩm
                <FaAngleRight size={20}/>
              </li>
            </Link>
            <Link to={"/about-us"}>
              <li className={`text-[18px] font-[600] hover:bg-[#e7e7e9] hover:text-red-600 py-2 px-4 rounded-md ${path === "about-us"? "text-red-600" : "text-black"}`}>Giới thiệu</li>
            </Link>
            <Link to={"/contact"}>
              <li className={`text-[18px] font-[600] hover:bg-[#e7e7e9] hover:text-red-600 py-2 px-4 rounded-md ${path === "contact"? "text-red-600" : "text-black"}`}>Liên hệ</li>
            </Link>
            <Link to={"/"}>
              <li className={`${currentUser.isUser === false ? "hidden" : "block"} text-[18px] font-[600] hover:bg-[#e7e7e9] hover:text-red-600 py-2 px-4 rounded-md`}>Tài khoản của tôi</li>
            </Link>
          </ul>
        </div>

        {/* Sign Out */}
        <div className={`border-t border-gray-300 py-5 ${currentUser.isUser === false ? "hidden" : "block"}`}>
          <button className="bg-red-700 text-white w-[60%] p-3 rounded-md font-[500] m-auto block cursor-pointer">
            Đăng xuất
          </button>
        </div>
      </div>
      {/* PC */}
      <div className="hidden lg:block">
        <div>
          <ul className="flex items-center justify-center mt-7 gap-7">
            <li className={`uppercase font-[700] hover:text-red-600 transition-all duration-200 ease-in ${path === ""? "text-red-600" : "text-gray-500"}`}>
              <Link to={`/`}>
                Trang chủ
              </Link>
            </li>
            <li className={`uppercase font-[700] hover:text-red-600 transition-all duration-200 ease-in ${path === "product"? "text-red-600" : "text-gray-500"}`}>
              <Link to={`/product/list-products`}>
                Sản phẩm
              </Link>
            </li>
            <li className={`uppercase font-[700] hover:text-red-600 transition-all duration-200 ease-in ${path === "about-us"? "text-red-600" : "text-gray-500"}`}>
              <Link to={`/about-us`}>
                Giới thiệu
              </Link>
            </li>
            <li className={`uppercase font-[700] hover:text-red-600 transition-all duration-200 ease-in ${path === "contact"? "text-red-600" : "text-gray-500"}`}>
              <Link to={`/contact`}>
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
