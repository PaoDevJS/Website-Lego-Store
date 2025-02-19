import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

const LayOut = () => {
  return (
    <div className="w-full h-[100vh]">
        <Header />
        <div className="w-full h-[88%]">
            <div className="container m-auto h-full">
                <div className="flex gap-5 h-full py-2">
                    <SideBar />
                    <Outlet />
                </div>
            </div>
        </div>       
    </div>
  )
}

export default LayOut