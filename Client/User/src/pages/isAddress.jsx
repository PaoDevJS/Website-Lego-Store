import { useState, useContext, useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify"
import { AppContext } from "../Context/ThemeContext"

// react icons
import { MdDelete, MdEdit } from "react-icons/md";
import UpdateAddress from "../utils/updateAddress";

const IsAddress = () => {
  const [active, setActive] = useState(false);
  const { currentUser, setOpenAddress, openAddress } = useContext(AppContext)
  const [formData, setFormData] = useState({
    userId: currentUser?.user._id,
    username: "",
    phone: "",
    address: ""
  })
  const [listAddresses, setListAddresses] = useState([])

  const handleChangeFormData = vail => {
    setFormData(prev => ({...prev, [vail.target.name]: vail.target.value}))
  }

  const handleBtnCreateAddress = async (e) => {
    e.preventDefault()

    try {
      const result = await axios.post("http://localhost:8080/api/address/create-address", formData)
      setFormData({
        userId: currentUser?.user._id,
        username: "",
        phone: "",
        address: ""
      })
      setActive(false)
      handleFetchGetAll()
      toast.success(result.data.message)
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }

  const handleFetchGetAll = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/address/get-all", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("tokenSignIN")}`
        }
      })

      setListAddresses(result.data?.addresses)
    } catch (error) {
      console.log(error.response?.data.message)
    }
  }

  useEffect(() => {
    handleFetchGetAll()
  }, [openAddress])

  const handleDeleteAddress = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8080/api/address/delete-address/${id}&${currentUser?.user._id}`)
      handleFetchGetAll()
      toast.success(result?.data.message)
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }

  return (
    <div className="bg-white py-5 px-10 rounded-md">
      <div className="flex justify-between items-center border-b border-gray-300 pb-3">
        <h2 className="text-[20px] font-[600] text-gray-600">
          Địa chỉ của tôi
        </h2>
        <button
          onClick={() => setActive(true)}
          className="bg-red-500 py-2 px-4 rounded-md cursor-pointer text-[16px] font-[600] text-white hover:opacity-90 transition-all duration-150 ease-linear"
        >
          Thêm địa chỉ mới
        </button>

        {/* Thêm địa chỉ người nhận */}
        <div
          className={`${
            active ? "fixed" : "hidden"
          } top-0 bottom-0 right-0 left-0 z-50 bg-black/15`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="2xl:w-[30%] max-h-[50%] bg-white rounded-md p-7">
              <h1 className="text-[25px] text-gray-600 font-[600] pb-3 border-b border-gray-300">
                Địa chỉ mới
              </h1>
              <div className="mt-7">
                <form>
                  <div className="flex items-center justify-between">
                    <div className="py-3 px-4 border border-gray-300 rounded-md w-[47%]">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChangeFormData}
                        placeholder="Nhập tên người nhận"
                        className="w-full outline-none placeholder:font-[600] text-[16px]"
                      />
                    </div>
                    <div className="py-3 px-4 border border-gray-300 rounded-md w-[47%]">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChangeFormData}
                        placeholder="Nhập Số điện thoại"
                        className="w-full outline-none placeholder:font-[600] text-[16px]"
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <textarea
                      name="address"
                      placeholder="Nhập địa chỉ gừi nhận"
                      id=""
                      value={formData.address}
                        onChange={handleChangeFormData}
                      className="border border-gray-300 rounded-md w-full h-[100px] outline-none py-3 px-4 text-[16px] placeholder:font-[600]"
                    />
                  </div>
                  <div className="flex items-center gap-5 justify-end mt-5">
                    <button
                      onClick={(e) => (setActive(false), e.preventDefault())}
                      className="bg-gray-500 py-2 w-[120px] rounded-md text-[18px] cursor-pointer font-[500] text-white"
                    >
                      Quay lại
                    </button>
                    <button onClick={handleBtnCreateAddress} className="bg-red-500 py-2 w-[120px] rounded-md text-[18px] cursor-pointer font-[500] text-white">
                      Thêm{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

          {/* danh sach dia chi nguoi nhan */}
      <div className="mt-5">
        <h2 className="text-[20px] font-[600] text-gray-600">Địa chỉ</h2>
        <div className="mt-7">
          {
            listAddresses?.map((item, index) => {
              return (
                <div key={index} className="border-b border-gray-300 py-2 px-4 mt-5 flex items-center justify-between">
                  <div className="w-[50%]">
                    <div className="flex items-center gap-5 mb-2">
                      <h3 className="text-[20px] font-[600]">{item.username}</h3>
                      <p className="text-[18px] text-gray-700">{item.phone}</p>
                    </div>
                    <p className="text-[18px] text-gray-700">
                      {item.address}
                    </p>
                  </div>
                  <div className="flex item gap-5">
                    <div>
                      <button onClick={() => setOpenAddress({ isOpen: true, address: item._id})} className="p-2 rounded-md cursor-pointer bg-green-300 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-150 ease-linear">
                        <MdEdit size={25} />
                      </button>
                      <div className={`${openAddress.isOpen ? "fixed top-0 right-0 left-0 bottom-0 bg-black/20" : "hidden"}`}>
                        <div className="w-full h-full flex items-center justify-center">
                          <UpdateAddress />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteAddress(item._id)} className="p-2 rounded-md cursor-pointer bg-red-300 text-red-700 hover:bg-red-600 hover:text-white transition-all duration-150 ease-linear">
                      <MdDelete size={25} />
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default IsAddress;
