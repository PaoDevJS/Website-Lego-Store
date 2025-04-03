import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/ThemeContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InterOTP = () => {
  const [second, setSecond] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const { email } = useContext(AppContext);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isRunning && second > 0) {
      timer = setInterval(() => {
        setSecond((prev) => prev - 1);
      }, 1000);
    } else if (second === 0) {
      setIsRunning(false);
      setSecond(60);
    }

    return () => clearInterval(timer);
  }, [isRunning, second]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!isRunning) {
      setIsRunning(true);
      try {
        const result = await axios.post(
          "http://localhost:8000/api/auth/forget-password",
          { email }
        );
        localStorage.setItem("tokenTimeOtp", result.data.tokenTimeOtp);
        toast.success(result.data.message);
      } catch (error) {
        console.log(error.response?.data || "Có lỗi xảy ra, vui lòng thử lại!");
      }
    }
  };

  const handleCheckOTP = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8080/api/auth/inter-password",
        { OTP },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tokenTimeOtp")}`,
          },
        }
      );
      localStorage.removeItem("tokenTimeOtp")
      navigate("/customer/account/rest-password");
      toast.success(result.data);
    } catch (error) {
      toast.error(error.response?.data || "Lỗi không xác định!");
      setOTP("");
    }
  };

  return (
    <div className="w-full max-h-[80vh] md:py-5 md:px-10 flex items-center justify-center">
      <div className="2xl:w-[35%] lg:w-[40%] sm:w-[60%] w-[90%] p-10">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-[700]">Nhập mã OTP</h1>
          <div>
            <p className="text-gray-500 mt-2">
              Mã OTP đã được gửi qua email của bạn:
            </p>
            <p>
              {email
                ? email.replace(/(.{3}).+(@.+)/, "$1***$2")
                : "Không có email"}
            </p>
          </div>
        </div>
        <form>
          <div className="border border-gray-300 rounded-md py-3 px-5 ">
            <input
              type="password"
              name="otp"
              className="w-full outline-none placeholder:font-[500]"
              placeholder="Nhập mã OTP ở đây..."
              id=""
              value={OTP}
              onChange={(vail) => setOTP(vail.target.value.trim())}
              required
            />
          </div>
          <div className="text-center mt-3">
            <span className="text-gray-500">Chưa nhận được mã?</span>
            <button
              onClick={handleSendOTP}
              disabled={isRunning}
              className="cursor-pointer hover:underline ml-2 text-red-600"
            >
              {isRunning ? "Chờ " + second + "s" : "Gửi OTP"}
            </button>
          </div>
          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              onClick={handleCheckOTP}
              className="bg-red-600 text-[16px] w-[50%] hover:scale-95 transition-all duration-150 ease-in-out py-2 rounded-lg cursor-pointer font-[600] text-white"
            >
              Gửi
            </button>
            <Link to={`/customer/account/forget-password`}>
              <span className="text-center mt-4 hover:underline">Quay lại</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterOTP;
