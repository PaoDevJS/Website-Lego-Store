import { useState } from "react";
import { FaSleigh } from "react-icons/fa";
// React Icons
import { MdOutlineMail } from "react-icons/md";
import { PiLockKeyBold } from "react-icons/pi";

const Login = () => {
  const [err, setErr] = useState(false)
  const [email, setEmail] = useState("")
  const [messEmail, setMessEmail] = useState("")
  const [errEmail, setErrEmail] = useState(false)
  const [password, setPassword] = useState("")
  const [messPassword, setMessPassword] = useState("")
  const [errPassword, setErrPassword] = useState(false)

  // check email 
  const checkValueEmail = () => {
    if(!email) {
      setErrEmail(true)
      setMessEmail("Vui lòng không để trống trường này.")
      return
    }

    const re = /\S+@\S+\.\S+/
    if(!re.test(email)) {
      setErrEmail(true)
      setMessEmail("Email không hợp .")
      return
    }

    setErrEmail(false)
    setMessEmail("")
  }

  // check password 
  const checkValuePassword = () => {
    if(!password) {
      setErrPassword(true)
      setMessPassword("Vui lòng không để trống trường này.")
      return
    }

    setErrPassword(false)
    setMessPassword("")
  }
  const handleBtnSubmitSignIn = (e) => {
    e.preventDefault()
    checkValueEmail()
    checkValuePassword()
  }
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
              <div className={`Flex border rounded-full py-3 px-5 gap-3 ${errEmail ? "border-red-500" : "border-gray-300"}`}>
                <label htmlFor="email">
                  {" "}
                  <MdOutlineMail size={20} className="text-gray-700" />{" "}
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={vail => setEmail(vail.target.value)}
                  placeholder="Nhập email tại đây..."
                  className={`${errEmail ? " placeholder:text-red-500" : ""} outline-none flex-1 placeholder:font-[500]`}
                />
              </div>
              <small className={`${errEmail ? "text-red-600 absolute left-3 translate-x-3 bottom-[-20px]" : "hidden"}`}>{messEmail}</small>
            </div>
            {/* password */}
            <div className=" relative ">
              <div className={`Flex border rounded-full py-3 px-5 gap-3 ${errPassword ? "border-red-500" : "border-gray-300"}`}>
                <label htmlFor="password">
                  {" "}
                  <PiLockKeyBold size={20} className="text-gray-700" />{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={vail => setPassword(vail.target.value)}
                  placeholder="Nhập mật khẩu tại đây..."
                  className={`${errPassword ? " placeholder:text-red-500" : ""} outline-none flex-1 placeholder:font-[500]`}
                />
              </div>
              <small className={`${errPassword ? "text-red-600 absolute left-3 translate-x-3 bottom-[-20px]" : "hidden"}`}>{messPassword}</small>
            </div>
            {/* btn submit login */}
            <div>
              <button onClick={handleBtnSubmitSignIn} className="bg-red-700 w-full rounded-full py-3 uppercase text-16 font-[700] cursor-pointer text-white">
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
