import { Link } from "react-router-dom";
import { useState } from "react";

//  React icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [err, setErr] = useState(false);
  const [mess, setMess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   Check email
  const CheckEmail = () => {
    const re = /^\S+@\S+\.\S+$/
    if(!re.test(email)) {
        setErrEmail(true)
        setMess("...")
        return
    }

    if(!email) {
        setErrEmail(true)
        setMess("Vui lòng không để trống trường này.")
        return
    }

    setErrEmail(false)
    setMess("")
  }

//   check password
  const CheckPassword = () => {
    if(!password) {
        setErrPassword(true)
        setMess("Vui lòng không để trống trường này.")
        return
    }

    setErrPassword(false)
    setMess("")
  }

//   submit sign in
  const handleSubmitSignIn = async (e) => {
    e.preventDefault()

    CheckEmail()
    CheckPassword()
  }

  return (
    <div className="w-full h-[80vh] md:py-5 md:px-10 flex items-center justify-center">
      <div className="2xl:w-[30%] lg:w-[40%] sm:w-[60%] w-[90%] p-10">
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
        {/*  */}
        <div className={`${err? "block mt-10" : "hidden"} border border-red-400 p-4 rounded-md bg-red-100`}>
            <h1 className="text-center text-red-600">{mess}</h1>
        </div>

        {/* form login */}
        <div className="mt-10">
          <form className="flex flex-col gap-7">
            <h5 className="text-[18px]">Hãy nhập thông tin của bạn</h5>
            <div className={`w-full py-3 px-5 rounded-md relative ${errEmail? "border border-red-600" : "border border-gray-300"}`}>
              <input
                type="text"
                value={email}
                onChange={(vail) => setEmail(vail.target.value)}
                placeholder="Nhập email"
                className="outline-none w-full placeholder:font-[500]"
              />
              <small className={`absolute w-full left-2 text-red-600 bottom-[-20px] ${errEmail? "block" : "hidden"}`}>{mess}</small>
            </div>
            <div className={`w-full py-3 px-5 rounded-md flex items-center gap-4 relative ${errPassword? "border border-red-600" : "border border-gray-300"}`}>
              <input
                type={`${eye ? "text" : "password"}`}
                value={password}
                onChange={(vail) => setPassword(vail.target.value)}
                placeholder="Nhập Mật khẩu"
                className="outline-none w-full placeholder:font-[500]"
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
                <small className={`absolute w-full left-2 text-red-600 bottom-[-20px] ${errPassword? "block" : "hidden"}`}>{mess}</small>
            </div>
            <div className="mt-3">
              <Link>
                <p className="underline mb-7">Quên mật khẩu?</p>
              </Link>
              <button onClick={handleSubmitSignIn} className="w-full bg-red-700 text-white py-3 rounded-full text-lg uppercase font-bold cursor-pointer hover:bg-red-700/80 transition duration-200 ease-in">
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
