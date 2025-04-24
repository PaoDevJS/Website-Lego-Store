import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { detailOrder, updateOrder } from "../../redux/reducer/orderSlice";

// React icons
import { FaRegEye, FaRegEdit } from "react-icons/fa";
import DetailOrder from "./DetailOrder";
import UpdateOrder from "./UpdateOrder";

const ListOrders = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.Order);

  return (
    <div className="w-full h-full">
      {/* search */}
      <div className="border border-gray-300 w-[50%] py-2 px-4 rounded-md flex items-center gap-4 mb-5">
        <FaSearch size={20} className="text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(vail) => setSearch(vail.target.value)}
          className="w-full outline-none placeholder:font-[600]"
          placeholder="Tìm kiếm đơn hàng"
        />
      </div>
      {/* danh sach don hang */}
      <div className="w-full h-full">
        <table className="table-fixed w-full rounded-md overflow-hidden border">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="w-[5%] border py-2 uppercase">stt</th>
              <th className="w-[15%] border py-2">Mã đơn hàng</th>
              <th className="w-[15%] border py-2">Ngày tạo đơn</th>
              <th className="w-[20%] border py-2">Tên người nhận</th>
              <th className="w-[15%] border py-2">Trạng thái đơn hàng</th>
              <th className="w-[20%] border py-2">Phương thức thanh toán</th>
              <th className="w-[10%] border py-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders?.orders
              .filter((item) => item._id.toString().includes(search.toString()))
              .map((item, index) => (
                <tr key={index} className="even:bg-[#fdfdfd] odd:bg-[#e7e7e9]">
                  <td className="w-[5%] text-center px-4 truncate py-2 uppercase">
                    #{index + 1}
                  </td>
                  <td className="w-[15%] text-center px-4 truncate py-2">
                    {item._id}
                  </td>
                  <td className="w-[15%] text-center px-4 truncate py-2">
                    {item.datetime}
                  </td>
                  <td className="w-[20%] text-center px-4 truncate py-2">
                    {item.infoUser.fullname}
                  </td>
                  <td className="w-[15%] text-center px-4 truncate py-2">
                    {item.status}
                  </td>
                  <td className="w-[20%] text-center px-4 truncate py-2">
                    {item.paymentMethod}
                  </td>
                  <td className="w-[10%] px-4 truncate py-2">
                    <div className="flex items-center justify-center gap-2">
                      <div>
                        <button
                          onClick={() =>
                            dispatch(
                              detailOrder({ open: true, item: item._id })
                            )
                          }
                          className="p-1 rounded bg-violet-300 text-violet-700 hover:bg-violet-700 hover:text-white cursor-pointer transition-all duration-300 ease-linear"
                        >
                          <FaRegEye size={20} />
                        </button>
                        <div
                          className={`${
                            orders?.isDetailOrder.isOpen
                              ? "fixed top-0 right-0 left-0 bottom-0 bg-black/20 z-[999]"
                              : "hidden"
                          }`}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <DetailOrder />
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            dispatch(
                              updateOrder({ open: true, item: item._id })
                            )
                          }
                          className={`p-1 rounded bg-green-300 text-green-700 cursor-pointer hover:bg-green-700 hover:text-white transition-all duration-300 ease-linear ${item.status === "Đã giao hàng" || item.status === "Đã hủy" ? "hidden"  : "block"}`}
                        >
                          <FaRegEdit size={20} />
                        </button>
                        <div
                          className={`${
                            orders?.isUpdateOrder.isOpen
                              ? "fixed top-0 right-0 left-0 bottom-0 bg-black/20 z-[999]"
                              : "hidden"
                          }`}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <UpdateOrder />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrders;
