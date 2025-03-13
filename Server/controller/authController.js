import userModel from "../model/user.model.js";
import userDetailModel from "../model/user.detail.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SignUp = async (req, res) => {
    try {
        const {lastName, firstName, phone, email, password} = req.body

        if(!lastName || !firstName || !phone || !email || !password)
            return res.status(400).json({
                success: false,
                mess: "Vui lòng không để trống trường này."
            })

        // Check email
        const reEmail = /^\S+@\S+\.\S+$/
        if(!reEmail.test(email))
            return res.status(400).json({
                success: false,
                mess: "Email không hợp lệ."
            })

        const existEmail = await userModel.findOne({ email })
        if(existEmail)
            return res.status(400).json({
                success: false,
                mess: "Email này đã tồn tại"
            })

        // Check phone
        const reNumber = /^[0-9]+$/
        if(!reNumber.test(phone))
            return res.status(400).json({
                success: false,
                mess: "Số điện thoại không hợp lệ."
            })
        
        // Check password
        if(password.length < 8)
            return res.status(400).json({
                success: false,
                mess: "Độ dài mật khẩu tối thiểu 8 ký tự."
            })

        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password, salt)

        const createUserDetail = new userDetailModel({
            lastName,
            firstName,
            phone
        })

        const createUser = new userModel({
            email, 
            password: hashPassword,
            userId: createUserDetail._id
        })

        await createUserDetail.save()
        await createUser.save()

        return res.status(200).json({
            success: true,
            mess: "Đăng ký thành công!"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            mess: err.message
        })
    }
}
 
const SignIn = async (req, res) => {
    try {
        const {email, Password} = req.body

        if(!email || !Password) 
            return res.status(400).json({
                success: false,
                mess: "Vui lòng không để trống trường này."
            })
        
        // Check email
        const re = /^\S+@\S+\.\S+$/
        if(!re.test(email))
            return res.status(400).json({
                success: false,
                mess: "Email không hợp lệ."
            })

        const existUser = await userModel.findOne({ email })
        if(!existUser)
            return res.status(400).json({
                success: false,
                mess: "Email hoặc Mật khẩu không chính xác."
            })
        
        // Check password
        const comparePassword = await bcrypt.compareSync(Password, existUser.password)
        if(!comparePassword)
            return res.status(400).json({
                success: false,
               mess: "Email hoặc Mật khẩu không chính xác."
           })
        
        const { password, ...user } = existUser._doc

        const token = await jwt.sign(user, process.env.ACCESS_TOKEN_JWT)

        return res.cookie("token", token).status(200).json({
            success: true,
            mess: "Đăng nhập thành công!",
            user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            mess: err.message
        })
    }
}




export default {
    SignUp,
    SignIn
}
