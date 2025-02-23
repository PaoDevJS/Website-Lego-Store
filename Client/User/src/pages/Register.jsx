import { Link } from "react-router-dom"
import { useState } from "react"

//  React icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const Register = () => {
  const [eye, setEye] = useState(false)
  const [eyeConfirm, setEyeConfirm] = useState(false)

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <div className="2xl:w-[30%] md:w-[50%] w-[70%] py-5 px-10 rounded-md">
          <form className="flex flex-col gap-6">
            <div className="my-5">
              <h1 className="text-3xl font-bold ">Đăng ký tài khoản</h1>
              <p className="text-[16px]  leading-10 text-gray-600">Hãy nhập thông tin để đăng ký tài khoản</p>
            </div>

            {/* Enter FirstName & LastName */}
            <div className="flex items-center justify-between">
              <div className="w-[45%] py-2 px-4 rounded-md border border-gray-300">
                <input type="text" placeholder="Enter First Name" className="outline-none w-full placeholder:font-[500]"/>
              </div>
              <div className="w-[45%] py-2 px-4 rounded-md border border-gray-300">
                <input type="text" placeholder="Enter Last Name" className="outline-none w-full placeholder:font-[500]"/>
              </div>
            </div>

            {/* Enter email */}
            <div className="py-2 px-4 rounded-md border border-gray-300">
              <input type="text" placeholder="Enter email" className="outline-none w-full placeholder:font-[500]"/>
            </div>

            {/* Enter phone munber */}
            <div className="py-2 px-4 rounded-md border border-gray-300">
              <input type="text" placeholder="Enter phone number" className="outline-none w-full placeholder:font-[500]"/>
            </div>

            {/* Enter password */}
            <div className="py-2 px-4 rounded-md border border-gray-300 flex items-center gap-4">
              <input type={`${eye? "text" : "password"}`} placeholder="Enter password" className="outline-none w-full placeholder:font-[500]"/>
              {
                eye? 
                <FaRegEye size={20} onClick={() => setEye(false)} className="cursor-pointer text-gray-400 hover:text-dark"/> 
                :
                <FaRegEyeSlash onClick={() => setEye(true)} size={20}className="cursor-pointer text-gray-400 hover:text-dark"/>
              } 
            </div>

            {/* Enter confirm password */}
            <div className="py-2 px-4 rounded-md border border-gray-300 flex items-center gap-4">
              <input type={`${eye? "text" : "password"}`} placeholder="Enter confirm password" className="outline-none w-full placeholder:font-[500]"/>
              {
                eyeConfirm? 
                <FaRegEye size={20} onClick={() => setEyeConfirm(false)} className="cursor-pointer text-gray-400 hover:text-dark"/> 
                :
                <FaRegEyeSlash onClick={() => setEyeConfirm(true)} size={20}className="cursor-pointer text-gray-400 hover:text-dark"/>
              } 
            </div>

            {/* btn submit create account */}
            <div className="mt-3">
              <button className="py-3 w-full bg-red-700 rounded-full font-bold text-[16px] text-white cursor-pointer hover:bg-red-700/80 transition duration-200 ease-in">Tạo tài khoản</button>
              <p className="text-[16px] text-gray-600 text-center py-5">Bạn đã có tài khoản? <Link to={"/customer/account/login"}><span className="font-[500] text-dark underline hover:text-red-500">Đăng nhập ngay</span></Link></p>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Register