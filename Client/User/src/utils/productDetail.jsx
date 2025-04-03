import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import Card from "../utils/Card";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../Context/ThemeContext";
import { toast } from "react-toastify";

// React icons
import {
  FaCheck,
  FaPlus,
  FaMinus
} from "react-icons/fa";

const ProductDetail = () => {
  const { currentUser } = useContext(AppContext);
  const [stock, setStock] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const id = useLocation().pathname.split("/")[3];

  // Định dạng tiền tệ VND
  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  {
    /* btn giảm số lượng */
  }
  const handleBtnMinus = () => {
    if (stock <= 1) return; // Không giảm nhỏ hơn 1
    setStock((prev) => prev - 1);
  };
  {
    /* btn tăng số lượng */
  }
  const handleBtnPlus = (stock) => {
    setStock((prev) => prev + stock);
  };

  const fetchAptGetItemProduct =
    "http://localhost:8080/api/product/get-item-product";
  const fetchApiGetProductsAll =
    "http://localhost:8080/api/product/get-all-products";
  const fetchApiCreateCart = "http://localhost:8080/api/cart/create-cart";

  const isFetchApiGetAll = async () => {
    try {
      const productsRes = await axios.get(fetchApiGetProductsAll)
  
      setProducts(productsRes.data.products || []);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error.response?.data || error.message);
    }
  }

  const isFetchApiGetItemProduct = async () => {
    try {
      const productRes = await axios.get(`${fetchAptGetItemProduct}/${id}`)
  
      setProduct(productRes.data.itemProduct || {});
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    const isFetchData = async () => {
      await isFetchApiGetItemProduct()
      await isFetchApiGetAll()
    }

    isFetchData()
  }, [id]);

  const handleBtnCreateCart = async () => {
    if (!currentUser || !currentUser.user) {
      toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }

    try {
      const result = await axios.post(fetchApiCreateCart, {
        productId: product._id,
        stock,
        userId: currentUser.user._id,
      });
      toast.success(result.data);
      setStock(1)
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  return (
    <div className="container m-auto py-5 px-10">
      <div className="flex lg:justify-between gap-7 lg:flex-row flex-col">
        {/* left --> images */}
        <div>
          <div className="h-[500px] w-full 2xl:w-[800px] lg:w-[550px] rounded-md overflow-hidden bg-white p-5">
            {product.images && product.images.length > 0 ? (
              <img src={`http://localhost:8080/${product.images[currentIndex]}`} alt="Product" className=" w-full object-fill"/>
            ) : (
              <p>Đang tải hình ảnh...</p>
            )}
          </div>

          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-center gap-7 mt-5">
              {
                product.images?.map((item, index) => {
                  return (
                    <button onClick={() => setCurrentIndex(index)} key={index} className={`w-[100px] h-[100px] ${currentIndex === index ? "border rounded-md overflow-hidden p-1 border-red-400" : " border-none rounded-md overflow-hidden p-1"} `}>
                      <img src={`http://localhost:8080/${item}`} alt="" className="w-full h-full object-cover"/>
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>

        {/* right --> info product */}
        <div className="2xl:w-[600px] lg:w-[400px] w-full p-4 rounded-md bg-white">
          <div>
            {/* title */}
            <div>
              <h1 className="text-[22px] font-[600]">{product.name}</h1>
              <h3 className="text-[22px] text-red-600 my-5 font-[600]">
                {formatVND.format(product.price)}
              </h3>
            </div>
            {/* service */}
            <ul>
              <li className="flex items-center gap-3 text-gray-700">
                {" "}
                <FaCheck size={14} />{" "}
                <span className="text-[16px]">Hàng chính hãng</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                {" "}
                <FaCheck size={14} />{" "}
                <span className="text-[16px]">
                  Miễn phí giao hàng toàn quốc{" "}
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                {" "}
                <FaCheck size={14} />{" "}
                <span className="text-[16px]">Giao hàng hỏa tốc</span>
              </li>
            </ul>
            {/* số lượng hàng mua */}
            <div className="mt-7">
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

            {/* thêm giao giỏi hàng */}
            <div className="mt-10">
              {currentUser.isUser === false ? (
                <Link to={"/customer/account/login"}>
                  <button className="w-[70%] m-auto block py-2 rounded-md cursor-pointer text-[18px] font-[600] text-white bg-red-700 hover:opacity-80 transition-all duration-200 ease-linear">
                    Thêm vào giỏ hàng
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleBtnCreateCart}
                  className="w-[70%] m-auto block py-2 rounded-md cursor-pointer text-[18px] font-[600] text-white bg-red-700 hover:opacity-80 transition-all duration-200 ease-linear"
                >
                  Thêm vào giỏ hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* description product */}
      <div className="bg-white p-5 rounded-md mt-7">
        <h1 className="text-[22px] font-[600] uppercase">Mô tả sản phẩm</h1>
        <h3 className="text-[18px] font-[600] leading-12">{product.name}</h3>
        <p>{product.desc}</p>
      </div>

      {/* các sản phẩm liên quan */}
      <div className="mt-7 bg-white p-5 rounded-md uppercase">
        <h1 className="text-xl font-[600]">Sản phẩm liên quan</h1>

        {/* list product */}
        <div className="mt-5 flex gap-7 overflow-x-scroll py-3">
          {products?.filter(
              (vail) =>
                vail.brands === product.brands &&
                vail._id !== product._id
            )
            .map((item, index) => {
              return (
                <Link key={index} to={`/product/product-detail/${item._id}`}>
                  <Card props={item} key={index} />
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
