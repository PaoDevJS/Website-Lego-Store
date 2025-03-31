import { useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom"
import cart from "../assets/images/cart.webp"

// react icons
import { FaAngleRight } from "react-icons/fa";
import ListProductInCart from "../components/ListProductInCart";

const Cart = () => {
  const { currentCart, setCurrentCart, currentUser } = useContext(AppContext);
  console.log(currentCart)
  const fetchApiGetCartOfUser = "http://localhost:8000/api/cart/get-carts-all";
  
    const isFetchApiGetCartOfUser = useCallback(async () => {
      try {
        const result = await axios.get(fetchApiGetCartOfUser, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenSignIN")}`,
          },
        });
        setCurrentCart({
          carts: result.data,
          iscCart: true
        });
      } catch (error) {
        console.log(error.response?.data);
      }
    }, [setCurrentCart])
  
    useEffect(() => {
      if(currentUser.isUser === true) {
        isFetchApiGetCartOfUser();
      }
    }, []);
    
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
                  ({currentCart.carts?.length || 0}) Sản phẩm
                </p>
              }
            </div>
            <div className="m-4">
              {currentCart.carts && currentCart.carts.length > 0 ? (
                <ListProductInCart />
              ) : (
                <div className="lg:h-[50vh] flex items-center justify-center flex-col gap-4">
                  <img src={cart} alt="" className="w-[200px] h-[200px]" />
                  <h3 className="font-[600] text-[18px] leading-5">
                    Hiện giỏ hàng của bạn không có sản phẩm nào!
                  </h3>
                  <p className="text-gray-500">
                    Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!
                  </p>
                  <button className="py-3 px-4 hover:bg-black border rounded-md text-[16px] font-[500] hover:text-white transition duration-150 ease-in-out">
                    <Link to={"/"}>Mua sắm ngày</Link>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="lg:w-[33%] h-[30%] shadow-md shadow-gray-300 p-4 rounded-md bg-white">
            <div className="pb-2 border-b border-gray-300">
              <h1 className="text-[1.3125rem] font-[600]">
                Thông tin đơn hàng
              </h1>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-gray-300">
              <h1 className="font-[500]">Thông tin người nhận hàng</h1>
              <button className="flex items-center">
                Xem thông tin
                <FaAngleRight size={18} />
              </button>
            </div>

            <div>
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
