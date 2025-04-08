import { useContext } from "react"
import { AppContext } from "../Context/ThemeContext"


const IsProfile = () => {
    const { currentUser } = useContext(AppContext)

  return (
    <div className="container m-auto">
      <div className="bg-white py-5 px-10 rounded-md">
        <div className="border-b border-gray-300 pb-3">
          <h1 className="text-2xl font-[600] ">Hồ sơ của tôi</h1>
          <p className="mt-1 text-[15px] text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>

        {/* info */}
        <div className="mt-7 flex flex-col py-5 items-center gap-5">
          <div className="w-[100px] h-[100px] overflow-hidden rounded-full">
            <img src={`${currentUser.user.userDetailId.image}`} alt="" />
          </div>
          <div className="w-[50%] p-3 flex flex-col gap-5">
              <div className="flex items-center gap-7">
                <h4 className="min-w-[20%] font-[600] text-gray-500">Họ và tên:</h4>
                <p className="w-[80%] border border-gray-300 py-2 px-4 rounded-md">{currentUser.user?.firstName + " " + currentUser.user?.lastName}</p>
              </div>
              <div className="flex items-center gap-7">
                <h4 className="min-w-[20%] font-[600] text-gray-500">Email:</h4>
                <p className="w-[80%] border border-gray-300 py-2 px-4 rounded-md">{currentUser.user?.email.replace(/(.{3}).+(@.+)/, "$1***$2")}</p>
              </div>
              <div className="flex items-center gap-7">
                <h4 className="min-w-[20%] font-[600] text-gray-500">Số điện thoại:</h4>
                <p className="w-[80%] border border-gray-300 py-2 px-4 rounded-md">{currentUser.user?.userDetailId?.phone.replace(/^(.{2})(.{4})/, (_, p1) => p1 + '****')}</p>
              </div>
              <div className="flex items-center gap-7">
                <h4 className="min-w-[20%] font-[600] text-gray-500">Ngày sinh:</h4>
                <p className="w-[80%] border border-gray-300 py-2 px-4 rounded-md">{currentUser.user?.userDetailId?.birthday}</p>
              </div>
              <div className="flex items-center gap-7">
                <h4 className="min-w-[20%] font-[600] text-gray-500">Giới tính:</h4>
                <p className="w-[80%] border border-gray-300 py-2 px-4 rounded-md">{currentUser.user?.userDetailId?.sex}</p>
              </div>
          </div>
          <div>
            <button className="py-3 px-7 rounded-md bg-red-600 cursor-pointer text-[16px] font-[600] text-white outline-none">Thay đổi thông tin</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IsProfile