import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/ThemeContext";
// react icons
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5"

const SideBarProduct = () => {
  const [activeCategories, setActiveCategories] = useState(false);
  const [activeBrands, setActiveBrands] = useState(false);
  const [activeBl, setActiveBl] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const { setSearchCategory, setSearchBrand } = useContext(AppContext);

  const fetchApiGetAllCategories =
    "http://localhost:8080/api/category/get-all-categories";
  const fetchApiGetAllBrands = "http://localhost:8080/api/brand/get-all-brands";

  useEffect(() => {
    const FetchApiCategoriesAndBrands = async () => {
      try {
        const [categories, brands] = await Promise.all([
          axios.get(fetchApiGetAllCategories),
          axios.get(fetchApiGetAllBrands),
        ]);

        setCategories(categories.data.categories);
        setBrands(brands.data.brands);
      } catch (error) {
        console.log(error.response?.data || "Lỗi không xác định.");
      }
    };

    FetchApiCategoriesAndBrands();
  }, []);

  return (
    <>
      {/* mobile */}
      <div className="lg:block hidden">
        <div className="p-7 flex flex-col gap-5 bg-white">
          {/* categories */}
          <div
            className={`w-full ${activeCategories ? "max-h-[450px]" : null}`}
          >
            <div className="border-b border-gray-300 py-2">
              <button
                onClick={() => setActiveCategories(!activeCategories)}
                className="w-full flex items-center justify-between cursor-pointer"
              >
                <span className="text-[16px] font-[600] uppercase">
                  Danh mục
                </span>
                {activeCategories ? <FaAngleDown /> : <FaAngleUp />}
              </button>
            </div>
            <div
              className={`${
                activeCategories
                  ? "mt-3 h-[85%] overflow-hidden block"
                  : "hidden"
              }`}
            >
              <ul className="flex flex-col gap-3">
                {categories?.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="categories"
                      id={item._id}
                      value={item.name}
                      onChange={(vail) => setSearchCategory(vail.target.value)}
                    />
                    <label htmlFor={item._id} className="text-[16px]">
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brands */}
          <div className={`w-full ${activeBrands ? "max-h-[450px]" : null}`}>
            <div className="border-b border-gray-300 py-2">
              <button
                onClick={() => setActiveBrands(!activeBrands)}
                className="w-full flex items-center justify-between cursor-pointer"
              >
                <span className="text-[16px] font-[600] uppercase">
                  Thương hiệu
                </span>
                {activeBrands ? <FaAngleDown /> : <FaAngleUp />}
              </button>
            </div>
            <div
              className={`${
                activeBrands ? "mt-3 h-[85%] overflow-hidden block" : "hidden"
              }`}
            >
              <ul className="flex flex-col gap-3">
                {brands?.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="brand"
                      id={item._id}
                      value={item.name}
                      onChange={(vail) => setSearchBrand(vail.target.value)}
                    />
                    <label htmlFor={item._id} className="text-[16px]">
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* PC */}
      <div className="lg:hidden block">
        <div>
          {/* btn bo loc */}
          <div>
            <button
              onClick={() => setActiveBl(true)}
              className="bg-white font-[600] text-[18px] px-7 py-2 rounded-md cursor-pointer hover:bg-[#e7e7e9] hover:text-red-600 transition-all duration-200 ease-in"
            >
              Bộ lọc
            </button>
          </div>
          {/*  list bo loc */}
          <div className={`${activeBl === false ? "left-[-100%]" : "left-0"} lg:hidden fixed top-0 md:w-[40%] w-[60%] h-full bottom-0 bg-white z-50 py-10 px-10 shadow-lg shadow-gray-400 rounded-br-md transition-all duration-500 ease-linear`}>
            <div>
              <button onClick={() => setActiveBl(false)} className="absolute top-2 right-2 cursor-pointer text-gray-300 hover:text-gray-500 transition-all duration-200 ease-in">
                <IoClose size={20} />
              </button>
              <div>
                <h1 className="text-[20px] font-[700] uppercase p-2 text-center">Bộ lọc sản phẩm</h1>
              </div>
              <div className="my-7 flex flex-col gap-5">
                {/* categories */}
                <div
                  className={`w-full ${
                    activeCategories ? "max-h-[450px]" : null
                  }`}
                >
                  <div className="border-b border-gray-300 p-2">
                    <button
                      onClick={() => setActiveCategories(!activeCategories)}
                      className="w-full flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-[16px] font-[600] uppercase">
                        Danh mục
                      </span>
                      {activeCategories ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </div>
                  <div
                    className={`${
                      activeCategories
                        ? "mt-3 h-[85%] overflow-hidden block"
                        : "hidden"
                    }`}
                  >
                    <ul className="flex flex-col gap-3">
                      {categories?.map((item, index) => (
                        <li
                          key={index}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <input
                            type="radio"
                            name="categories"
                            id={item._id}
                            value={item.name}
                            onChange={(vail) =>
                              setSearchCategory(vail.target.value)
                            }
                          />
                          <label htmlFor={item._id} className="text-[16px]">
                            {item.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Brands */}
                <div
                  className={`w-full ${activeBrands ? "max-h-[450px]" : null}`}
                >
                  <div className="border-b border-gray-300 p-2">
                    <button
                      onClick={() => setActiveBrands(!activeBrands)}
                      className="w-full flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-[16px] font-[600] uppercase">
                        Thương hiệu
                      </span>
                      {activeBrands ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </div>
                  <div
                    className={`${
                      activeBrands
                        ? "mt-3 h-[85%] overflow-hidden block"
                        : "hidden"
                    }`}
                  >
                    <ul className="flex flex-col gap-3">
                      {brands?.map((item, index) => (
                        <li
                          key={index}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <input
                            type="radio"
                            name="brand"
                            id={item._id}
                            value={item.name}
                            onChange={(vail) => setSearchBrand(vail.target.value)}
                          />
                          <label htmlFor={item._id} className="text-[16px]">
                            {item.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarProduct;
