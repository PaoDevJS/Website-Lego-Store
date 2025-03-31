import { useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/ThemeContext";

// react icons
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ListProductInCart = () => {
  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const { currentCart, setCurrentCart, currentUser, setOpenCart } = useContext(AppContext)
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
      isFetchApiGetCartOfUser();
    }, []);
  

  const fetchApiDeleteItemInTheCart =
    "http://localhost:8000/api/cart/delete-item-cart";

  const handleBtnDeleteItemInTheCart = useCallback(async (id) => {
    try {
      const result = await axios.post(
        `${fetchApiDeleteItemInTheCart}/${id}`, {userId: currentUser.user._id});
      toast.success(result.data);
      isFetchApiGetCartOfUser()
    } catch (error) {
      toast.error(error.response?.data);
      console.log(error.response?.data)
    }
  }, []);

  return (
    <div className="w-full max-h-[70vh] mt-7 rounded-md overflow-hidden">
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="w-[45%] py-2 px-4 font-[400]">Sản Phẩm</th>
            <th className="w-[15%] py-2 px-4 font-[400]">Đơn Giá</th>
            <th className="w-[10%] py-2 px-4 font-[400]">Số Lượng</th>
            <th className="w-[15%] py-2 px-4 font-[400]">Số Tiền</th>
            <th className="w-[15%] py-2 px-4 font-[400]">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {currentCart.carts?.map((item, index) => (
            <tr key={index} className="even:bg-[#fdfdfd] odd:bg-[#e7e7e9]">
              <td className="w-[45%] py-2 px-4">
                <div className="flex gap-5">
                  <img
                    src={`http://localhost:8000/${item.productId.images[0]}`}
                    alt=""
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="">{item.productId.name}</h3>
                    <p></p>
                  </div>
                </div>
              </td>
              <td className="w-[15%] py-2 px-4">
                <p className="text-red-500 font-[500] flex justify-center whitespace-normal items-center gap-1">
                  {formatVND.format(item.productId.price)}
                </p>
              </td>
              <td className="w-[10%] py-2 px-4 text-center">
                <p className="text-gray-500">
                  {" "}
                  <span>x</span>
                  {item.quantity}
                </p>
              </td>
              <td className="w-[15%] py-2 px-4">
                <p className="text-red-500 font-[500] flex justify-center whitespace-normal items-center gap-1">
                  {formatVND.format(item.productId.price * item.quantity)}
                </p>
              </td>
              <td className="w-[15%] py-2 px-4">
                <div className="flex items-center justify-center gap-5">
                  <button onClick={() => setOpenCart(true) } className="bg-green-300 cursor-pointer text-green-600 rounded-md p-2 hover:bg-green-600 hover:text-white">
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleBtnDeleteItemInTheCart(item._id)}
                    className="bg-red-300 cursor-pointer text-red-600 rounded-md p-2 hover:bg-red-600 hover:text-white"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProductInCart;
