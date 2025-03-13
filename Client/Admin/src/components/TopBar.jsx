
const TopBar = () => {
  return (
    <div className="fixed bg-white w-full py-4 px-10 top-0 z-40">
        <div className="flex">
          <div className="bg-gradient-to-l to-gray-400 from-red-500 rounded-md py-3 px-7 cursor-pointer">
            <h1 className="text-[20px] text-white text-center uppercase font-[700]">LegoWorld<span className="text-[14px]">Store</span> </h1>
          </div>
        </div>
    </div>
  )
}

export default TopBar