import Banner from "../components/Banner";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/ThemeContext";
import home from "../assets/images/home1.avif"
import Card from "../utils/Card";

// react icons
import { FaAngleRight } from "react-icons/fa"

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(6)
  const { setSearchCategory } = useContext(AppContext)
  const fetchApiGetAllCategories =
    "http://localhost:8080/api/category/get-all-categories";
  const fetchApiGetProductsAll =
    "http://localhost:8080/api/product/get-all-products";
  
  const isFetchApiGetAll = async () => {
    try {
      const [productsRes] = await Promise.all([
        axios.get(fetchApiGetProductsAll),
      ]);
      setProducts(productsRes.data.products || []);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error.response?.data || error.message);
    }
  }

  const FetchApiGetAllCategories = async () => {
    try {
      const decoded = await axios.get(fetchApiGetAllCategories);
      setCategories(decoded.data.categories);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await FetchApiGetAllCategories();
      await isFetchApiGetAll();
    };
    fetchData();
  }, []);

  return (
    <div className="container m-auto py-5 px-10">
      {/* categories & banner */}
      <div className="w-full max-h-[400px] flex gap-7 overflow-hidden rounded-md">
        <div className="lg:block xl:min-w-[25%] lg:min-w-[30%] 2xl:min-w-[20%] max-h-full overflow-hidden hidden rounded-md bg-white p-4">
          <ul className="flex flex-col gap-3">
            {categories?.map((item, index) => (
              <Link to={"/product/list-products"} key={index}>
                <li onClick={() => setSearchCategory(item.name)} className="hover:bg-[#e7e7e9] hover:text-red-600 transition-all duration-200 ease-in py-2 px-5 rounded-md font-[500] flex items-center justify-between">
                  {item.name} 
                  <FaAngleRight size={20}/>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="lg:min-w-[70%] xl:min-w-[75%] 2xl:min-w-[80%] overflow-hidden w-full bg-white">
          <Banner />
        </div>
      </div>
      {/* product hot */}
      <div className="bg-white w-full mt-7 p-10 rounded-md">
        <h1 className="font-[600] text-2xl uppercase text-center w-[30%] m-auto border-b border-gray-300 pb-5 ">Sản phẩm hot</h1>
        <div className="grid grid-cols-12 gap-7 mt-7">
          {
            products.slice(0, 6).map((item, index) => {
              return (
                <div key={index} className="2xl:col-span-2 lg:col-span-3 col-span-6">
                  <Card props={item}/>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* product hot */}
      <div className="bg-white w-full mt-7 p-10 rounded-md">
        <h1 className="font-[600] text-2xl uppercase text-center w-[30%] m-auto border-b border-gray-300 pb-5 ">Danh Sách Sản phẩm</h1>
        <div className="grid grid-cols-12 gap-7 mt-7">
          {
            products.slice(0, index).map((item, index) => {
              return (
                <div key={index} className="2xl:col-span-2 lg:col-span-3 col-span-6">
                  <Card props={item}/>
                </div>
              )
            })
          }
        </div>
        <button onClick={() => setIndex(prev => prev + 6)} className="py-3 px-7 rounded-full bg-red-600 text-[18px] font-[600] text-white mt-7 block m-auto cursor-pointer">Xem Thêm</button>
      </div>

      {/*  */}
      <div className="bg-white w-full mt-7 p-10 rounded-md">
        <div className="flex items-center lg:justify-around lg:flex-row flex-col">
          <div className="lg:w-[40%] w-full rounded-md overflow-hidden">
            <img src={home} alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="lg:w-[40%] w-full py-10">
            <h1 className="text-4xl font-[700] ">Chào mừng đến với LEGOWORLD STORE</h1>
            <p className="mt-5 text-[16px] text-gray-500">LEGOWORLD STORE chuyên cung cấp và phân phối đồ chơi LEGO chính hãng, mang đến cho bạn những bộ sưu tập mới nhất và thông tin cập nhật nhất về LEGO.</p>
            <div className="flex items-center justify-center mt-14 gap-10">
              <div>
                <h3 className="text-5xl font-[600] text-orange-400 text-center"> 150+ </h3>
                <p className="text-[16px] mt-3">Chất lượng đảm bảo</p>
              </div>
              <div>
                <h3 className="text-5xl font-[600] text-orange-400 text-center"> 15 </h3>
                <p className="text-[16px] mt-3">Khách hàng hài lòng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
