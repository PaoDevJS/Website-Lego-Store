import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import TopBar from "../components/TopBar"


const LayOut = () => {
  return (
    <div className="w-full h-[100vh] flex">
        <div className="w-[22%] h-full">
            <SideBar />
        </div>
        <div className="w-[78%] h-full">
            <div className="w-full h-[10%]">
                {/* TopBar */}
                <TopBar />
            </div>
            <div className="w-full  h-[85%]">
                {/* OutLet */}
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default LayOut