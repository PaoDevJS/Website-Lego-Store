import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//  React icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [eye, setEye] = useState(false);
  const [eyeConfirm, setEyeConfirm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthday: "",
    sex: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const fetchApiRegisterUser = "http://localhost:8080/api/auth/user/sign-up";

  const handleChangeFormData = (vail) => {
    setFormData((prev) => ({ ...prev, [vail.target.name]: vail.target.value }));
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const decoded = await axios.post(fetchApiRegisterUser, formData);
      console.log(decoded.data);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        birthday: "",
        sex: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      toast.success(decoded.data);
    } catch (error) {
      const err = error.response?.data
      if(err === "Tên tài khoản đã tồn tại.") {
        setFormData({
          username: "",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthday: formData.birthday,
          sex: formData.sex,
          password: formData.password
        })
      } else if(err === "Email không hợp lệ." || err === "Email đã tồn tại.") {
        setFormData({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: "",
          phone: formData.phone,
          birthday: formData.birthday,
          sex: formData.sex,
          password: formData.password
        })
      }
      toast.error(error.response?.data);
    }
  };
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center py-10">
      <div className="2xl:w-[30%] md:w-[50%] w-[70%] py-5 px-10 rounded-md bg-white">
        <form className="flex flex-col gap-5">
          <div className="my-5">
            <h1 className="text-3xl font-bold ">Đăng ký tài khoản</h1>
            <p className="text-[16px] leading-10 text-gray-600">
              Hãy nhập thông tin để đăng ký tài khoản
            </p>
          </div>

          {/* enter username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-[600] text-gray-500">Tên tài khoản:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChangeFormData} placeholder="Nhập tên tài khoản..." className="py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>

          {/* Enter FirstName & LastName */}
          <div className="flex items-center justify-between">
            <div className="w-[45%] ">
              <h3 htmlFor="username" className="font-[600] text-gray-500 mb-2">Họ đệm:</h3>
              <div
                className={`w-full py-3 px-4 rounded-md border relative border-gray-300`}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nhập Họ"
                  value={formData.firstName}
                  onChange={handleChangeFormData}
                  className="outline-none w-full placeholder:font-[500]"
                  required
                />
              </div>
            </div>
            <div className="w-[45%]">
              <h3 className="font-[600] text-gray-500 mb-2">Tên:</h3>  
              <div
                className={`w-full py-3 px-4 rounded-md relative border border-gray-300`}
              >
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nhập tên"
                  value={formData.lastName}
                  onChange={handleChangeFormData}
                  className="outline-none w-full placeholder:font-[500]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Enter email */}
          <div>
            <h3 className="font-[600] text-gray-500 mb-2">Email:</h3> 
            <div
              className={`py-3 px-4 rounded-md relative border border-gray-300`}
            >
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChangeFormData}
                className="outline-none w-full placeholder:font-[500]"
                required
              />
            </div>
          </div>

          {/* Enter phone number */}
          <div>
            <h3 className="font-[600] text-gray-500 mb-2">Số điện thoại:</h3> 
            <div
              className={`py-3 px-4 rounded-md relative border border-gray-300`}
            >
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChangeFormData}
                className="outline-none w-full placeholder:font-[500]"
                required
              />
            </div>
          </div>
          {/* birthday */}
          
          <div className="flex flex-col gap-2">
                <label htmlFor="birthday" className="font-[600] text-gray-500">Ngày sinh:</label>
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChangeFormData} placeholder="Nhập số điện thoại..." className="w-full py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
          {/* enter sex */}
          <div>
            <h3 className="font-[600] text-gray-500 mb-2">Giới tính:</h3>
            <div className="flex items-center justify-around w-[60%]">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sex"
                  id="nam"
                  value={"Name"}
                  onChange={handleChangeFormData}
                />
                <label
                  htmlFor="nam"
                  className="text-[16px] cursor-pointer text-gray-600"
                >
                  Name
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sex"
                  id="nu"
                  value={"Nữ"}
                  onChange={handleChangeFormData}
                />
                <label
                  htmlFor="nu"
                  className="text-[16px] cursor-pointer text-gray-600"
                >
                  Nữ
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sex"
                  id="khac"
                  value={"Khác"}
                  onChange={handleChangeFormData}
                />
                <label
                  htmlFor="khac"
                  className="text-[16px] cursor-pointer text-gray-600"
                >
                  Khác
                </label>
              </div>
            </div>
          </div>

          {/* Enter password */}
          <div>
            <h3 className="font-[600] text-gray-500 mb-2">Mật khẩu:</h3>
            <div
              className={`py-3 px-4 rounded-md relative flex items-center gap-4 border border-gray-300`}
            >
              <input
                type={`${eye ? "text" : "password"}`}
                placeholder="Nhập mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChangeFormData}
                className="outline-none w-full placeholder:font-[500]"
                required
              />
              {eye ? (
                <FaRegEye
                  size={20}
                  onClick={() => setEye(false)}
                  className="cursor-pointer text-gray-400 hover:text-dark"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setEye(true)}
                  size={20}
                  className="cursor-pointer text-gray-400 hover:text-dark"
                />
              )}
            </div>
          </div>

          {/* Enter confirm password */}
          <div>
            <h3 className="font-[600] text-gray-500 mb-2">Xác nhận mật khẩu:</h3>
            <div
              className={`py-3 px-4 rounded-md relative flex items-center gap-4 border border-gray-300`}
            >
              <input
                type={`${eyeConfirm ? "text" : "password"}`}
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChangeFormData}
                className="outline-none w-full placeholder:font-[500]"
                required
              />
              {eyeConfirm ? (
                <FaRegEye
                  size={20}
                  onClick={() => setEyeConfirm(false)}
                  className="cursor-pointer text-gray-400 hover:text-dark"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setEyeConfirm(true)}
                  size={20}
                  className="cursor-pointer text-gray-400 hover:text-dark"
                />
              )}
            </div>
          </div>

          {/* btn submit create account */}
          <div className="mt-3">
            <button
              onClick={handleSubmitRegister}
              className="py-3 w-full bg-red-700 rounded-full font-bold text-[16px] text-white cursor-pointer hover:bg-red-700/80 transition duration-200 ease-in"
            >
              Tạo tài khoản
            </button>
            <p className="text-[16px] text-gray-600 text-center py-5">
              Bạn đã có tài khoản?{" "}
              <Link to={"/customer/account/login"}>
                <span className="font-[500] text-dark underline hover:text-red-500">
                  Đăng nhập ngay
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
