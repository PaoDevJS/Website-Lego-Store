import { useEffect, useState } from "react";
import axios from "axios";
import upload from "../assets/upload.webp";
import { toast } from "react-toastify";

// react icons
import { IoClose } from "react-icons/io5";

const FormDataAddProduct = () => {
  const message = "Vui lòng không để trống trường này.";
  // check name product
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [messName, setMessName] = useState("");
  const formatVND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  });

  const checkNameProduct = () => {
    if (!name) {
      setErrName(true);
      setMessName(message);
      return;
    }
    setErrName(false);
    setMessName(false);
  };

  // check desc product
  const [desc, setDesc] = useState("");
  const [errDesc, setErrDesc] = useState(false);
  const [messDesc, setMessDesc] = useState("");

  const checkDescProduct = () => {
    if (!desc) {
      setErrDesc(true);
      setMessDesc(message);
      return;
    }

    setErrDesc(false);
    setMessDesc(false);
  };

  // check price product
  const [price, setPrice] = useState("");
  const [errPrice, setErrPrice] = useState(false);
  const [messPrice, setMessPrice] = useState("");

  const checkPriceProduct = () => {
    if (!price) {
      setErrPrice(true);
      setMessPrice(message);
      return;
    }

    setErrPrice(false);
    setMessPrice(false);
  };

  // check stock product
  const [stock, setStock] = useState("");
  const [errStock, setErrStock] = useState(false);
  const [messStock, setMessStock] = useState("");

  const checkStockProduct = () => {
    if (!stock) {
      setErrStock(true);
      setMessStock(message);
      return;
    }

    setErrStock(false);
    setMessStock(false);
  };

  // check category product
  const [category, setCategory] = useState("");
  const [errCategory, setErrCategory] = useState(false);
  const [messCategory, setMessCategory] = useState("");
  const checkCategoryProduct = () => {
    if (category.length < 0) {
      setErrCategory(true);
      setMessCategory(message);
      return;
    }

    setErrCategory(false);
    setMessCategory(false);
  };

  // check brand product
  const [brand, setBrand] = useState("");
  const [errBrand, setErrBrand] = useState(false);
  const [messBrand, setMessBrand] = useState("");

  const checkBrandProduct = () => {
    if (brand.length < 0) {
      setErrBrand(true);
      setMessBrand(message);
      return;
    }

    setErrBrand(false);
    setMessBrand(false);
  };

  // check image product
  const [image, setImage] = useState([]);
  const [errImage, setErrImage] = useState(false);
  const [messImage, setMessImage] = useState("");
  const handleRemoveItemImage = (key) => {
    setImage(image.filter((vail, index) => index != key));
  };

  const checkImageProduct = () => {
    if (image.length < 0) {
      setErrImage(true);
      setMessImage(message);
      return;
    }

    setErrImage(false);
    setMessImage(false);
  };

  // fetch api get danh muc & thuong hieu
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const UrlApiGetAllCategories =
    "http://localhost:8080/api/category/get-all-categories";
  const urlApiGetAllBrands = "http://localhost:8080/api/brand/get-all-brands";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axios.get(UrlApiGetAllCategories),
          axios.get(urlApiGetAllBrands),
        ]);
        setCategories(categoriesRes.data.categories);
        setBrands(brandsRes.data.brands);
      } catch (error) {
        console.log(error.response?.data || "Lỗi không xác định");
      }
    };
    fetchData();
  }, []);

  // Send to server
  const fetchApiPostCreateProduct =
    "http://localhost:8080/api/product/add-product";

  const myFormData = new FormData();
  myFormData.append("name", name);
  myFormData.append("desc", desc);
  myFormData.append("price", price);
  myFormData.append("stock", stock);
  myFormData.append("categories", category);
  myFormData.append("brands", brand);
  for (let i = 0; i < image.length; i++) {
    myFormData.append("upload_files_product", image[i]);
  }

  const postCreateProduct = async () => {
    try {
      const decode = await axios.post(fetchApiPostCreateProduct, myFormData);
      setName("");
      setDesc("");
      setPrice("");
      setStock("");
      setCategory([]);
      setBrand([]);
      setImage([]);
      toast.success(decode.data.message);
    } catch (error) {
      const err = error.response.data;
      if (err.message === "Vui lòng không để trống trường này.") return true;

      toast.error(err.message);
    }
  };

  const handlePostCreateProduct = (e) => {
    e.preventDefault();
    checkNameProduct();
    checkDescProduct();
    checkPriceProduct();
    checkStockProduct();
    checkCategoryProduct();
    checkBrandProduct();
    checkImageProduct();

    postCreateProduct();
  };

  return (
    <div className="mt-10 w-[60%] m-auto">
      <form>
        <h1 className="text-18 font-[700] text-center text-gray-500 uppercase">
          Thêm sản phẩm mới
        </h1>
        <div className="Flex gap-5 mt-10">
          <label
            htmlFor="name"
            className="min-w-[20%] text-16 font-[500] text-gray-600"
          >
            Tên sản phẩm:
          </label>
          <div className="min-w-[80%] relative">
            <input
              type="text"
              value={name}
              onChange={(vail) => setName(vail.target.value.trim())}
              id="name"
              placeholder="Nhập tên sản phẩm tại đây..."
              className={`border w-full py-3 px-5 rounded-md outline-none ${
                errName
                  ? "border-red-600 placeholder:text-red-600"
                  : "border-gray-300"
              }`}
              required
            />
            <small
              className={`${
                errName
                  ? "absolute left-0 bottom-[-20px] text-red-600"
                  : "hidden"
              }`}
            >
              {messName}
            </small>
          </div>
        </div>
        {/* description */}
        <div className="flex gap-5 mt-10">
          <label
            htmlFor="name"
            className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
          >
            Mô tả sản phẩm:
          </label>
          <div className="min-w-[80%] relative">
            <textarea
              value={desc}
              onChange={(vail) => setDesc(vail.target.value)}
              id="name"
              placeholder="Nhập thể loại tại đây..."
              className={`border w-full py-3 px-5 h-[250px] rounded-md outline-none ${
                errDesc
                  ? "border-red-600 placeholder:text-red-600"
                  : "border-gray-300"
              }`}
              required
            />
            <small
              className={`${
                errDesc
                  ? "absolute left-0 bottom-[-20px] text-red-600"
                  : "hidden"
              }`}
            >
              {messDesc}
            </small>
          </div>
        </div>
        {/* price */}
        <div className="Flex gap-5 mt-10">
          <label
            htmlFor="name"
            className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
          >
            Giá sản phẩm:
          </label>
          <div className="min-w-[80%] relative">
            <input
              value={price}
              id="name"
              onChange={(vail) => setPrice(vail.target.value.trim())}
              placeholder="Nhập thể loại tại đây..."
              className={`border w-full py-3 px-5 rounded-md outline-none ${
                errPrice
                  ? "border-red-600 placeholder:text-red-600"
                  : "border-gray-300"
              }`}
              required
            />
            <small
              className={`${
                errPrice
                  ? "absolute left-0 bottom-[-20px] text-red-600"
                  : "hidden"
              }`}
            >
              {messPrice}
            </small>
          </div>
        </div>
        {/* Stocks */}
        <div className="Flex gap-5 mt-10">
          <label
            htmlFor="stock"
            className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
          >
            Số lượng sản phẩm:
          </label>
          <div className="min-w-[80%] relative">
            <input
              value={stock}
              onChange={(vail) => setStock(vail.target.value.trim())}
              id="stock"
              placeholder="Nhập thể loại tại đây..."
              className={`border w-full py-3 px-5 rounded-md outline-none ${
                errStock
                  ? "border-red-600 placeholder:text-red-600"
                  : "border-gray-300"
              }`}
              required
            />
            <small
              className={`${
                errStock
                  ? "absolute left-0 bottom-[-20px] text-red-600"
                  : "hidden"
              }`}
            >
              {messStock}
            </small>
          </div>
        </div>
        {/* Category */}
        <div className="flex items-center gap-5 mt-10">
          <label
            htmlFor="category"
            className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
          >
            Danh mục sản phẩm:
          </label>
          <div
            className={`min-w-[80%] relative border py-3 px-5 rounded-md ${
              errCategory ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between gap-5">
              <div className="w-[70%] overflow-hidden">
                <h5>{category}</h5>
              </div>
              <select
                name="category"
                onChange={(vail) => setCategory(vail.target.value.trim())}
                id="category"
                className="w-[30%] border border-gray-300 outline-none p-2 rounded-md"
              >
                <option>Chọn danh mục</option>
                {categories?.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <small
              className={`${
                errCategory
                  ? "absolute left-0 bottom-[-20px] text-red-600"
                  : "hidden"
              }`}
            >
              {messCategory}
            </small>
          </div>
        </div>
        {/* brand */}
        <div className="flex items-center gap-5 mt-10">
          <label
            htmlFor="name"
            className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
          >
            Thương hiệu sản phẩm:
          </label>
          <div className="min-w-[80%] relative border border-gray-300 py-3 px-5 rounded-md">
            <div className="flex items-center justify-between gap-5">
              <div className="w-[70%] overflow-hidden">
                <h5>{brand}</h5>
              </div>
              <select
                name="category"
                id="category"
                onChange={(vail) => setBrand(vail.target.value.trim())}
                className="w-[30%] border border-gray-300 outline-none p-2 rounded-md"
              >
                <option>Chọn Thương hiệu</option>
                {brands?.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <small
              className={`$ ? "absolute left-0 bottom-[-20px] text-red-600" : "hidden"}`}
            >
              {}
            </small>
          </div>
        </div>
        {/* images */}
        <div className="flex items-center gap-5 mt-10">
          <label
            htmlFor="name"
            className="min-w-[20%] mt-1 text-16 font-[500] text-gray-600"
          >
            Ảnh:
          </label>
          <div className="min-w-[80%] relative border border-gray-300 p-3 rounded-md">
            <div className="flex items-center justify-between gap-5 h-[50px]">
              <ul className="w-[90%] flex items-center gap-5 overflow-x-auto pb-2">
                {image?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 border border-gray-300 rounded-md p-2"
                  >
                    <img
                      src={URL.createObjectURL(item)}
                      alt=""
                      className="min-w-[40px] h-[40px]"
                    />
                    <IoClose
                      onClick={() => handleRemoveItemImage(index)}
                      size={18}
                      className="cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
              <div className="w-[40px] h-[40px] cursor-pointer">
                <label htmlFor="upload">
                  <img src={upload} alt="" className="w-full h-full" />
                </label>
                <input
                  type="file"
                  name=""
                  id="upload"
                  hidden
                  onChange={(vail) =>
                    setImage((prev) => [...prev, vail.target.files[0]])
                  }
                />
              </div>
            </div>
            <small
              className={`${
                errImage
                  ? "absolute left-0 bottom-[-20px] text-red-600"
                  : "hidden"
              }`}
            >
              {messImage}
            </small>
          </div>
        </div>
        <div>
          <button
            onClick={handlePostCreateProduct}
            className="mt-8 bg-red-600 text-16 block m-auto w-[30%] rounded-md py-3 cursor-pointer text-white font-[700] hover:opacity-80 transition-all duration-200 ease-linear"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormDataAddProduct;
