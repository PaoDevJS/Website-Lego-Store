import { Link } from "react-router-dom"
import footer from "../assets/images/footer4.png"

// react icons
import { FaShoppingCart, FaEye } from "react-icons/fa"

const Card = () => {
  return (
    <div className="w-[250px] h-[350px] rounded-md p-5 border">
      {/* image */}
        <div className="border h-[70%] w-full overflow-hidden relative group">
          <img src={footer} alt="" className="object-cover w-full h-full"/>
          <div className="absolute bottom-[-50px] bg-black rounded-md text-white px-5 py-3 group-hover:bottom-3 transition-all duration-300 ease-in-out left-[50%] translate-x-[-50%] flex items-center gap-5 ">
            <button className="cursor-pointer">
              <FaShoppingCart size={18}/>
            </button>
            <Link>
              <FaEye size={18}/>
            </Link>
          </div>
        </div>
      {/* info */}
      <div>
        <h3></h3>
        <div>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default Card