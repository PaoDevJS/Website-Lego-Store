import avatar from "../assets/images/avatar.jpg"
import { NavLink } from "react-router-dom"
const Header = () => {

  return (
    <div className="bg-white py-4 shadow-md">
        <div className="container m-auto">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div></div>

                {/*  */}
                <div className="flex items-center gap-3 group relative">
                    <img src={avatar} alt="Avatar" className="w-[40px] h-[40px] rounded-full object-cover"/>
                    <div>
                        <h1 className="font-[700]">Admin Panel</h1>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header