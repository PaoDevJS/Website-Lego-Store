// react icons
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { RiLogoutCircleRLine } from "react-icons/ri"

// 
import { Link } from "react-router-dom"

const SideBar = () => {
  const MenuSideBar = [
    {id: 1, title: "Tổng quan", path: "/", icon: <TbLayoutDashboardFilled size={20} />},
    {id: 2, title: "Phân loại", path: "/category", icon: <TbLayoutDashboardFilled size={20} />},
    {id: 3, title: "Nhà cung cấp", path: "/", icon: <TbLayoutDashboardFilled size={20} />},
    {id: 4, title: "Sản phẩm", path: "/", icon: <TbLayoutDashboardFilled size={20} />},
    {id: 7, title: "Khách hàng", path: "/", icon: <TbLayoutDashboardFilled size={20} />}
  ]

  return (
    <div className="w-[25%] h-full shadow-lg rounded-md overflow-hidden py-4 px-7 bg-white"> 
      <ul className="border-b-2 border-orange-100 flex flex-col gap-3 pb-4">
        {
          MenuSideBar.map( item => {
            return(
              <Link to={item.path} key={item.id}>
                <li className="flex items-center gap-2 p-2 rounded text-red-500 hover:bg-red-400 hover:text-white transition-all duration-300 ease-in">
                  {item.icon}
                  <span className="font-[700]">{item.title}</span>
                </li>
              </Link>
            )
          })
        }
      </ul>
      <button className="w-full p-2 flex gap-2 my-4 rounded-md text-red-500 hover:bg-red-400 hover:text-white">
        <RiLogoutCircleRLine size={20} />
        <span className="font-[700]">Logout</span>
      </button>
    </div>
  )
}

export default SideBar