import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../Context/ThemeContext";

const RestPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { email, setEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChangeFormData = async (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleRestPassword = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu có khớp không
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      setFormData({
        password: formData.password,
        confirmPassword: "",
      });
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:8080/api/auth/rest-password",
        {
          newPassword: formData.password,
          email,
        }
      );
      toast.success(result.data);
      setFormData({
        password: "",
        confirmPassword: "",
      });
      setEmail("")
      navigate("/customer/account/login");
    } catch (error) {
      toast.error(error.response?.data || "Lỗi khi đặt lại mật khẩu!");
    }
  };

  return (
    <div className="w-full max-h-[80vh] md:py-5 md:px-10 flex items-center justify-center">
      <div className="2xl:w-[35%] lg:w-[40%] sm:w-[60%] w-[90%] p-10">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-[700]">Tạo mật khẩu mới</h1>
          <div>
            <p className="text-gray-500 mt-2">Xác thực thành công.</p>
            <p className="text-gray-500">
              Tạo ngay mật khẩu mới cho tài khoản của bạn để hoàn tất.
            </p>
          </div>
        </div>
        <form>
          <div className="border border-gray-300 rounded-md py-3 px-5 ">
            <input
              type="password"
              name="password"
              className="w-full outline-none placeholder:font-[500]"
              placeholder="Nhập mật khẩu mới ở đây..."
              id=""
              value={formData.password}
              onChange={handleChangeFormData}
              required
            />
          </div>
          <div className="border border-gray-300 rounded-md py-3 px-5 mt-5">
            <input
              type="password"
              name="confirmPassword"
              className="w-full outline-none placeholder:font-[500]"
              placeholder="Nhập xác nhận mật khẩu mới ở đây..."
              id=""
              value={formData.confirmPassword}
              onChange={handleChangeFormData}
              required
            />
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              onClick={handleRestPassword}
              className="bg-red-600 text-[16px] w-[50%] hover:scale-95 transition-all duration-150 ease-in-out py-2 rounded-lg cursor-pointer font-[600] text-white"
            >
              Tạo mật khẩu mới
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

export default RestPassword;
