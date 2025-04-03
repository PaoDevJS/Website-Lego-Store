import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// React Icons
import { TiArrowLeftThick } from "react-icons/ti";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const [mess, setMess] = useState("");
  const fetchApiPostCreateCategories = `http://localhost:8080/api/category/add-category`;

  const PostCreateCategory = async () => {
    try {
      const decode = await axios.post(fetchApiPostCreateCategories, { name });
      const result = decode.data;
      setName("");
      toast.success(result.message);
    } catch (error) {
      const err = error.response.data;
      if (err.message === "Danh mục này đã tồn tại.") {
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
    PostCreateCategory();
    return false;
  };

  const handleSubmitAddCategory = (e) => {
    e.preventDefault();
    checkNameCategory();
  };

  return (
    <div className="py-5 px-10">
      <div className="bg-white w-full p-7 rounded-md">
        <div>
          <Link to={`/danh-muc/danh-sach-danh-muc`}>
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
              Thêm danh mục mới
            </h1>
            <div className="Flex mt-10">
              <label
                htmlFor="name"
                className="min-w-[20%] text-16 font-[500] text-gray-600"
              >
                Tên danh mục:
              </label>
              <div className="w-full relative">
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(vail) => setName(vail.target.value)}
                  placeholder="Nhập thể loại tại đây..."
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
                onClick={handleSubmitAddCategory}
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

export default AddCategory;
