import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

// react icons
import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";

const ChangePassword = () => {
  const [eye, setEye] = useState(false);
  const [confirmEye, setConfirmEye] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser } = useContext(AppContext)
  const navigate = useNavigate()

  const isSetUpPassword = async () => {
    try {
      const result = await axios.post("http://localhost:8080/api/user/set-up-password", { id: currentUser?.user._id, password })
      setPassword("")
      setConfirmPassword("")
      navigate("/")
      toast.success(result.data.message)
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }

  const handleBtnChangePassword = (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp. Vui lòng nhật lại!")
      setConfirmPassword("")
      return
    }

    isSetUpPassword()
  }

  return (
    <div className="bg-white py-5 px-10 rounded-md">
      <div className="pb-3 px-3 border-b border-gray-300">
        <h1 className="text-[25px] font-[600] ">Đổi mật khẩu</h1>
        <p className="text-[16px] text-gray-600">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <div className="my-10 2xl:w-[50%] w-[70%] m-auto">
        <form>
          <div className="flex items-center gap-4 border border-gray-300 rounded-md py-3 px-4">
            <input
              type={`${eye ? "text" : "password"}`}
              value={password}
              onChange={(vail) => setPassword(vail.target.value.trim())}
              placeholder="Mật khẩu mới"
              className="w-full outline-none text-[16px] placeholder:font-[600]"
            />
            {eye ? (
              <HiMiniEye
                onClick={() => setEye(false)}
                size={20}
                className="cursor-pointer text-gray-400 hover:text-black transition-all duration-150 ease-linear"
              />
            ) : (
              <HiEyeSlash
                onClick={() => setEye(true)}
                size={20}
                className="cursor-pointer text-gray-400 hover:text-black transition-all duration-150 ease-linear"
              />
            )}
          </div>
          <div className="flex items-center gap-4 border border-gray-300 rounded-md py-3 px-4 mt-5">
            <input
              type={`${confirmEye ? "text" : "password"}`}
              value={confirmPassword}
              onChange={(vail) => setConfirmPassword(vail.target.value.trim())}
              placeholder="Xác nhận lại mật khẩu"
              className="w-full outline-none text-[16px] placeholder:font-[600]"
            />
            {confirmEye ? (
              <HiMiniEye
                onClick={() => setConfirmEye(false)}
                size={20}
                className="cursor-pointer text-gray-400 hover:text-black transition-all duration-150 ease-linear"
              />
            ) : (
              <HiEyeSlash
                onClick={() => setConfirmEye(true)}
                size={20}
                className="cursor-pointer text-gray-400 hover:text-black transition-all duration-150 ease-linear"
              />
            )}
          </div>
          <button
            onClick={handleBtnChangePassword}
            className="bg-red-500 text-white  py-3 w-[50%] rounded-md mt-7 m-auto block cursor-pointer text-[18px] font-[600] hover:opacity-90 transition-all duration-300 ease-linear"
          >
            Xác minh
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
