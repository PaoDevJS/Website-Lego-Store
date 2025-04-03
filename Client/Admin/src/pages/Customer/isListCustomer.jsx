import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"


// React Icons
import { FaPlus, FaEdit, FaRegEye, FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const IsListCustomer = () => {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const isFetchApiGetAllUsers = "http://localhost:8080/api/auth/admin/get-all-users"
  const isFetchApiDeleteUser = "http:///localhost:8080/api/auth/delete-user"
  const isFetchData = async () => {
    try {
      const result = await axios(isFetchApiGetAllUsers, { headers: { "Authorization": `Bearer ${localStorage.getItem("sign_in_admin")}`}})
      setUsers(result.data)
    } catch (error) {
      console.log(error.response?.data)
    }
  }

  useEffect(() => {
    isFetchData()
  }, [])

  const handleDeleteCustomer = async (id) => {
    try {
      const result = await axios.delete(`${isFetchApiDeleteUser}/${id}`)
      isFetchData()
      toast.success(result.data)
    } catch (error) {
      console.log(error.response?.data)
    }
  }



  return (
    <div className="w-full h-full px-10 py-5">
      {/* create Category */}
      <div className="w-full bg-white py-4 px-7 rounded-md">
        <div className="flex items-center justify-between">
          <div className="Flex gap-3">
            <div className="border border-gray-300 text-gray-500 p-5 rounded-md">
              <FaUsers size={30} />
            </div>
            <div>
              <h2 className="text-18 font-[600] text-gray-700">Quản lý người dùng</h2>
              <p className="text-gray-400 text-12">
                xem danh sách, thêm mới, cập nhật
              </p>
            </div>
          </div>
          <div>
            <Link to={`/khach-hang/them-khach-hang`}>
              <button className="bg-red-600 FlexCenter gap-3 py-2 px-5 rounded-md text-white font-[600] text-16 cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80">
                <FaPlus />
                Thêm
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* table list categories */}
      <div className="w-full mt-10 bg-white p-10 rounded-md">
        <div className="mb-10 border border-gray-300 w-[50%] py-2 px-4 rounded-md flex items-center gap-4">
          <FaSearch size={20} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(vail) => setSearch(vail.target.value)}
            className="w-full outline-none"
          />
        </div>
        <table className="table-fixed w-full rounded-md overflow-hidden">
          <thead>
            <tr className="bg-red-500 text-white uppercase">
              <th className="w-[5%] py-3 text-center">Stt</th>
              <th className="w-[10%] py-3 text-center">Ảnh đại điện</th>
              <th className="w-[20%] py-3 text-center">Tên người dùng</th>
              <th className="w-[20%] py-3 text-center">Email</th>
              <th className="w-[15%] py-3 text-center">Số điện thoại</th>
              <th className="w-[15%] py-3 text-center">Ngày sinh</th>
              <th className="w-[15%] py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {
              users?.filter(prev => prev.role !== "Admin").map((item, index) => (
                <tr key={index} className="even:bg-[#fdfdfd] odd:bg-[#e7e7e9]">
                  <td className="py-3 px-5 text-center">#{index + 1}</td>
                  <td className="py-3 px-5 text-center">
                    {/* <img
                      // src={`http://localhost:8080/${item.userDetailId?.image}`}
                      alt=""
                      className="w-[70px] h-[70px] object-cover m-auto rounded-md"
                    /> */}
                  </td>
                  <td className="py-3 px-5 text-center">{item.firstName + " " + item.lastName}</td>
                  <td className="py-3 px-5 text-center">{item.email}</td>
                  <td className="py-3 px-5 text-center">{item.userDetailId?.phone}</td>
                  <td className="py-3 px-5 text-center">{item.userDetailId?.birthday}</td>
                  <td className="py-3 px-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link to={`/khach-hang/thong-tin-chi-tiet-khach-hang/${item._id}`}>
                        <button className="rounded p-1 bg-violet-300 text-violet-600 cursor-pointer hover:text-white hover:bg-violet-600 transition-all duration-300 ease-in">
                          <FaRegEye size={20} />
                        </button>
                      </Link>
                      <Link to={`/san-pham/cap-nhat-san-pham/`}>
                        <button className="rounded p-1 bg-green-300 text-green-600 cursor-pointer hover:text-white hover:bg-green-600 transition-all duration-300 ease-in">
                          <FaEdit size={20} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteCustomer(item._id)}
                        className="rounded p-1 bg-red-300 text-red-600 hover:text-white hover:bg-red-600 cursor-pointer transition-all duration-300 ease-in"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IsListCustomer