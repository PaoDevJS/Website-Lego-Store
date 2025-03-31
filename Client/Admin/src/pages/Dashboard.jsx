import BarChart from "../hooks/ChartBar";

// react icons
import { FaChartPie } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div className="py-7 px-10">
      {/* title */}
      <div className="w-full bg-white py-4 px-7 rounded-md">
        <div className="flex items-center justify-between">
          <div className="Flex gap-3">
            <div className="border border-gray-300 text-gray-500 p-5 rounded-md">
              <FaChartPie size={30}/>
            </div>
            <div>
              <h2 className="text-[20px] font-[600] text-gray-700">Tổng quan</h2>
              <p className="text-gray-400 text-12">
                xem số lượng sản
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* info  */}
      <div className="w-full bg-white mt-7 rounded-md py-5 px-10 flex items-center justify-between">
        {/* dashboard product */}
        <div className="w-[150px] h-[100px] bg-orange-600 rounded-md border border-gray-300 p-4 text-center">
          <p className="text-2xl text-white font-[800]">230000</p>
          <h2 className="text-white mt-2">Sản phẩm</h2>
        </div>
        {/* dashboard user */}
        <div className="w-[150px] h-[100px] bg-green-600 rounded-md border border-gray-300 p-4 text-center">
          <p className="text-2xl text-white font-[800]">230000</p>
          <h2 className="text-white mt-2">Người dùng</h2>
        </div>
        {/* dashboard brand */}
        <div className="w-[150px] h-[100px] bg-red-600 rounded-md border border-gray-300 p-4 text-center">
          <p className="text-2xl text-white font-[800]">230000</p>
          <h2 className="text-white mt-2">Thương hiệu</h2>
        </div>
        {/* dashboard category */}
        <div className="w-[150px] h-[100px] bg-violet-600 rounded-md border border-gray-300 p-4 text-center">
          <p className="text-2xl text-white font-[800]">230000</p>
          <h2 className="text-white mt-2">Danh mục</h2>
        </div>
        {/* dashboard order */}
        <div className="w-[150px] h-[100px] bg-pink-600 rounded-md border border-gray-300 p-4 text-center">
          <p className="text-2xl text-white font-[800]">230000</p>
          <h2 className="text-white mt-2">Đơn hàng</h2>
        </div>
      </div>
      {/* chart */}
      <div className="w-full bg-white mt-7 rounded-md py-5 px-10">
          <div>
            <BarChart />
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
