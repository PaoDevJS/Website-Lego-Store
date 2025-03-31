import userModel from "../model/user.model.js";
import userDetailModel from "../model/user.detail.model.js";
import bcrypt from "bcrypt";
import signToken from "../middleware/signToken.js";
import sendMail from "../service/sendMail.js";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import isSendMail from "../service/sendMail.js";

// đăng ký , đăng nhập người dùng
const SignUpByAccountUser = async (req, res) => {
  try {
    const { lastName, firstName, phone, email, password } = req.body;

    if (!lastName || !firstName || !phone || !email || !password)
      return res.status(400).json("Vui lòng điển đẩy đủ thông tin.");

    // Check email
    const reEmail = /^\S+@\S+\.\S+$/;
    if (!reEmail.test(email))
      return res.status(400).json("Email không hợp lệ.");

    const existEmail = await userModel.findOne({ email });
    if (existEmail) return res.status(400).json("Email này đã tồn tại");
    // Check phone
    const reNumber = /^[0-9]+$/;
    if (!reNumber.test(phone))
      return res.status(400).json("Số điện thoại không hợp lệ.");
    // Check password
    if (password.length < 8)
      return res.status(400).json("Độ dài mật khẩu tối thiểu 8 ký tự.");
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const createUserDetail = new userDetailModel({
      phone,
    });
    const createUser = new userModel({
      lastName,
      firstName,
      email,
      password: hashPassword,
      userDetailId: createUserDetail._id,
    });

    await createUserDetail.save();
    await createUser.save();

    const gmail = createUser.email;
    const subject = `LEGOWORLD STORE - Chào Mừng Bạn! Đăng Ký Thành Công 🎉`;
    const html = `
        <p>
            Xin chào ${createUser.firstName + createUser.lastName},

            Chúc mừng! Bạn đã đăng ký thành công tài khoản tại CHỐT STORE.

            Thông tin tài khoản:

            Tên đăng nhập: ${createUser.firstName + " " + createUser.lastName}
            Ngày đăng ký: ${Date.now()}
            Hãy đăng nhập và khám phá ngay: <a href="http://localhost:5173/customer/account/login">Tại đây</a>

            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua hahuybinh2305@gamil.com hoặc 0969028560.

            Cảm ơn bạn đã tin tưởng và sử dụng sản phẩm tại LEGOWORLD STORE!

            Trân trọng,
        </p>
    `;

    await sendMail({ gmail, subject, html });

    return res.status(200).json("Đăng ký tài khoản thành công!");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const SignInByAccountUser = async (req, res) => {
  try {
    const { email, Password } = req.body;

    if (!email || !Password)
      return res.status(400).json("Vui lòng không để trống trường này.");
    // Check email
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return res.status(400).json("Email không hợp lệ.");
    const existUser = await userModel
      .findOne({ email })
      .populate("userDetailId");
    if (!existUser)
      return res.status(400).json("Email hoặc Mật khẩu không chính xác.");

    // Check password
    const comparePassword = await bcrypt.compareSync(
      Password,
      existUser.password
    );
    if (!comparePassword)
      return res.status(400).json("Email hoặc Mật khẩu không chính xác.");

    const { password, ...user } = existUser._doc;

    const token = await jwt.sign(
      { id: existUser._id },
      process.env.ACCESS_TOKEN_JWT,
      { expiresIn: "7d" }
    );

    return res.cookie("token", token, { httpOnly: true }).status(200).json({
      mess: "Đăng nhập tài khoản thành công!",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// đăng ký , đăng nhập Admin
const SignUpByAccountAdmin = async (req, res) => {
  try {
    const { lastName, firstName, email, password } = req.body;

    // kiểm tra rỗng
    if (!lastName || !firstName || !email || !password)
      return res.status(400).json("Vui lòng không để trống trường này.");

    // kiểm tra email
    const reEmail = /^\S+@\S+\.\S+$/;
    if (!reEmail.test(email))
      return res.status(400).json("Email không hợp lệ.");

    const existEmail = await userModel.findOne({ email });
    if (existEmail) return res.status(400).json("Email đã tồn tại.");

    // kiểm tra password
    if (password.length < 8)
      return res.status(400).json("Độ dài mật khẩu tối thiểu 8 ký tự.");

    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role: "Admin",
    }).save();

    return res.status(200).json("Đăng ký thành công!");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const SignInByAccountAdmin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    // kiểm tra rỗng của email và mật khẩu
    if (!Email || !Password)
      return res.status(400).json("Vui lòng điền đầy thủ thông tin.");
    const accountAdmin = await userModel.findOne({ email: Email });
    // kiểm tra email
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(Email)) return res.status(400).json("Email không hợp lệ.");
    if (!accountAdmin)
      return res.status(400).json("Email hoặc Mật khẩu không chính xác.");
    // kiểm tra mật khẩu
    const comparePassword = await bcrypt.compare(
      Password,
      accountAdmin.password
    );
    if (!comparePassword)
      return res.status(400).json("Email hoặc Mật khẩu không chính xác.");
    // kiểm tra quyền
    if (accountAdmin.role !== "Admin")
      return res.status(400).json("Vui lòng đăng nhập bằng tài khoản admin.");

    const { password, ...admin } = accountAdmin._doc;
    const token = await signToken(admin);

    return res.cookie("token", token).status(200).json({
      message: "Đăng nhập tài khoản thành công!",
      user: admin,
      token,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// đăng xuất
const SignOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json("Đăng xuất tài khoản thành công!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// lấy tất cả danh sách tài khoản
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) return res.status(404).json("Không tìm thấy người dùng nào");

    return res.status(200).json({ users: JSON.stringify(URLSearchParams) });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// lấy tài khoản người dùng
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json("Không tìm thấy người");

    return res.status(200).json({ user: JSON.stringify(user) });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// cập nhật thông tin người dùng
const updateInfoUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json("Không tìm thấy người");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// lấy mật khẩu
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // kiểm tra email rỗng
    if (!email) return res.status(404).json("Vui lòng nhập thông tin email.");
    // Kiểm tra email tồn tại hay không
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json("Vui lòng nhập thông tin email.");

    // sendMail(email);
    // Tạo mã opt
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    // info send user
    const subject = `Mã Xác Thực OTP Của Bạn`;
    const html = `
            <p>
              Xin chào ${user.firstName + user.lastName}, <br>
            
              Bạn vừa yêu cầu mã xác thực (OTP) để đăng nhập hoặc xác minh tài khoản tại LEGOWORLD STORE. <br>
    
              🔐 Mã OTP của bạn: ${OTP} <br>
    
              ⚠ Lưu ý: <br>
    
              Mã này có hiệu lực trong 3 phút. <br>
              Không chia sẻ mã này với bất kỳ ai, kể cả nhân viên CHỐT STORE. <br>
              Nếu bạn không yêu cầu mã này, hãy bỏ qua email này hoặc liên hệ với chúng tôi ngay. <br>
              📞 Hỗ trợ: hahuybinh2305@gmail.com | 0969028560 <br>
    
              Cảm ơn bạn đã sử dụng sản phẩm tại LEGOWORLD STORE! 🚀 <br>
    
              Trân trọng.
            </p>
        `;

    // gửi mã OTP cho người dùng
    const gmail = user.email;
    isSendMail({ gmail, subject, html });

    // tạo thời gian sử dụng mã otp
    const tokenTimeOtp = await jwt.sign(
      { id: user._id, otp: OTP },
      process.env.ACCESS_TOKEN_JWT,
      { expiresIn: "3m" }
    );

    // lưu mã otp
    user.otp = OTP;
    await user.save();

    return res
      .cookie("tokenTimeOtp", tokenTimeOtp, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({
        message: "OTP đã được gửi!",
        tokenTimeOtp,
      });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const interOTP = async (req, res) => {
  try {
    const { OTP } = req.body;

    // Kiểm tra rỗng OTP
    if (!OTP) return res.status(400).json("Vui lòng nhập mã OTP.");

    if (req.user.otp !== OTP)
      return res.status(400).json("Mã OTP không chính xác, vui lòng nhập lại.");

    return res.status(200).json("Xác thực mã OTP thành công.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const restPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    // kiểm tra rỗng
    if (!newPassword)
      return res.status(400).json("vui lòng không để trống thông tin.");

    if (newPassword.length < 8)
      return res.status(400).json("Độ dài mật khẩu tối thiếu 8 ký tự.");

    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("Không tìm thấy tài khoản!");

    const salt = await bcrypt.genSaltSync(10)
    const password = await bcrypt.hashSync(newPassword, salt)
    user.password = password;
    await user.save();

    return res.status(200).json("Mật khẩu đã được đặt lại thành công!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default {
  SignUpByAccountUser,
  SignInByAccountUser,
  SignInByAccountAdmin,
  SignUpByAccountAdmin,
  getAllUsers,
  getUserById,
  forgetPassword,
  SignOut,
  interOTP,
  restPassword,
};
