import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

// react icons
import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";

const CheckPassword = () => {
  const [eye, setEye] = useState(false);
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(AppContext)
  const navigate = useNavigate()

  const handleBtnCheckPassword = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/api/user/check-password", { id: currentUser?.user._id, password});
      navigate("/user/verify/change-password")
      toast.success(result.data?.message)
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="bg-white  rounded-md p-10">
      <div className="2xl:w-[50%] w-[70%] m-auto">
        <h1 className="text-2xl font-[600] text-center mb-12">
          Nhập mật khẩu LEGOWORLD
        </h1>
        <form>
          <div className="flex items-center gap-4 border border-gray-300 rounded-md py-3 px-4">
            <input
              type={`${eye ? "text" : "password"}`}
              value={password}
              onChange={(vail) => setPassword(vail.target.value.trim())}
              placeholder="Nhập mật khẩu hiện tại để xác minh"
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
          <button
            onClick={handleBtnCheckPassword}
            className="bg-red-500 text-white  py-3 w-[50%] rounded-md mt-7 m-auto block cursor-pointer"
          >
            Xác minh
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckPassword;
