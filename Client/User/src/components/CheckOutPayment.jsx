import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios"
import { infoOrder } from "../redux/slice/cartSlice";
import { toast } from "react-toastify";

const CheckOutPayment = () => {
  const order = useSelector((state) => state.Cart);
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [infoUser, setInfoUser] = useState({
        fullname: "",
        phone: "",
        address: ""
    })
  const [totalAmount, setTotalAmount] = useState(null);
  const formatMoney = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const listProducts = () => {
      const items = order?.carts.products?.map((item) => {
        return {
          product: item.productId._id,
          quantity: item.quantity
        };
      }) || []

      setProducts(items)
    } 
    listProducts()
  }, [order?.carts.products]) 

  useEffect(() => {
    const isTolaAmount = () => {
      const prices =
        order?.carts.products?.map((item) => {
          return item.productId.price * item.quantity;
        }) || [];

      const amount = prices.reduce((a, b) => a + b, 0);
      setTotalAmount(amount);
    };
    isTolaAmount();
  }, [order?.carts.products]);

  const handleChangeInfoUser = vail => {
    setInfoUser(p => ({...p, [vail.target.name]: vail.target.value}))
  }
  const datetime = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  const dataForm = {
    products,
    infoUser,
    totalAmount,
    datetime,
    userId: order?.carts.userId,
    cartId: order?.carts._id
  }
  const fetchApiCreateOrder = "http://localhost:8080/api/order/create-order"

  const handleCreateOrder = async () => {
    try {
        const result = await axios.post(fetchApiCreateOrder, dataForm)
        dispatch(infoOrder(result.data))
        window.location.href = result.data.payUrl
    } catch (error) {
        toast.error(error.response?.data.message)
    }
  };
  return (
    <div className="container m-auto py-5 px-10">
      {/* TOP */}
      <div className="bg-white py-4 px-7 rounded-md">
        <div className="flex items-center">
          <h1 className="font-[900] text-red-600 text-4xl uppercase">
            LEGOWORLD<span className="text-lg">store</span>
          </h1>
          <h3 className="text-xl font-[700] uppercase text-red-600">
            Thanh Toán
          </h3>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="mt-7 flex justify-between gap-10">
        {/* left */}
        <div className="w-[50%] h-full bg-white py-5 px-10 rounded-md">
          <h1 className="text-lg font-[700] uppercase text-gray-500 pb-3 border-b border-gray-300 px-2">
            Thông tin người nhận
          </h1>
          <div className="py-5 px-2">
            <div className="flex items-center justify-between">
              <div className="w-[45%]">
                <h3 className="font-[500] text-[16px] ml-1 text-gray-600">Tên người nhận:</h3>
                <input type="text" onChange={handleChangeInfoUser} name="fullname" placeholder="Nhập tên người nhận..." className="border border-gray-300 rounded-md mt-2 py-3 px-4 w-full outline-none placeholder:font-[600]" />
              </div>
              <div className="w-[45%]">
                <h3 className="font-[500] text-[16px] ml-1 text-gray-600">Số điện thoại:</h3>
                <input type="text" onChange={handleChangeInfoUser} name="phone" placeholder="Nhập số điện thoại..." className="border border-gray-300 rounded-md mt-2 py-3 px-4 w-full outline-none placeholder:font-[600]" />
              </div>
            </div>
            <div className="mt-5">
              <h3 className="font-[500] text-[16px] ml-1 text-gray-600">
                Địa chỉ người nhận:
              </h3>
              <input type="text" onChange={handleChangeInfoUser} name="address" placeholder="Nhập địa chỉ người nhận..." className="border border-gray-300 rounded-md mt-2 py-3 px-4 w-full outline-none placeholder:font-[600]" />
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-[50%] h-full bg-white py-5 px-10 rounded-md">
          <h2 className="text-center font-[700] text-xl uppercase pb-4 border-b border-gray-300 text-gray-500">
            Đơn hàng của bạn
          </h2>
          <div className="py-3">
            <table className="table-fixed w-full rounded-md overflow-hidden">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="w-[70%] py-2 uppercase border">Sản phẩm</th>
                  <th className="w-[30%] py-2 uppercase border">Tạm tính</th>
                </tr>
              </thead>
              <tbody>
                {order?.carts.products?.map((item, index) => (
                  <tr key={index}>
                    <td className="w-[70%] py-2 px-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={`http://localhost:8080/${item.productId.images[0]}`}
                          alt=""
                          className="w-[70px] h-[70px] rounded-md border border-gray-200"
                        />
                        <div>
                          <h2>{item.productId.name}</h2>
                          <p className="mt-2">Số lượng: x{item.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="w-[30%] py-2 px-4 text-center font-[500] text-[16px] text-red-600">
                      {formatMoney.format(item.quantity * item.productId.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-b border-gray-300">
            <div className="flex items-center justify-between text-[16px] font-[500] text-gray-500">
              <h3>Tạm tính:</h3>
              <p>{formatMoney.format(totalAmount)}</p>
            </div>
            <div className="mt-2 flex items-center text-xl justify-between font-[700]">
              <h3>Tổng:</h3>
              <p className="text-red-600">{formatMoney.format(totalAmount)}</p>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="py-3 w-[40%] bg-red-600 text-white m-auto block mt-10 rounded-md cursor-pointer text-lg font-[700] uppercase hover:opacity-85 transition-all duration-300 ease-linear"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPayment;
