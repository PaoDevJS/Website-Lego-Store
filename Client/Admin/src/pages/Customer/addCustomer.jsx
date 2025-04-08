import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import { useState } from "react";

// React Icons
import { TiArrowLeftThick } from "react-icons/ti";

const IsAddCustomer = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    sex: "",
    password: ""
  }) 
  const fetchApiCreateCustomer = "http://localhost:8080/api/auth/user/sign-up"

  const handleChangeFormData = (vail) => {
    setDataForm(prev => ({...prev, [vail.target.name]: vail.target.value}))
  }


  const isPostCreateCustomer = async () => {
    try {
      const result = await axios.post(fetchApiCreateCustomer, dataForm)
      toast.success(result.data)
      setDataForm({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
        sex: "",
        password: ""
      })
    } catch (error) {
      const err= error.response?.data
      if(err === "Tên tài khoản đã tồn tại.") {
        setDataForm({
          username: "",
          firstName: dataForm.firstName,
          lastName: dataForm.lastName,
          email: dataForm.email,
          phone: dataForm.phone,
          birthday: dataForm.birthday,
          sex: dataForm.sex,
          password: dataForm.password
        })
      } else if(err === "Email không hợp lệ." || err === "Email đã tồn tại.") {
        setDataForm({
          username: dataForm.username,
          firstName: dataForm.firstName,
          lastName: dataForm.lastName,
          email: "",
          phone: dataForm.phone,
          birthday: dataForm.birthday,
          sex: dataForm.sex,
          password: dataForm.password
        })
      }
      toast.error(error.response?.data)
    }
  }
  console.log(dataForm)

  const handleSubmitCreateCustomer = (e) => {
    e.preventDefault()
    isPostCreateCustomer()
  }
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

        <div className="mt-10 w-[60%] m-auto">
          <form>
            <h1 className="text-18 font-[700] text-center text-gray-500 uppercase">
              Thêm người dùng mới
            </h1>
            <div className="mt-5 flex items-center">
            <label htmlFor="username" className="min-w-[20%] font-[600] text-gray-500">Tên tài khoản:</label>
                <input type="text" name="username" value={dataForm.username} onChange={handleChangeFormData} placeholder="Nhập tên tài khoản..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
            <div className="flex items-center mt-5">
                <label htmlFor="firstName" className="min-w-[20%] font-[600] text-gray-500">Họ đệm:</label>
                <input type="text" name="firstName" value={dataForm.firstName} onChange={handleChangeFormData} placeholder="Nhập họ đệm..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
            <div className="flex items-center mt-5">
                <label htmlFor="lastName" className="min-w-[20%] font-[600] text-gray-500">Tên:</label>
                <input type="text" name="lastName" value={dataForm.lastName} onChange={handleChangeFormData} placeholder="Nhập tên..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
            <div className="mt-5 flex items-center">
                <label htmlFor="email" className="min-w-[20%] font-[600] text-gray-500">Email:</label>
                <input type="text" name="email" value={dataForm.email} onChange={handleChangeFormData} placeholder="Nhập email..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
            <div className="mt-5 flex items-center">
                <label htmlFor="phone" className="min-w-[20%] font-[600] text-gray-500">Số điện thoại:</label>
                <input type="text" name="phone" value={dataForm.phone} onChange={handleChangeFormData} placeholder="Nhập số điện thoại..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
            <div className="mt-5 flex items-center">
                <label htmlFor="birthday" className="min-w-[20%] font-[600] text-gray-500">Ngày sinh:</label>
                <input type="date" name="birthday" value={dataForm.birthday} onChange={handleChangeFormData} placeholder="Nhập số điện thoại..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
            <div className="mt-5 flex items-center">
                <label className="min-w-[20%] font-[600] text-gray-500">Giới tính:</label>
                <div className="flex items-center justify-around w-[40%]">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="sex" id="nam" value={"Nam"} onChange={handleChangeFormData}/>
                    <label htmlFor="nam" className="text-[16px] cursor-pointer text-gray-600">Nam</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="sex" id="nu" value={"Nữ"} onChange={handleChangeFormData}/>
                    <label htmlFor="nu" className="text-[16px] cursor-pointer text-gray-600">Nữ</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="sex" id="khac" value={"Khác"} onChange={handleChangeFormData}/>
                    <label htmlFor="khac" className="text-[16px] cursor-pointer text-gray-600">Khác</label>
                  </div>
                </div>
            </div>
            <div className="mt-5 flex items-center">
                <label htmlFor="password" className="min-w-[20%] font-[600] text-gray-500">Mật khẩu:</label>
                <input type="password" onChange={handleChangeFormData} value={dataForm.password} name="password" placeholder="Nhập mật khẩu..." className="w-[80%] py-3 px-5 border border-gray-300 rounded-md outline-none"/>
            </div>
            <div>
              <button onClick={handleSubmitCreateCustomer} className="bg-red-600 py-3 w-[30%] rounded-md text-[18px] font-[600] text-white cursor-pointer block m-auto mt-7">Thêm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IsAddCustomer;
