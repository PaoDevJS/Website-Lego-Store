
const CheckOutPayment = () => {
  return (
    <div className="container m-auto py-5">
        {/* TOP */}
        <div className="bg-white py-4 px-7 rounded-md">
            <div className="flex items-center">
                <h1 className="font-[900] text-red-600 text-4xl uppercase">LEGOWORLD<span className="text-lg">store</span></h1>
                <h3 className="text-xl font-[700] uppercase text-red-600">Thanh Toán</h3>
            </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-7">
            {/* left */}
            <div className="w-[50%] bg-white py-5 px-10 rounded-md">
                <div className="pb-3 border-b border-gray-300 px-2 flex items-center justify-between">
                    <h1 className="text-lg font-[600] uppercase text-gray-700">Thông tin người nhận</h1>
                    <div>
                        <button></button>
                        <button>Thêm Người dùng</button>
                    </div>
                </div>
                <div className="py-5 px-2 border-b border-gray-300">
                    <div className="flex items-center justify-between">
                        <div className="w-[45%]">
                            <h3 className="font-[500] text-[16px]">Tên người nhận</h3>
                            <p className="border border-gray-300 rounded-md mt-2 py-2 px-4">BA VI</p>
                        </div>
                        <div className="w-[45%]">
                            <h3 className="font-[500] text-[16px]">Số điện thoại</h3>
                            <p className="border border-gray-300 rounded-md mt-2 py-2 px-4">09090</p> 
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="font-[500] text-[16px] ml-3">Địa chỉ người nhận</h3>
                        <p className="border border-gray-300 rounded-md mt-2 py-2 px-4">Ha Noi City</p>
                    </div>
                </div>
                <div>
                    <button></button>
                    <div>
                        <button>Cập nhật</button>
                    </div>
                </div>
            </div>
            {/* right */}
            <div>

            </div>
        </div>
    </div>
  )
}

export default CheckOutPayment