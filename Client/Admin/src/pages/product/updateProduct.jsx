import { Link } from "react-router-dom"

// React Icons
import { TiArrowLeftThick } from "react-icons/ti";
import FormDataUpdateItemProduct from "../../hooks/formDataUpdateProduct";
const UpdateProduct = () => {
  return (
    <div className="py-5 px-10">
      <div className="bg-white w-full p-7 rounded-md">
        <div>
          <Link to={`/san-pham/danh-sach-san-pham`}>
            <button className="Flex gap-1 cursor-pointer">
              <TiArrowLeftThick size={18} />
              <span>quay lại</span>
            </button>
          </Link>
        </div>

        {/* new Add Category */}
        <FormDataUpdateItemProduct />
      </div>
    </div>
  )
}

export default UpdateProduct