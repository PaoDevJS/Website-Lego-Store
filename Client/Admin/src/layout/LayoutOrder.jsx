import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../redux/reducer/orderSlice";

const listOrdersMenu = [
  { title: "Danh sách đơn hàng", path: "/don-hang/danh-sach-don-hang" },
  { title: "Chờ xử lý", path: "/don-hang/don-hang-cho-xu-ly" },
  { title: "Vận chuyển", path: "/don-hang/don-hang-van-chuyen" },
  { title: "Hoàn thành", path: "/don-hang/don-hang-hoan-thanh" },
  { title: "Đơn hàng đã hủy", path: "/don-hang/don-hang-da-huy" },
];

const LayoutOrder = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const order = useSelector((state) => state.Order.isUpdateOrder);
  const fetchGetOrdersAll = "http://localhost:8080/api/order/get-orders-all";

  const isFetchData = async () => {
    try {
      const result = await axios.get(fetchGetOrdersAll);
      console.log(result.data);
      dispatch(listOrders(result.data));
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  useEffect(() => {
    isFetchData();
  }, [order?.orderId]);
  return (
    <div className="w-full h-full py-5 px-10">
      <div className="bg-white w-full h-full rounded-md py-3 px-7">
        <ul className="flex items-center gap-10">
          {listOrdersMenu.map((item, index) => (
            <Link key={index} to={item.path}>
              <li
                className={`px-4 py-2 font-[500] ${
                  path === item.path
                    ? "border-b-2 border-red-600 text-red-600 text-[16px]"
                    : ""
                }`}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>

        <div className="w-full h-[90%] mt-5 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutOrder;
