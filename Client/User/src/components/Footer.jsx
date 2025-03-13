import footer1 from "../assets/images/footer1.png"
import footer2 from "../assets/images/footer2.png"
import footer3 from "../assets/images/footer3.png"
import footer4 from "../assets/images/footer4.png"

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
        <div className="pt-5 border-t border-gray-300">
          <p className="text-white text-center">© Bản quyền thuộc về <span className="text-[18px] uppercase">LegoWorld Store</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer