import { useSelector, useDispatch } from "react-redux";
import { detailOrder } from "../../redux/reducer/orderSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailOrder = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  const orders = useSelector((state) => state.Order);
  const formatMoney = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  });

  const fetchGetOrderItem = "http://localhost:8080/api/order/get-order-item";
  const isFetchData = async () => {
    try {
      const result = await axios.get(
        `${fetchGetOrderItem}/${orders.isDetailOrder.item}`
      );
      setOrder(result.data);
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  useEffect(() => {
    isFetchData();
  }, [orders]);

  return (
    <div className="bg-white py-5 px-10 rounded-md w-[70%] max-h-[90%]">
      <h1 className="text-center text-xl font-[600] uppercase">
        Chi tiết đơn hàng
      </h1>
      <div className="mt-5 flex gap-5">
        {/* left */}
        <div className="w-[65%]">
          {/* top */}
          <div className="bg-[#f2f2f2] py-2 px-5 rounded flex items-center justify-between border border-gray-300">
            <div>
              <h3 className="font-[500] text-[16px]">Đơn hàng: {order._id}</h3>
              <p className="mt-2 text-gray-500">{order.datetime}</p>
            </div>
            <div className="bg-green-600 py-2 px-4 rounded-md font-[500] text-white">
              {order.status}
            </div>
          </div>
          {/* center */}
          <div className="mt-5 flex justify-between gap-5">
            <div className="border border-gray-300 min-w-[40%] rounded-md overflow-hidden">
              <h1 className="bg-[#f2f2f2] py-2 px-4 uppercase font-[500] text-gray-500">
                Khách hàng
              </h1>
              <div className="py-2 px-4">
                <h4 className="font-[600] text-[16px]">
                  {order?.user_id?.firstName + " " + order?.user_id?.lastName}
                </h4>
                <p className="text-gray-500">{order?.user_id?.email}</p>
              </div>
            </div>
            <div className="border border-gray-300 w-[55%] rounded-md overflow-hidden">
              <h1 className="bg-[#f2f2f2] py-2 px-4 uppercase font-[500] text-gray-500">
                Người nhận
              </h1>
              <div className="py-2 px-4">
                <h4 className="font-[600] text-[16px]">
                  {order.infoUser?.fullname}
                </h4>
                <p className="text-gray-500">{order?.infoUser?.phone}</p>
                <p className="text-gray-500">{order.infoUser?.address}</p>
              </div>
            </div>
          </div>
          {/* bottom */}
          <div className="w-full max-h-[350px] mt-5 overflow-y-scroll border border-gray-300 rounded p-3">
            <table className="table-fixed w-full rounded overflow-hidden">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="py-2 w-[45%]">Tên sản phẩm</th>
                  <th className="py-2 w-[15%]">Số lượng</th>
                  <th className="py-2 w-[20%]">Đơn giá</th>
                  <th className="py-2 w-[20%]">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((item, index) => (
                  <tr
                    key={index}
                    className="even:bg-[#fdfdfd] odd:bg-[#e7e7e9]"
                  >
                    <td className="py-2 px-4 truncate text-center">
                      {item.product.name}
                    </td>
                    <td className="py-2 px-4 truncate text-center">
                      x{item.quantity}
                    </td>
                    <td className="py-2 px-4 truncate text-center">
                      {item.product.price}
                    </td>
                    <td className="py-2 px-4 truncate text-center">
                      {formatMoney.format(item.quantity * item.product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* right */}
        <div className="w-[35%] flex flex-col justify-between">
          <div>
            <div className="bg-white border border-gray-300 rounded overflow-hidden text-center">
              <h3 className="bg-[#f2f2f2] uppercase p-3 font-[500] text-gray-600 border-b border-gray-300">
                Phương thức thanh toán
              </h3>
              <p className="p-3 font-[700] text-pink-600 text-xl">
                {order.paymentMethod}
              </p>
            </div>
            <div className="bg-white border border-gray-300 mt-4 p-5 rounded">
              <div>
                <div className="flex items-center justify-between text-gray-600 font-[500]">
                  <p>Tạm tính</p>
                  <p className="text-black">
                    {formatMoney.format(order.totalAmount)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-gray-600 font-[500] my-2">
                  <p>Phí vận chuyển</p>
                  <p className="text-green-600">Miễn phí</p>
                </div>
                <div className="flex items-center justify-between text-gray-600 font-[500]">
                  <p>Thành tiền</p>
                  <p className="text-black">
                    {formatMoney.format(order.totalAmount)}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-300 mt-10 pt-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-[500] text-[18px] text-gray-700">
                      Cần thanh toán
                    </h3>
                    <p className="text-center text-gray-500">
                      ({order.products?.length || 0} sản phẩm)
                    </p>
                  </div>
                  <h1 className="text-xl font-[600] text-red-700">
                    {formatMoney.format(order.totalAmount)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-7">
            <button
              onClick={() => dispatch(detailOrder({ open: false, item: "" }))}
              className="bg-red-600 w-full text-[16px] py-2 rounded font-[600] text-white cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
