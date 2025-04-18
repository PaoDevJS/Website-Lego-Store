import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

// react icons
import ListProductInCart from "../components/listProductToCarts";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const { currentCart } = useContext(AppContext);

  const formatMoney = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  
  useEffect(() => {
    const isTolaAmount = () => {
      console.log("carts", currentCart)
      const prices =
        currentCart?.products.map((item) => {
          return item.productId.price * item.quantity;
        }) || [];

      const amount = prices.reduce((a, b) => a + b, 0);
      setTotalAmount(amount);
    };

      isTolaAmount();
  }, [currentCart]);
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
                  ({currentCart?.products || 0}) Sản phẩm
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
                  Tạm tính ( {currentCart?.products || 0} sản phẩm )
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
              <Link
                to={`/order-checkout`}
                className="w-[80%] bg-red-600 text-white block m-auto py-3 text-[18px] font-[700] uppercase rounded-md hover:opacity-80 cursor-pointer transition-all duration-300 ease-linear text-center"
              >
                Mua hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
