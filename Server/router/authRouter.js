import authController from "../controller/authController.js";
import { verifyTokenAdmin, verifyToken, verifyTimeOtp } from "../middleware/verifyToken.js";

const authRouter = (main, route) => {
    // user
    route.post("/user/sign-up", authController.SignUpByAccountUser)
    route.post("/user/sign-in", authController.SignInByAccountUser)
    // admin
    route.post("/admin/sign-in", authController.SignInByAccountAdmin)
    route.post("/admin/sign-up", authController.SignUpByAccountAdmin)
    route.get("/admin/get-all-users", verifyTokenAdmin, authController.getAllUsers)
    route.get("/get-user/:id", verifyToken, authController.getAllUsers)

    route.post("/sign-out", authController.SignOut)

    // forget password & rest password
    route.post("/forget-password", authController.forgetPassword)
    route.post("/inter-password", verifyTimeOtp, authController.interOTP)
    route.post("/rest-password", authController.restPassword)

    main.use("/api/auth", route)
}

export default authRouter;
