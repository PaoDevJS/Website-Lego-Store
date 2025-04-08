import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/ThemeContext";
import { useContext } from "react";

// react icons
import { FaShoppingCart, FaEye } from "react-icons/fa";

const Card = ({ props }) => {
  const fetchApiCreateCart = "http://localhost:8080/api/cart/create-cart";
  const { currentUser } = useContext(AppContext);

  // Định dạng tiền tệ VND
  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleBtnCreateCart = async () => {
    try {
      const result = await axios.post(fetchApiCreateCart, {
        productId: props._id,
        stock: 1,
        userId: currentUser.user._id,
      });
      toast.success(result.data);
    } catch (error) {
      toast.error(error.response?.data);
    }
  };
  return (
    <div className="w-[210px] h-[300px] border border-gray-200 rounded-md p-5 bg-white group cursor-pointer m-auto">
      {/* image */}
      <div className="h-[60%] w-full overflow-hidden relative cursor-pointer">
        <img
          src={`http://localhost:8080/${props.images[0]}`}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-[-50px] rounded-md text-black group-hover:bottom-2 transition-all duration-500 ease-in-out left-[50%] translate-x-[-50%] flex items-center gap-5 ">
          {currentUser.isUser === false ? (
            <Link to={"/customer/account/login"}>
              <FaShoppingCart size={18} />
            </Link>
          ) : (
            <button onClick={handleBtnCreateCart} className="cursor-pointer">
              <FaShoppingCart size={18} />
            </button>
          )}
          <Link to={`/product/product-detail/${props._id}`}>
            <FaEye size={18} />
          </Link>
        </div>
      </div>
      {/* info */}
      <div className="mt-3">
        <h3 className="truncate">{props.name}</h3>
        <p className="mt-3 text-[20px] text-red-600 font-[600]">
          {formatVND.format(props.price)}
        </p>
      </div>
    </div>
  );
};

export default Card;
