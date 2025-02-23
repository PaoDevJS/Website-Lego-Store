import cart from "../assets/images/cart.webp"
import { useState } from "react"


// react icons
import { FaRegEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const ListProductInCart = () => {
    const [checkbox, setCheckbox] = useState(false)
    console.log(checkbox)

  return (
    <div className="w-full h-[70vh] mt-7">
        <table className="table-fixed w-full">
            <thead>
                <tr>
                    <th className="w-[5%] py-2 px-4 font-[400]">
                        <input type="checkbox" value={checkbox} onChange={(vail) => setCheckbox(vail)}/>
                    </th>
                    <th className="w-[40%] py-2 px-4 font-[400]">Sản Phẩm</th>
                    <th className="w-[15%] py-2 px-4 font-[400]">Đơn Giá</th>
                    <th className="w-[10%] py-2 px-4 font-[400]">Số Lượng</th>
                    <th className="w-[15%] py-2 px-4 font-[400]">Số Tiền</th>
                    <th className="w-[15%] py-2 px-4 font-[400]">Thao Tác</th>
                </tr>
            </thead>
            <tbody>
                <tr className="odd:">
                    <td className="w-[5%] py-2 px-4">
                        <input type="checkbox"/>
                    </td>
                    <td className="w-[35%] py-2 px-4">
                        <div className="flex gap-5">
                            <img src={cart} alt="" className="w-20 h-20 object-cover"/>
                            <div>
                                <h3 className="">Thanh treo rèm đa năng không cần đóng đinh, khoan và có thể kéo dài</h3>
                                <p></p>
                            </div>
                        </div>
                    </td>
                    <td className="w-[15%] py-2 px-4">
                        <p className="text-red-500 font-[500] flex justify-center whitespace-normal items-center gap-1">280.000.000<span className="underline text-[12px]">đ</span></p>
                    </td>
                    <td className="w-[15%] py-2 px-4 text-center">
                        <p className="text-gray-500"> <span>x</span>2</p>
                    </td>
                    <td className="w-[15%] py-2 px-4">
                        <p className="text-red-500 font-[500] flex justify-center whitespace-normal items-center gap-1">280.000.000<span className="underline text-[12px]">đ</span></p>
                    </td>
                    <td className="w-[15%] py-2 px-4">
                        <div className="flex items-center justify-center gap-5">
                            <button className="bg-green-300 cursor-pointer text-green-600 rounded-md p-2 hover:bg-green-600 hover:text-white">
                                <FaRegEdit size={20}/>
                            </button>
                            <button className="bg-red-300 cursor-pointer text-red-600 rounded-md p-2 hover:bg-red-600 hover:text-white">
                                <MdDelete size={20}/>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListProductInCart