import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/ThemeContext";

//  React icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setCurrentUser } = useContext(AppContext)
  const [eye, setEye] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    Password: ""
  })
  // console.log(currentUser)
  const fetchApiSignIn = `http://localhost:8080/api/auth/user/sign-in`
  const navigate = useNavigate()

  const handleChangeFormData = vail => {
    setFormData(prev => ({...prev, [vail.target.name]: vail.target.value}))
  }

//   submit sign in
  const handleSubmitSignIn = async (e) => {
    e.preventDefault()
    try {
      const decoded = await axios.post(fetchApiSignIn, formData)
      setCurrentUser({
        user: decoded.data.user,
        isUser: true
      })
      navigate("/")
      toast.success(decoded.data.mess)
      localStorage.setItem("tokenSignIN", decoded.data.token)
      setFormData({
        email: "",
        Password: ""
      })
    } catch (error) {
      const err = error.response?.data
      setFormData({
        email: formData.email,
        Password: ""
      })
      toast.error(err)
    }
  }

  return (
    <div className="w-full h-[85vh] md:py-5 md:px-10 flex items-center justify-center">
      <div className="2xl:w-[30%] lg:w-[40%] sm:w-[60%] w-[90%] p-10 bg-white rounded-md">
        {/* content title */}
        <div>
          <p className="text-[20px] font-[500] ">Chào mừng bạn ghé thăm</p>
          <h1 className="text-3xl leading-14 uppercase font-bold text-red-700">
            {" "}
            LegoWorld Store{" "}
          </h1>
          <p className="text-gray-700">
            Bạn chưa có tài khoản?{" "}
            <Link to="/customer/account/register">
              <span className="font-[500] text-dark underline hover:text-primary">
                Hãy đăng ký ngay
              </span>
            </Link>
          </p>
        </div>

        {/* form login */}
        <div className="mt-10">
          <form>
            <div className="flex flex-col gap-5">
              <h5 className="text-[18px]">Hãy nhập thông tin của bạn</h5>
              <div className={`w-full py-3 px-5 rounded-md relative border border-gray-300`}>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChangeFormData}
                  name="email"
                  placeholder="Nhập email"
                  className="outline-none w-full placeholder:font-[500]"
                  required
                />
              </div>
              <div className={`w-full py-3 px-5 rounded-md flex items-center gap-4 relative border border-gray-300`}>
                <input
                  type={`${eye ? "text" : "password"}`}
                  value={formData.Password}
                  name="Password"
                  onChange={handleChangeFormData}
                  placeholder="Nhập Mật khẩu"
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
              <div>
                <Link to={"/customer/account/forget-password"}>
                  <p className="underline hover:text-red-600">Quên mật khẩu?</p>
                </Link>
              </div>
            </div>
            <div className="mt-10">
              <button onClick={handleSubmitSignIn} className="w-full bg-red-700 text-white py-3 rounded-md text-lg uppercase font-bold cursor-pointer hover:bg-red-700/80 transition duration-200 ease-in">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
