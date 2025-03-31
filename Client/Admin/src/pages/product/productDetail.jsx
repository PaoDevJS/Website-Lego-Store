import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

// React Icons
import { TiArrowLeftThick } from "react-icons/ti";
const ProductDetail = () => {
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        price: "",
        brand: "",
        stock: "",
        category: ""
    })
    const [images, setImages] = useState([])
    const isFormatMoney = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    })
    // fetch api get danh muc & thuong hieu
  const path = useLocation().pathname;
  const id = path.split("/")[3];
  const urlApiGetItemProduct =
    "http://localhost:8000/api/brand/get-item-product";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product] = await Promise.all([
          axios.get(`${urlApiGetItemProduct}/${id}`),
        ]);

        const itemProduct = product.data.itemProduct;
        setFormData({
            name: itemProduct.name,
            desc: itemProduct.desc,
            price: itemProduct.price,
            brand: itemProduct.brands,
            stock: itemProduct.stock,
            category: itemProduct.categories,
        })
        setImages(itemProduct.images)
      } catch (error) {
        console.log(error.response?.data || "Lỗi không xác định");
      }
    };
    fetchData();
  }, [id]);
    return (
        <div className="py-5 px-10">
          <div className="bg-white w-full p-7 rounded-md">
            <div>
              <Link to={`/san-pham/danh-sach-san-pham`}>
                <button className="Flex gap-1 cursor-pointer">
                  <TiArrowLeftThick size={18} />
                  <span>quay lại</span>
                </button>
              </Link>
            </div>
    
            {/* Product Detail */}
            <div className="mt-10 w-[60%] m-auto">
                  <form>
                    <h1 className="text-18 font-[700] text-center text-gray-500 uppercase">
                      Chi tiết sản phẩm
                    </h1>
                    <div className="Flex gap-5 mt-10">
                      <label
                        htmlFor="name"
                        className="min-w-[20%] text-16 font-[500] text-gray-600"
                      >
                        Tên sản phẩm:
                      </label>
                      <div className="min-w-[80%] relative">
                        <input
                          type="text"
                          value={formData.name}
                          disabled
                          id="name"
                          placeholder="Nhập tên sản phẩm tại đây..."
                          className={`border w-full py-3 px-5 rounded-md outline-none border-gray-300`}
                          required
                        />
                      </div>
                    </div>
                    {/* description */}
                    <div className="flex gap-5 mt-10">
                      <label
                        htmlFor="name"
                        className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
                      >
                        Mô tả sản phẩm:
                      </label>
                      <div className="min-w-[80%] relative">
                        <textarea
                          value={formData.desc}
                          id="name"
                          placeholder="Nhập thể loại tại đây..."
                          className={`border w-full py-3 px-5 h-[250px] rounded-md outline-none border-gray-300`}
                          required
                          disabled
                        />
                      </div>
                    </div>
                    {/* price */}
                    <div className="Flex gap-5 mt-10">
                      <label
                        htmlFor="name"
                        className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
                      >
                        Giá sản phẩm:
                      </label>
                      <div className="min-w-[80%] relative">
                        <input
                          value={isFormatMoney.format(formData.price)}
                          id="name"
                          placeholder="Nhập thể loại tại đây..."
                          className={`border w-full py-3 px-5 rounded-md outline-none border-gray-300`}
                          required
                          disabled
                        />
                      </div>
                    </div>
                    {/* Stocks */}
                    <div className="Flex gap-5 mt-10">
                      <label
                        htmlFor="stock"
                        className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
                      >
                        Số lượng sản phẩm:
                      </label>
                      <div className="min-w-[80%] relative">
                        <input
                          value={formData.stock}
                          id="stock"
                          placeholder="Nhập thể loại tại đây..."
                          className={`border w-full py-3 px-5 rounded-md outline-none border-gray-300`}
                          required
                          disabled
                        />
                      </div>
                    </div>
                    {/* Category */}
                    <div className="flex gap-5 mt-10">
                      <label
                        htmlFor="category"
                        className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
                      >
                        Danh mục sản phẩm:
                      </label>
                      <div
                        className={`min-w-[80%] relative border py-3 px-5 rounded-md border-gray-300`}
                      >
                        <div className="flex items-center justify-between gap-5">
                            <h5>{formData.category}</h5>
                        </div>
                      </div>
                    </div>
                    {/* brand */}
                    <div className="flex gap-5 mt-10">
                      <label
                        htmlFor="name"
                        className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
                      >
                        Thương hiệu sản phẩm:
                      </label>
                      <div className="min-w-[80%] relative border border-gray-300 py-3 px-5 rounded-md">
                        <div className="flex items-center justify-between gap-5">
                            <h5>{formData.brand}</h5>
                        </div>
                      </div>
                    </div>
                    {/* images */}
                    <div className="flex gap-5 mt-10">
                      <label
                        htmlFor="name"
                        className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
                      >
                        Ảnh:
                      </label>
                      <div className="min-w-[80%] relative border border-gray-300 py-3 px-5 rounded-md">
                        <div className="flex items-center justify-between gap-5">
                          <ul className="w-[90%] flex items-center gap-5 overflow-hidden">
                            {images?.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-3 border border-gray-300 rounded-md p-2"
                              >
                                <img
                                  src={`http://localhost:8000/${item}`}
                                  alt=""
                                  className="min-w-[40px] h-[40px]"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
          </div>
        </div>
      )
}

export default ProductDetail