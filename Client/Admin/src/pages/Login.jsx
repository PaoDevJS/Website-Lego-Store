import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { errorUser, successUser } from "../redux/reducer/userSlicer";

// React Icons
import { MdOutlineMail } from "react-icons/md";
import { PiLockKeyBold } from "react-icons/pi";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    Email: "",
    Password: ""
  })
  const fetchApiSignInByAccountAdmin = "http://localhost:8000/api/auth/admin/sign-in"

  const handleChangeFormData = ( vail ) => {
    setFormData(prev => ({...prev, [vail.target.name]: vail.target.value}))
  }

  // đăng nhập
  const SignInByAccountAdmin = async () =>{
    try {
      const result = await axios.post(fetchApiSignInByAccountAdmin, formData)
      navigate("/")
      dispatch(successUser(result.data))
      toast.success(result.data.message)
    } catch (error) {
      const message = error.response.data
      dispatch(errorUser())
      toast.error(message)

      message === "Email không hợp lệ." ? 
        (
          setFormData({
            Email: "",
            Password: formData.Password
          })
        ) : (
          setFormData({
          Email: formData.Email,
            Password: ""
          })
        )
    }
  }

  const handleBtnSubmitSignIn = (e) => {
    e.preventDefault();
    SignInByAccountAdmin()
  };
  return (
    <div className="bgSignIn w-full h-[100vh] FlexCenter">
      <div className="bg-white min-w-[25%] max-h-[70%] rounded-md shadow-xl shadow-gray-300 border border-gray-100 p-10">
        {/* title */}
        <div className="mb-12 text-center max-w-[60%] m-auto">
          <h1 className="text-[20px] font-[900] uppercase">Đăng nhập</h1>
        </div>
        {/* Form Login */}
        <div>
          <form className="flex flex-col gap-8">
            {/* email */}
            <div className=" relative ">
              <div
                className={`Flex border rounded-full py-3 px-5 gap-3 border-gray-300`}
              >
                <label htmlFor="email">
                  <MdOutlineMail size={20} className="text-gray-700" />{" "}
                </label>
                <input
                  type="text"
                  name="Email"
                  id="email"
                  value={formData.Email}
                  onChange={handleChangeFormData}
                  placeholder="Nhập email tại đây..."
                  className={`outline-none flex-1 placeholder:font-[500]`}
                />
              </div>
            </div>
            {/* password */}
            <div className=" relative ">
              <div
                className={`Flex border rounded-full py-3 px-5 gap-3 border-gray-300`}
              >
                <label htmlFor="password">
                  {" "}
                  <PiLockKeyBold size={20} className="text-gray-700" />{" "}
                </label>
                <input
                  type="password"
                  name="Password"
                  id="password"
                  value={formData.Password}
                  onChange={handleChangeFormData}
                  placeholder="Nhập mật khẩu tại đây..."
                  className={`outline-none flex-1 placeholder:font-[500]`}
                />
              </div>
            </div>
            {/* btn submit login */}
            <div>
              <button
                onClick={handleBtnSubmitSignIn}
                className="bg-red-700 w-full rounded-full py-3 uppercase text-16 font-[700] cursor-pointer text-white"
              >
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
