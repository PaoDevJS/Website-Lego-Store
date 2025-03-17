import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// React Icons
import { TiArrowLeftThick } from "react-icons/ti";

const UpdateBrand = () => {
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const [mess, setMess] = useState("");
  const urlApiUpdateItemBrand = "http://localhost:8000/api/brand/update-item-brand";
  const urlApiGetItemBrand = "http://localhost:8000/api/brand/get-item-brand";
  const path = useLocation().pathname
  const id = path.split("/")[3]
  const navigate = useNavigate()

  const FetchApiGetItemBrand = async () => {
    try {
      const decode = await axios.get(`${urlApiGetItemBrand}/${id}`)
      setName(decode.data.itemBrand.name)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    FetchApiGetItemBrand()
  }, [])

  const FetchApiUpdateItemBrand = async () => {
    try {
      const decode = await axios.put(`${urlApiUpdateItemBrand}/${id}`, { name });
      const result = decode.data;
      setName("");
      navigate("/thuong-hieu/danh-sach-thuong-hieu")
      toast.success(result.message);
    } catch (error) {
      const err = error.response.data;
      if (err.message === "Thương hiệu này đã tồn tại.") {
        setErr(true);
        setMess(err.message);
        return true;
      }
      setErr(false);
      setMess("");
      toast.error(err.message);
      return false;
    }
  };
  // check name category
  const checkNameCategory = () => {
    if (!name) {
      setErr(true);
      setMess("Vui lòng không để trống trường này.");
      return true;
    }
    setErr(false);
    setMess("");
    FetchApiUpdateItemBrand();
    return false;
  };

  const handleSubmitUpdateBrand = (e) => {
    e.preventDefault();
    checkNameCategory();
  };

  return (
    <div className="w-full py-5 px-10">
      <div className="bg-white w-full p-7 rounded-md">
        <div>
          <Link to={`/thuong-hieu/danh-sach-thuong-hieu`}>
            <button className="Flex gap-1 cursor-pointer">
              <TiArrowLeftThick size={18} />
              <span>quay lại</span>
            </button>
          </Link>
        </div>
        {/* new Add Category */}
        <div className="mt-10 w-[60%] m-auto">
          <form>
            <h1 className="text-18 font-[700] text-center text-gray-500 uppercase">
              Cập nhật thương hiệu
            </h1>
            <div className="Flex mt-10">
              <label
                htmlFor="name"
                className="w-[25%] text-16 font-[500] text-gray-600"
              >
                Tên thương hiệu:
              </label>
              <div className="w-full relative">
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(vail) => setName(vail.target.value)}
                  placeholder="Nhập thương hiệu tại đây..."
                  className={`border w-full py-3 px-5 rounded-md outline-none ${
                    err
                      ? "border-red-600 placeholder:text-red-600"
                      : "border-gray-300"
                  }`}
                  required
                />
                <small
                  className={`${
                    err
                      ? "absolute left-0 bottom-[-20px] text-red-600"
                      : "hidden"
                  }`}
                >
                  {mess}
                </small>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmitUpdateBrand}
                className="mt-8 bg-red-600 text-16 block m-auto w-[30%] rounded-md py-3 cursor-pointer text-white font-[700] hover:opacity-80 transition-all duration-200 ease-linear"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrand;
