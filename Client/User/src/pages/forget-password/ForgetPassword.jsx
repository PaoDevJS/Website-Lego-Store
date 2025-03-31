import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/ThemeContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { email, setEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/auth/forget-password", { email });
        console.log(result)
        toast.success(result.data.message);
        localStorage.setItem("tokenTimeOtp", result.data.tokenTimeOtp)
        navigate("/customer/account/inter-password");
    } catch (error) {
      toast.error(error.response?.data || "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="w-full max-h-[80vh] md:py-5 md:px-10 flex items-center justify-center">
      <div className="2xl:w-[35%] lg:w-[40%] sm:w-[60%] w-[90%] p-10">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-[700]">Đặt lại mật khẩu</h1>
          <p className="text-gray-500 mt-2">
            Chúng tôi sẽ gửi mã OTP qua email cho bạn để đặt lại mật khẩu
          </p>
        </div>
        <form>
          <div className="border border-gray-300 rounded-md py-3 px-5 ">
            <input
              type="email"
              name="email"
              className="w-full outline-none placeholder:font-[500]"
              placeholder="Nhập email ở đây..."
              id=""
              value={email}
              onChange={(vail) => setEmail(vail.target.value)}
              required
            />
          </div>
          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              onClick={handleChangeEmail}
              className="bg-red-600 text-[16px] w-[50%] hover:scale-95 transition-all duration-150 ease-in-out py-2 rounded-lg cursor-pointer font-[600] text-white"
            >
              Gửi
            </button>
            <Link to={`/customer/account/login`}>
              <span className="text-center mt-4 hover:underline">Quay lại</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
