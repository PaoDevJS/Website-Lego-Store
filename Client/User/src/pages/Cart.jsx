import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listCart, startCart } from "../redux/slice/cartSlice";
import axios from "axios";
import ListProductInCart from "../components/listProductToCarts";
import { AppContext } from "../Context/ThemeContext";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart);
  const [totalAmount, setTotalAmount] = useState(null);
  const { openCart } = useContext(AppContext);
  const formatMoney = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const fetchApiGetCartOfUser = "http://localhost:8080/api/cart/get-carts-all";

  const isFetchApiGetCartOfUser = async () => {
    try {
      const result = await axios.get(fetchApiGetCartOfUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenSignIN")}`,
        },
      });
      dispatch(listCart(result.data));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const isTolaAmount = () => {
    const prices =
      cart?.carts?.products?.map((item) => {
        return item.productId.price * item.quantity;
      }) || [];

    const amount = prices.reduce((a, b) => a + b, 0);
    setTotalAmount(amount);
  };

  useEffect(() => {
    if(localStorage.getItem("tokenSignIN")) {
      isFetchApiGetCartOfUser();
      dispatch(startCart())
    }
  }, [openCart?.product]);

  useEffect(() => {
    isTolaAmount()
  }, [cart?.carts?.products]);

  return (
    <div className="p-10">
      <div className="container m-auto">
        <div className="flex justify-between lg:flex-row flex-col lg:gap-0 gap-7">
          {/* List Product */}
          <div className="lg:w-[65%] w-full shadow-md shadow-gray-300 rounded-md p-4 bg-white">
            <div className="p-3 border-b border-gray-400 flex items-center justify-between">
              <h1 className="text-xl font-bold uppercase">Giỏ hàng</h1>
              {
                <p className="py-1 border-b text-[16px] text-gray-600 border-gray-400">
                  ({cart?.carts?.products?.length || 0}) Sản phẩm
                </p>
              }
            </div>
            <div className="m-4">
              <ListProductInCart />
            </div>
          </div>
          {/* Thông tin đơn hàng */}
          <div className="lg:w-[33%] h-[30%] shadow-md shadow-gray-300 p-5 rounded-md bg-white">
            <div className="pb-2 border-b border-gray-300">
              <h1 className="text-[1.3125rem] font-[600] uppercase">
                Cộng giỏ hàng
              </h1>
            </div>
            <div className="p-5 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-[600] text-[16px]">
                  Tạm tính ( {cart?.carts?.products?.length || 0} sản phẩm )
                </h3>
                <p className="text-gray-500 font-[600] text-[16px]">
                  {formatMoney.format(totalAmount || 0)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <h3 className="text-gray-500 font-[600] text-[16px]">
                  Tổng cộng
                </h3>
                <p className="text-gray-500 font-[600] text-[16px]">
                  {formatMoney.format(totalAmount || 0)}
                </p>
              </div>
            </div>

            <div className="mt-5">
              {cart?.carts?.products?.length > 0 ? (
                <Link
                  to={`/order-checkout?amount=${totalAmount}&&order=${cart?.carts._id}`}
                  className="w-[80%] bg-red-600 text-white block m-auto py-3 text-[18px] font-[700] uppercase rounded-md hover:opacity-80 cursor-pointer transition-all duration-300 ease-linear text-center"
                >
                  Mua hàng
                </Link>
              ) : (
                <button className="w-[80%] bg-red-600 text-white block m-auto py-3 text-[18px] font-[700] uppercase rounded-md hover:opacity-80 cursor-pointer transition-all duration-300 ease-linear text-center">
                  Mua hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
