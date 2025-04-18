import { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/ThemeContext";
import axios from "axios";
import { toast } from "react-toastify";

import { FaPlus, FaMinus } from "react-icons/fa";

const UpdateCart = () => {
  const [stock, setStock] = useState(1);
  const [product, setProduct] = useState({});
  const { setOpenCart, openCart, currentUser, setCurrentCart } =
    useContext(AppContext);
  /* btn giảm số lượng */
  const handleBtnMinus = () => {
    if (stock <= 1) return; // Không giảm nhỏ hơn 1
    setStock((prev) => prev - 1);
  };
  /* btn tăng số lượng */
  const handleBtnPlus = (stock) => {
    setStock((prev) => prev + stock);
  };
  const fetchApiGetCartOfUser = "http://localhost:8080/api/cart/get-carts-all";

  const isFetchApiGetCartOfUser = async () => {
    try {
      const result = await axios.get(fetchApiGetCartOfUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenSignIN")}`,
        },
      });
      setCurrentCart({
        carts: result.data,
        iscCart: true,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    isFetchApiGetCartOfUser();
  }, []);

  const fetchApiGetItemProductInCart =
    "http://localhost:8080/api/cart/get-item-cart";
  const fetchApiUpdateItemProductInCart =
    "http://localhost:8080/api/cart/update-item-cart";

  const isFetchData = async () => {
    try {
      const result = await axios.get(
        `${fetchApiGetItemProductInCart}/${openCart?.product}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenSignIN")}`,
          },
        }
      );
      setProduct(result.data[0]);
      setStock(result.data[0].quantity || 1);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if (openCart?.product) {
      isFetchData();
    }
  }, [openCart]);
  const handleBtnIsUpdateCart = async () => {
    try {
      const result = await axios.post(
        `${fetchApiUpdateItemProductInCart}/${openCart?.product}`,
        { stock, userId: currentUser.user._id }
      );
      setOpenCart({ isOpen: false, product: "" });
      isFetchApiGetCartOfUser();
      toast.success(result.data);
    } catch (error) {
      toast.error(error.response?.data);
    }
  };
  return (
    <div className="lg:w-[30%] w-[50%] min-h-[50%] bg-white rounded-md py-5 px-7 shadow-lg shadow-gray-300">
      <div>
        <img
          src={`http://localhost:8080/${product?.productId?.images[0]}`}
          alt=""
          className="w-[100px] h-[100px] rounded-full m-auto"
        />
        <h1 className="text-[18px] font-[600] text-center my-5">
          {product?.productId?.name}
        </h1>
        <div>
          <h2 className="text-[18px] font-[600]">Số lượng:</h2>
          <div className="flex items-center gap-3 mt-3">
            {/* btn giảm số lượng */}
            <button
              onClick={() => handleBtnMinus(1)}
              className="hover:bg-gray-300 p-1 disabled rounded-full transition-all duration-200 ease-linear cursor-pointer"
            >
              <FaMinus />
            </button>
            <input
              type="text"
              value={stock}
              onChange={(vail) => setStock(vail.target.value)}
              className="border border-gray-400 outline-none rounded-md py-2 px-4 w-full bg-gray-100 text-center"
            />
            {/* btn tăng số lượng */}
            <button
              onClick={() => handleBtnPlus(1)}
              className="hover:bg-gray-300 p-1 rounded-full transition-all duration-200 ease-linear cursor-pointer"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-10">
          <button
            onClick={() => setOpenCart({ isOpen: false, product: "" })}
            className="py-2 px-5 text-[16px] font-[600] cursor-pointer text-white rounded-md bg-gray-600"
          >
            Quay lại
          </button>
          <button
            onClick={handleBtnIsUpdateCart}
            className="py-2 px-5 text-[16px] font-[600] cursor-pointer text-white rounded-md bg-red-600"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCart;
