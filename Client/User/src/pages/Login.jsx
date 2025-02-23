import { Link } from "react-router-dom"
import { useState } from "react"

//  React icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const Login = () => {
    const [eye, setEye] = useState(false)

  return (
    <div className="w-full h-[80vh] md:py-5 md:px-10 flex items-center justify-center">
        <div className="2xl:w-[30%] lg:w-[40%] sm:w-[60%] w-[90%] p-10">
            {/* content title */}
            <div>
                <p className="text-[20px] font-[500] ">Chào mừng bạn ghé thăm</p>
                <h1 className="text-3xl leading-14 uppercase font-bold text-red-700"> LegoWorld Store </h1>
                <p className="text-gray-700">Bạn chưa có tài khoản? <Link to="/customer/account/register"><span className="font-[500] text-dark underline hover:text-primary">Hãy đăng ký ngay</span></Link></p>
            </div>

            {/* form login */}
            <div className="mt-10">
                <form className="flex flex-col gap-5">
                    <h5 className="text-[18px]">Hãy nhập thông tin của bạn</h5>
                    <div className="border border-gray-300 w-full py-2 px-5 rounded-md">
                        <input type="text" placeholder="Nhập email" className="outline-none w-full placeholder:font-[500]"/>
                    </div>
                    <div className="border border-gray-300 w-full py-2 px-5 rounded-md flex items-center gap-4">
                        <input type={`${eye? "text" : "password"}`} placeholder="Nhập Mật khẩu" className="outline-none w-full placeholder:font-[500]"/>
                        {
                            eye? 
                            <FaRegEye size={20} onClick={() => setEye(false)} className="cursor-pointer text-gray-400 hover:text-dark"/> 
                            :
                            <FaRegEyeSlash onClick={() => setEye(true)} size={20}className="cursor-pointer text-gray-400 hover:text-dark"/>
                        }
                    </div>
                    <div className="mt-3">
                        <Link><p className="underline mb-7">Quên mật khẩu?</p></Link>
                        <button className="w-full bg-red-700 text-white py-3 rounded-full text-lg uppercase font-bold cursor-pointer hover:bg-red-700/80 transition duration-200 ease-in">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login