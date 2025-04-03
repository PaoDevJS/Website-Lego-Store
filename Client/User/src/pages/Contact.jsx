// import GoogleMapComponent from "../components/isGoogleMapComponent";

//  react icons
import {
  FaMapMarkedAlt,
  FaHome,
  FaMoneyBill,
  FaShippingFast,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="container m-auto py-5 px-10">
      <div className="w-full bg-white rounded-md p-7">
        <h1 className="text-2xl font-[700] uppercase mb-7">
          Liên hệ với chúng tôi
        </h1>
        {/* <GoogleMapComponent /> */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6586650267714!2d105.778629979563!3d21.04633943060483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab32dd5c61bd%3A0x4bbd60dbc81cb9b7!2zMjUwIEhvw6BuZyBRdeG7kWMgVmnhu4d0LCBD4buVIE5odeG6vywgQuG6r2MgVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2sbd!4v1743098843274!5m2!1sen!2sbd"
            allowfullscreen=""
            loading="lazy"
            className="w-full h-[600px]"
          ></iframe>
        </div>
        <div className="mt-7 flex lg:flex-row flex-col gap-14">
          <div>
            <h4 className="text-[18px] font-[500] py-5 border-b border-gray-300">
              Liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc nào vui lòng liên
              hệ với chúng tôi. Chúng tôi sẵn sàng tư vấn giúp bạn 24/7. Sự hài
              lòng của bạn là thành công của chúng tôi.
            </h4>
            <ul className="flex flex-col gap-3 mt-5">
              <li className="flex items-center gap-5">
                <FaMapMarkedAlt size={20} />
                <span className="text-[16px]">
                  Số 32c - Ngõ 21 - Đường Yên Xá - Tân Triều - Thanh Trì - Hà
                  Nội
                </span>
              </li>
              <li className="flex items-center gap-5">
                <MdEmail size={20} />
                <span className="text-[16px]">logeworldstore@gamil.com</span>
              </li>
              <li className="flex items-center gap-5">
                <FaSquarePhone size={20} />
                <span className="text-[16px]"> 0981058326 – 0904568069</span>
              </li>
            </ul>
          </div>

          <div className="border border-gray-300 w-[70%] rounded-md py-4 px-7">
            <ul className="flex flex-col gap-5 pb-4 border-b border-gray-400 px-4">
              <li className="flex gap-5 items-center">
                <FaHome size={25} />
                <div>
                  <h3 className="text-[18px] font-[600]">
                    LEGOWORLD STORE Trading
                  </h3>
                  <p>Cam kết chính hãng 100%</p>
                </div>
              </li>
              <li className="flex gap-5 items-center">
                <FaMoneyBill size={25} />
                <div>
                  <h3 className="text-[18px] font-[600]">
                    LEGOWORLD STORE hoàn tiền 200%
                  </h3>
                  <p>Nếu phát hiện hàng giả</p>
                </div>
              </li>
              <li className="flex gap-5 items-center">
                <FaShippingFast size={25} />
                <div>
                  <h3 className="text-[18px] font-[600]">Giao Hàng Miễn Phí</h3>
                  <p>Miễn phí giao hàng toàn quốc</p>
                </div>
              </li>
            </ul>
            <div className="flex gap-5 items-center px-3 pt-4">
              <FaSquarePhone size={25} />
              <div>
                <h3 className="text-[18px] font-[600]">Liên Hệ</h3>
                <p>Hotline đặt hàng 0981058326 (hỗ trợ 24/7 cả T7, CN)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
