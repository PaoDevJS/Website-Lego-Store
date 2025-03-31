import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { errorUser } from "../redux/reducer/userSlicer";
import { toast } from "react-toastify";

const TopBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchApiLogOut = "http://localhost:8000/api/auth/sign-out"

  const handleSubmitLogOut = async () => {
    try {
      const decoded = await axios.post(fetchApiLogOut)
      navigate("/login")
      dispatch(errorUser())
      toast.success(decoded.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return (
    <div className="fixed bg-white left-[22%] right-0 py-4 px-10 top-0 z-40 shadow-md shadow-gray-300">
        <div className="flex w-full items-center justify-between">
          <div className="bg-gradient-to-l to-gray-400 from-red-500 rounded-md py-3 px-7 cursor-pointer">
            <h1 className="text-[20px] text-white text-center uppercase font-[700]">LegoWorld<span className="text-[14px]">Store</span> </h1>
          </div>
          <button onClick={handleSubmitLogOut} className="bg-red-600 py-2 px-7 rounded-md text-16 uppercase text-white font-[700] cursor-pointer hover:opacity-85">Đăng xuất</button>
        </div>
    </div>
  )
}

export default TopBar