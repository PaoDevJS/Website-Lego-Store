import { Outlet, useLocation, Link } from "react-router-dom"
import { AppContext } from "../Context/ThemeContext"
import { useContext } from "react"

const LayoutUser = () => {
    const path = useLocation().pathname.split("/")[2]
    const { currentUser } = useContext(AppContext)
    const user = currentUser.user

    const listSidebarUser = [
        { path: "/user/profile", title: "Hồ sơ" },
        { path: "/user/address", title: "Địa chỉ" },
        { path: "/user/verify/check-password", title: "Đổi mật khẩu" },
        { path: "/user/order", title: "Đơn Mua" },
    ]

  return (
    <div className="container m-auto flex py-5 px-10 gap-10">
        <div className="w-[25%] p-5 bg-white rounded-md">
            <div className="flex items-center gap-7 border-b border-gray-300 pb-5">
                <img src={user?.userDetailId?.image} alt="" className="w-[60px] h-[60px] rounded-full"/>
                <div>
                    <h1 className="text-[18px] font-[600]">{user?.username}</h1>
                    <p className="text-gray-500">{user?.email.replace(/(.{3}).+(@.+)/, "$1***$2")}</p>
                </div>
            </div>

            <div className="mt-7">
                <ul className="flex flex-col gap-3">
                    {
                        listSidebarUser?.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <li className={`text-[18px] text-gray-600 font-[500] py-2 px-4 rounded-md hover:text-white hover:bg-red-500 transition-all duration-150 ease-in-out ${path === item.path.split("/")[2] ? "bg-red-500 text-white" : ""}`}> {item.title} </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
        <div className="w-[75%] rounded-md">
            <Outlet />  
        </div>
    </div>
  )
}

export default LayoutUser