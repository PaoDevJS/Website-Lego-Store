import Card from "../utils/Card";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

const AllItemProduct = () => {
  const fetchApiGetAllProducts =
    "http://localhost:8000/api/product/get-all-products";
  const [products, setProducts] = useState([]);
  const { searchBrand, searchCategory } = useContext(AppContext);

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
    <div className="grid grid-cols-12 gap-5">
      {products
        ?.filter((vail) => {
          const searchCat = searchCategory?.toLowerCase().trim() || "";
          const searchBr = searchBrand?.toLowerCase().trim() || "";
          return (
            (!searchCat || vail.categories.toLowerCase().includes(searchCat)) &&
            (!searchBr || vail.brands.toLowerCase().includes(searchBr))
          );
        })
        .map((item, index) => (
          <div key={index} className="2xl:col-span-3 md:col-span-4 col-span-6">
            <Card props={item} />
          </div>
        )) || "Không có sản phẩm nào!"}
    </div>
  );
};

export default AllItemProduct;
