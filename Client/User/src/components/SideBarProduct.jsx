import { useState } from "react"
// react icons
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

const SideBarProduct = () => {
    const [activeCategories, setActiveCategories] = useState(false)
    const [activeBrands, setActiveBrands] = useState(false)

  return (
    <div>
        {/* categories */}
        <div className={`w-full ${activeCategories? "max-h-[450px]" : null} p-3`}>
            <div className="border-b border-gray-300 py-2">
                <button onClick={() => setActiveCategories(!activeCategories)} className="w-full flex items-center justify-between cursor-pointer">
                    <span className="text-[16px] font-[600]">Danh mục</span>
                    {
                        activeCategories ? 
                            <FaAngleDown />
                            :
                            <FaAngleUp />
                    }
                </button>
            </div>
            <div className={`${activeCategories ? "mt-3 h-[85%] overflow-hidden block" : "hidden"}`}>
                <ul>
                    <li className="cursor-pointer">
                        <input type="checkbox" name="" id="drone" className=""/>
                        <label htmlFor="drone" className="text-[16px]">Drone</label>
                    </li>
                </ul>
            </div>
        </div>

        {/* Brands */}
        <div className={`w-full ${activeBrands? "max-h-[450px]" : null} p-3`}>
            <div className="border-b border-gray-300 py-2">
                <button onClick={() => setActiveBrands(!activeBrands)} className="w-full flex items-center justify-between cursor-pointer">
                    <span className="text-[16px] font-[600]">Thương hiệu</span>
                    {
                        activeBrands ? 
                            <FaAngleDown />
                            :
                            <FaAngleUp />
                    }
                </button>
            </div>
            <div className={`${activeBrands ? "mt-3 h-[85%] overflow-hidden block" : "hidden"}`}>
                <ul>
                    <li className="cursor-pointer">
                        <input type="checkbox" name="" id="drone" className=""/>
                        <label htmlFor="drone" className="text-[16px]">Drone</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBarProduct