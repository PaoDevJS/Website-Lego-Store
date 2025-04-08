import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// React Icons
import { FaPlus, FaEdit, FaRegEye, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { BsBox2HeartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const fetchApiGetAllProducts =
    "http://localhost:8080/api/product/get-all-products";
  const fetchApiDeleteItemProduct =
    "http://localhost:8080/api/product/delete-item-product";
  const formatVND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  });


  const handlePrevPage = () => {
    if(page <= 1) {
      return
    }

    setCount(p => p - 10)
    setPage(p => p - 1)
  }

  const handleNextPage = () => {
    setCount(p => p + 10)
    setPage(p => p + 1)
  }

  const getAllProducts = useCallback(async () => {
    try {
      const decode = await axios.get(fetchApiGetAllProducts);
      setProducts(decode.data.products);
    } catch (error) {
      console.log(error.response?.data || "Lỗi không xác định");
    }
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts, setProducts]);

  const handleSubmitDeleteItemProduct = async (id) => {
    try {
      const decode = await axios.delete(`${fetchApiDeleteItemProduct}/${id}`);
      toast.success(decode.data?.message);
      getAllProducts();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className=" w-full h-full px-10 py-5">
      {/* create Category */}
      <div className="w-full bg-white py-4 px-7 rounded-md">
        <div className="flex items-center justify-between">
          <div className="Flex gap-3">
            <div className="border border-gray-300 text-gray-500 p-5 rounded-md">
              <BsBox2HeartFill size={30} />
            </div>
            <div>
              <h2 className="text-18 font-[600] text-gray-700">Sản phẩm</h2>
              <p className="text-gray-400 text-12">
                xem danh sách, thêm mới, cập nhật
              </p>
            </div>
          </div>
          <div>
            <Link to={`/san-pham/them-san-pham-moi`}>
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
              <th className="w-[10%] py-3 text-center">ảnh</th>
              <th className="w-[25%] py-3 text-center">tên sản phẩm</th>
              <th className="w-[15%] py-3 text-center">Thương hiệu</th>
              <th className="w-[15%] py-3 text-center">danh mục</th>
              <th className="w-[15%] py-3 text-center">giá sản phẩm</th>
              <th className="w-[15%] py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products
              ?.filter(
                (vail) =>
                  vail.name.toLowerCase().includes(search.toLowerCase()) ||
                  vail.brands.toLowerCase().includes(search.toLowerCase()) ||
                  vail.categories.toLowerCase().includes(search.toLowerCase())
              ).slice(count, 10 * page)
              .map((item, index) => (
                <tr key={index} className="even:bg-[#fdfdfd] odd:bg-[#e7e7e9]">
                  <td className="py-3 px-5 text-center">#{index + count + 1}</td>
                  <td className="py-3 px-5 text-center">
                    <img
                      src={`http://localhost:8080/${item.images[0]}`}
                      alt=""
                      className="w-[70px] h-[70px] object-cover m-auto rounded-md"
                    />
                  </td>
                  <td className="py-3 px-5 text-center">{item.name}</td>
                  <td className="py-3 px-5 text-center">{item.brands}</td>
                  <td className="py-3 px-5 text-center">{item.categories}</td>
                  <td className="py-3 px-5 text-center">
                    {formatVND.format(item.price)}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link to={`/san-pham/chi-tiet-san-pham/${item._id}`}>
                        <button className="rounded p-1 bg-violet-300 text-violet-600 cursor-pointer hover:text-white hover:bg-violet-600 transition-all duration-300 ease-in">
                          <FaRegEye size={20} />
                        </button>
                      </Link>
                      <Link to={`/san-pham/cap-nhat-san-pham/${item._id}`}>
                        <button className="rounded p-1 bg-green-300 text-green-600 cursor-pointer hover:text-white hover:bg-green-600 transition-all duration-300 ease-in">
                          <FaEdit size={20} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleSubmitDeleteItemProduct(item._id)}
                        className="rounded p-1 bg-red-300 text-red-600 hover:text-white hover:bg-red-600 cursor-pointer transition-all duration-300 ease-in"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex items-center gap-5 justify-end mt-5">
            <button onClick={handlePrevPage} className="text-gray-400 cursor-pointer hover:text-black transition-all duration-200 ease-in">
              <FaAngleDoubleLeft size={20} />
            </button>
            <h3 className="border border-gray-300 w-[70px] py-2 text-center rounded-md">{page}</h3>
            <button onClick={handleNextPage} className="text-gray-400 cursor-pointer hover:text-black transition-all duration-200 ease-in">
              <FaAngleDoubleRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
