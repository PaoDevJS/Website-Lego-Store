import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/ThemeContext";

const UpdateAddress = () => {
  const { currentUser, setOpenAddress, openAddress } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
  });
  const handleChangeFormData = (vail) => {
    setFormData((prev) => ({ ...prev, [vail.target.name]: vail.target.value }));
  };

  //   go back
  const handleBtnGoBack = (e) => {
    e.preventDefault();
    setOpenAddress({
      isOpen: false,
      address: "",
    });
  };

  // Get item address
  const FetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/address/get-item-address/${openAddress.address}&${currentUser?.user._id}`
      );
      setFormData({
        username: result?.data[0].username,
        phone: result?.data[0].phone,
        address: result?.data[0].address,
      });
      console.log(result.data)
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if(openAddress.isOpen) 
        FetchData();
  }, [openAddress]);

  //   update address
  const handleUpdateItemAddress = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `http://localhost:8080/api/address/update-item-address/${openAddress.address}&${currentUser?.user._id}`,
        formData 
      );
      setFormData({
        username: "",
        phone: "",
        address: "",
      });

      setOpenAddress({
        isOpen: false,
        address: "",
      });
      toast.success(result?.data.message);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  return (
    <div className="2xl:w-[30%] max-h-[50%] bg-white rounded-md p-7">
      <h1 className="text-[25px] text-gray-600 font-[600] pb-3 border-b border-gray-300">
        Cập nhật địa chỉ
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
              onClick={handleBtnGoBack}
              className="bg-gray-500 py-2 w-[120px] rounded-md text-[18px] cursor-pointer font-[500] text-white"
            >
              Quay lại
            </button>
            <button
              onClick={handleUpdateItemAddress}
              className="bg-red-500 py-2 w-[120px] rounded-md text-[18px] cursor-pointer font-[500] text-white"
            >
                Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
