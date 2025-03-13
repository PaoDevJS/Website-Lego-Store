import authController from "../controller/authController.js";

const authRouter = (main, route) => {
    route.post("/sign-up", authController.SignUp)
    route.post("/sign-in", authController.SignIn)

    main.use("/api/auth/", route)
}

export default authRouter;
