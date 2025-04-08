import bcrypt from "bcrypt"
import userModel from "../model/user.model.js";

export const isCheckPassword = async (req, res, next) => {
    try {
        const { id, password } = req.body
        
        const user = await userModel.findById(id)
        if(!user) 
            return res.status(400).json({ message: "Không tìm thấy người dùng."})

        const comparePassword = await bcrypt.compareSync(password, user.password)
        if(!comparePassword)
            return res.status(400).json({ message: "Mật khẩu không chính xác!" })

        return res.status(200).json({message: "Xác minh thông tin thành công!"})
    } catch (error) {
        return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại sau" })
    }
}

export const isSetUpPassword = async (req, res) => {
    try {
        const { id, password } = req.body

        const user = await userModel.findById(id) 
        if(!user) 
            return res.status(400).json({ message: "Không tìm thấy người dùng."})

        if(password.length < 8) 
            return res.status(400).json({message: "Độ dài mật khẩu tối thiểu 8 ký tự."})

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(password, salt)

        user.password = hashPassword

        await user.save()

        return res.status(200).json({ message: "Thay đổi mật khẩu mới thành công!" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại sau" })
    }
}
