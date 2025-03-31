import { AppContext } from "../Context/ThemeContext"
import { useContext } from "react"

// react icons
import { TiArrowLeftThick } from "react-icons/ti"

const Search = () => {
    const {search, setSearch} = useContext(AppContext)

  return (
    <div className={`lg:hidden fixed ${search? "top-0 right-0 bottom-0 w-full h-full" : "top-0 right-[-100%] w-[100%] h-full"} bg-white transition-all duration-300 ease-linear py-4 px-10`}>
        {/* Come back */}
        <button onClick={() => setSearch(false)} className="flex items-center gap-1 cursor-pointer my-5">
            <TiArrowLeftThick  />
            <span>Quay lại</span>
        </button>
        {/* form search */}
    </div>
  )
}

export default Search