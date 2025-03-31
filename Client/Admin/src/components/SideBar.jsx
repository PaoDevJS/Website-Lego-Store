import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// React Icons
import { FaChartPie, FaListOl, FaShippingFast } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { BsBox2HeartFill } from "react-icons/bs";
import { AiOutlineCopyright } from "react-icons/ai";

const SideBar = () => {
  const isListSideBar = [
    { title: "Tổng quan", icons: <FaChartPie size={23} />, path: "/" },
    {
      title: "Quản lý danh mục",
      icons: <FaListOl size={23} />,
      path: "/danh-muc/danh-sach-danh-muc",
    },
    {
      title: "Quản lý thương hiệu",
      icons: <AiOutlineCopyright size={27} />,
      path: "/thuong-hieu/danh-sach-thuong-hieu",
    },
    {
      title: "Quản lý sản phẩm",
      icons: <BsBox2HeartFill size={23} />,
      path: "/san-pham/danh-sach-san-pham",
    },
    {
      title: "Quản lý đơn hàng",
      icons: <FaShippingFast size={23} />,
      path: "/don-hang/danh-sach-don-hang",
    },
    {
      title: "Quản lý khách hàng",
      icons: <FaUsers size={23} />,
      path: "/khach-hang/danh-sach-khach-hang",
    }
  ];
  const user = useSelector(state => state.User.user)
  const location = useLocation().pathname;
  const path = location.split("/")[1];

  return (
    <div className="fixed z-50 bg-white w-[22%] left-0 top-0 bottom-0 py-5 px-10 shadow-lg shadow-gray-300">
      <div className="flex flex-col gap-10">
        {/* information account*/}
          <div className="Flex gap-5 py-5 border-b-2 border-gray-300">
            <img src="https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" alt="avatar" className="w-[50px] h-[50px] rounded-full object-cover"/>
            <div>
              <h2 className="font-[600] text-16">{user.firstName + " " + user.lastName}</h2>
              <p className="text-gray-600">{user.role}</p>
            </div>
          </div>

        {/* List SideBar */}
        <div>
          <ul className="flex flex-col gap-5">
            {isListSideBar.map((item, index) => {
              return (
                <Link to={item.path} 
                key={index}>
                  <li
                    className={`Flex gap-3 py-3 px-7 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out ${
                      path === item.path.split("/")[1] ? "bg-red-600 text-white" : "text-black bg-white"
                    }`}
                  >
                    {item.icons}
                    <h3 className="text-16 font-[600]">{item.title}</h3>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
