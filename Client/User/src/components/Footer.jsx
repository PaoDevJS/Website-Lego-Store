import footer1 from "../assets/images/footer1.png"
import footer2 from "../assets/images/footer2.png"
import footer3 from "../assets/images/footer3.png"
import footer4 from "../assets/images/footer4.png"
import cart from "../assets/images/cart.webp"
import { Link } from "react-router-dom"

import { FaPaperPlane } from "react-icons/fa"
const Footer = () => {
  const menuFooter = [
    { imgUrl: footer1, title: "Siêu nhiều hàng tốt"},
    { imgUrl: footer2, title: "Siêu yên tâm"},
    { imgUrl: footer3, title: "Siêu tiện lợi"},
    { imgUrl: footer4, title: "Siêu tiết kiệm"},
  ]

  return (
    <footer>
      {/*  */}
      <div className="grid grid-cols-12 gap-7 p-5 bg-white">
        {
          menuFooter.map((item, index) => {
            return (
              <div key={index} className="lg:col-span-3 col-span-6 text-center">
                  <img src={item.imgUrl} alt="" className="w-[100px] m-auto"/>
                  <p className="font-[500] mt-3">{item.title}</p>
              </div>
            )
          })
        }
      </div>

      {/*  */}
      <div className="bg-dark px-10 py-5">
        <div className="grid grid-cols-12 gap-7 pb-5">
          <div className="p-5 2xl:col-span-5 lg:col-span-7 col-span-12">
            <h1 className="text-white text-2xl uppercase font-[600]">LEGOWORLD STORE</h1>
            <h3 className="text-white mt-3">LEGOWORLD STORE đã và đang tiếp tục khẳng định vị trí của người dẫn đầu thị trường cung cấp sản phẩm mô hình lego và mô hình lego liên tục cho thị trường trong nhiều năm qua.</h3>
          </div>

          <div className="p-5 2xl:col-span-3 lg:col-span-5 col-span-12">
            <h1 className="text-white text-2xl uppercase font-[600]">Liên kết</h1>
            <ul className="text-white flex flex-col mt-3 gap-3 text-[16px] font-[600]">
              <li>
                <Link to={"/"} className="hover:text-red-600 transition-all duration-150 ease-in">Trang chủ</Link>
              </li>
              <li>
                <Link className="hover:text-red-600 transition-all duration-150 ease-in" to={"/product/list-products"}>Sản phẩm</Link>
              </li>
              <li>
                <Link className="hover:text-red-600 transition-all duration-150 ease-in" to={"/about-us"}>Giới thiệu</Link>
              </li>
              <li>
                <Link className="hover:text-red-600 transition-all duration-150 ease-in" to={"/contact"}>Liên hệ</Link>
              </li>
            </ul>
          </div>

          <div className="p-5 2xl:col-span-4 col-span-12">
            <div>
              <h1 className="text-white text-2xl uppercase font-[600]">Đăng kí nhận tin</h1>
              <div className="my-5 border-b border-gray-300 w-[70%] p-3 flex items-center gap-5">
                <input type="email" className="outline-none text-gray-300 w-full" placeholder="Nhập email của bạn"/>
                <button className="cursor-pointer">
                  <FaPaperPlane size={18} className="text-white"/>
                </button>
              </div>
              <p className="text-gray-300">Hãy nhập email của bạn vào đây để nhận tin!</p>
            </div>
            <img src={cart} alt="" className="w-[200px] object-cover mt-7"/>
          </div>
        </div>
        <div className="pt-5 border-t border-gray-300">
          <p className="text-white text-center">© Bản quyền thuộc về <span className="text-[18px] uppercase">LegoWorld Store</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer