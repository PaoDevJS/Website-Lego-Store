import Card from "../utils/Card";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/ThemeContext";

// react icons
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
const AllItemProduct = () => {
  const fetchApiGetAllProducts =
    "http://localhost:8080/api/product/get-all-products";
  const [products, setProducts] = useState([]);
  const { searchBrand, searchCategory } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handlePrevPage = () => {
    if (page <= 1) {
      return;
    }
    setCount((p) => p - 10);
    setPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if((16*page) >= products.length)  {
      return
    }
    setCount((p) => p + 10);
    setPage((p) => p + 1);
  };

  useEffect(() => {
    const FetchApiGetAllProducts = async () => {
      try {
        const products = await axios.get(fetchApiGetAllProducts);
        setProducts(products.data.products);
      } catch (error) {
        console.log(error.response?.data || "Lỗi không xác định!");
      }
    };

    FetchApiGetAllProducts();
  }, []);
  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {products
          ?.filter((vail) => {
            const searchCat = searchCategory?.toLowerCase().trim() || "";
            const searchBr = searchBrand?.toLowerCase().trim() || "";
            return (
              (!searchCat ||
                vail.categories.toLowerCase().includes(searchCat)) &&
              (!searchBr || vail.brands.toLowerCase().includes(searchBr))
            );
          })
          .slice(count, 16 * page)
          .map((item, index) => (
            <div
              key={index}
              className="2xl:col-span-3 md:col-span-4 col-span-6"
            >
              <Card props={item} />
            </div>
          )) || "Không có sản phẩm nào!"}
      </div>
      <div className="flex items-center gap-5 justify-end mt-5">
        <button
          onClick={handlePrevPage}
          className={`text-gray-400 cursor-pointer hover:text-black transition-all duration-200 ease-in`}
        >
          <FaAngleDoubleLeft size={20} />
        </button>
        <h3 className="border border-gray-300 w-[70px] py-2 text-center rounded-md bg-white">
          {page}
        </h3>
        <button
          onClick={handleNextPage}
          className={`text-gray-400 cursor-pointer hover:text-black transition-all duration-200 ease-in`}
        >
          <FaAngleDoubleRight size={20} />
        </button>
      </div>
    </>
  );
};

export default AllItemProduct;
