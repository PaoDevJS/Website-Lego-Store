import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

// React Icons
import { TiArrowLeftThick } from "react-icons/ti";

const InfoDetailOfCustomer = () => {
    const id = useLocation().pathname.split("/")[3]
    const [user, setUser] = useState({})
    
    const isFetchApiGetUserId = "http://localhost:8080/api/auth/get-user"
    
    const isFetchData = async () => {
        try {
            const result = await axios.get(`${isFetchApiGetUserId}/${id}`)
            console.log(result.data)
            setUser(result.data)
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    useEffect(() => {
        isFetchData()
    }, [id])

    return (
        <div className="w-full h-full px-10 py-5">
          <div className="bg-white w-full p-7 rounded-md">
            <div>
              <Link to={`/khach-hang/danh-sach-khach-hang`}>
                <button className="Flex gap-1 cursor-pointer">
                  <TiArrowLeftThick size={18} />
                  <span>quay lại</span>
                </button>
              </Link>
            </div>
    
            {/*  */}
    
            <div className="my-10 w-[60%] m-auto">
              <form>
                <h1 className="text-18 font-[700] text-center text-gray-500 uppercase">
                  Thông tin chi tiết người dùng
                </h1>
                <div className="mt-5 flex items-center">
                <label htmlFor="username" className="min-w-[20%] font-[600] text-gray-500">Tên tài khoản:</label>
                    <input type="text" name="username" value={user.username} placeholder="Nhập tên tài khoản..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
                </div>
                <div className="flex items-center mt-5">
                    <label htmlFor="firstName" className="min-w-[20%] font-[600] text-gray-500">Họ đệm:</label>
                    <input type="text" name="firstName" value={user.firstName} placeholder="Nhập họ đệm..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
                </div>
                <div className="flex items-center mt-5">
                    <label htmlFor="lastName" className="min-w-[20%] font-[600] text-gray-500">Tên:</label>
                    <input type="text" name="lastName" value={user.lastName} placeholder="Nhập tên..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="email" className="min-w-[20%] font-[600] text-gray-500">Email:</label>
                    <input type="text" name="email" value={user.email} placeholder="Nhập email..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="phone" className="min-w-[20%] font-[600] text-gray-500">Số điện thoại:</label>
                    <input type="text" name="phone" value={user?.userDetailId?.phone} placeholder="Nhập số điện thoại..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
                </div>
                <div className="mt-5 flex items-center">
                    <label htmlFor="birthday" className="min-w-[20%] font-[600] text-gray-500">Ngày sinh:</label>
                    <p className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none">{user?.userDetailId?.birthday}</p>
                </div>
                <div className="mt-5 flex items-center">
                    <label className="min-w-[20%] font-[600] text-gray-500">Giới tính:</label>
                    <p className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none">{user?.userDetailId?.sex}</p>
                </div>
                {/* <div className="mt-5 flex items-center">
                    <label className="min-w-[20%] font-[600] text-gray-500">Địa chỉ:</label>
                    <p className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none">{user?.userDetailId?.sex}</p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      );
}

export default InfoDetailOfCustomer