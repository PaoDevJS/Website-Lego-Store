import { Link } from "react-router-dom"
import { useState } from "react"

//  React icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
const Login = () => {
    const [eye, setEye] = useState(false)

  return (
    <div className="w-full min-h-[70vh] md:py-5 md:px-10 flex items-center justify-center">
        <div className="2xl:w-[25%] lg:w-[40%] sm:w-[60%] w-[90%] min-h-[30%] p-10 rounded-md shadow-xl border border-red-100 shadow-red-300">
            {/* content title */}
            <div>
                <p className="text-[20px] font-[500] ">Chào mừng bạn ghé thăm</p>
                <h1 className="text-3xl leading-12 uppercase font-bold text-red-700"> LegoWorld Store </h1>
                <p className="text-gray-700">Bạn chưa có tài khoản? <Link to="/customer/account/register"><span className="font-[500] text-dark underline hover:text-primary">Hãy đăng ký ngay</span></Link></p>
            </div>

            {/* form login */}
            <div className="mt-7">
                <form className="flex flex-col gap-5">
                    <h5 className="text-[16px]">Hãy nhập thông tin của bạn</h5>
                    <div className="border border-gray-300 w-full py-3 px-5 rounded-full">
                        <input type="text" placeholder="Enter email ..." className="outline-none w-full placeholder:text-[16px] placeholder:font-[500]"/>
                    </div>
                    <div className="border border-gray-300 w-full py-3 px-5 rounded-full flex items-center gap-4">
                        <input type={`${eye? "text" : "password"}`} placeholder="Enter password ..." className="outline-none w-full placeholder:text-[16px] placeholder:font-[500]"/>
                        {
                            eye? 
                            <FaRegEye size={23} onClick={() => setEye(false)} className="cursor-pointer text-gray-400 hover:text-dark"/> 
                            :
                            <FaRegEyeSlash onClick={() => setEye(true)} size={23}className="cursor-pointer text-gray-400 hover:text-dark"/>
                        }
                    </div>
                    <div>
                        <Link><p className="underline mb-5">Quên mật khẩu?</p></Link>
                        <button className="w-full bg-red-700 text-white py-3 rounded-full  text-lg uppercase font-bold cursor-pointer">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login