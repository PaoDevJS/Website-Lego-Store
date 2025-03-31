import jwt, { decode } from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(" ")[1]
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_JWT);
    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const verifyTokenAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        //  Kiểm tra xem token có tồn tại không
        if(!token)
            return res.status(403).josn("Token không tồn tại. Vui lòng cung cấp token.")
        // giải mã token
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_JWT);
        req.user = decoded.data;
        
        // Kiểm tra quyền admin
        if (req.user.role !== "admin") {
            return res.status(403).json("Bạn không có quyền truy cập.");
        }
        req.user = decoded.data;
        next();
      } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const verifyTimeOtp = async (req, res, next) => {
  try {
    const tokenTimeOtp = req.header('Authorization').split(" ")[1]
    const decoded = await jwt.verify(tokenTimeOtp, process.env.ACCESS_TOKEN_JWT)
    req.user = decoded
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(404).json("Mã OTP đã hết hạn!")
  }
}