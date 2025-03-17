import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

// React Icons
import { FaListOl, FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const ListProducts = () => {
  const [products, setProducts] = useState([])
  const fetchApiGetAllProducts = "http://localhost:8000/api/product/get-all-products"
  const fetchApiDeleteItemProduct = "http://localhost:8000/api/product/delete-item-product"

  const getAllProducts = async () => {
    try {
      const decode = await axios.get(fetchApiGetAllProducts)
      setProducts(decode.data.products)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const handleSubmitDeleteItemProduct = async (id) => {
    try {
      const decode = await axios.delete(`${fetchApiDeleteItemProduct}/${id}`)
      fetchApiGetAllProducts()
      toast.success(decode.data.message)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  console.log(products)

  return (
    <div className=" w-full h-full px-10 py-5">
      {/* create Category */}
      <div className="w-full bg-white py-4 px-7 rounded-md">
        <div className="flex items-center justify-between">
          <div className="Flex gap-3">
            <div className="border border-gray-300 text-gray-500 p-5 rounded-md">
              <FaListOl size={30} />
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
        <table className="table-fixed w-full rounded-md overflow-hidden">
          <thead>
            <tr className="bg-red-500 text-white uppercase">
              <th className="w-[5%] py-3 text-center">Stt</th>
              <th className="w-[10%] py-3 text-center">ảnh sản phẩm</th> 
              <th className="w-[20%] py-3 text-center">tên sản phẩm</th> 
              <th className="w-[10%] py-3 text-center">Thương hiệu</th> 
              <th className="w-[10%] py-3 text-center">danh mục</th> 
              <th className="w-[10%] py-3 text-center">giá sản phẩm</th> 
              <th className="w-[10%] py-3 text-center">số lượng</th> 
              <th className="w-[10%] py-3 text-center">Trang thái</th> 
              <th className="w-[15%] py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.map((item, index) => (
                <tr key={index} className="even:bg-[#fdfdfd] odd:bg-[#e7e7e9]">
                  <td className="py-3 px-5 text-center">#{index + 1}</td>
                  <td className="py-3 px-5 text-center">
                    <img src={`http://localhost:8000/${item.images[0]}`} alt="" className='w-[70px] h-[70px] object-cover m-auto rounded-md'/>
                  </td>
                  <td className="py-3 px-5 text-center">{item.name}</td>
                  <td className="py-3 px-5 text-center">{item.brands}</td>
                  <td className="py-3 px-5 text-center">{item.categories}</td>
                  <td className="py-3 px-5 text-center">{item.price}</td>
                  <td className="py-3 px-5 text-center">{item.stock}</td>
                  <td className="py-3 px-5 text-center">{item.status}</td>
                  <td className="py-3 px-5 text-center">
                    <div>
                      <Link to={`/san-pham/cap-nhat-san-pham/${item._id}`}>
                        <button className="rounded p-1 bg-green-300 text-green-600 cursor-pointer hover:text-white hover:bg-green-600 transition-all duration-300 ease-in">
                          <FaEdit size={20}/>
                        </button>
                      </Link>
                      <button onClick={() => handleSubmitDeleteItemProduct(item._id)} className="rounded p-1 bg-red-300 text-red-600 hover:text-white hover:bg-red-600 cursor-pointer ml-5 transition-all duration-300 ease-in">
                        <MdDelete size={20}/>
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
  )
}

export default ListProducts