import { isCheckPassword, isSetUpPassword } from "../controller/userController.js"

export const userRouter = (main, route) => {
    route.post("/check-password", isCheckPassword)
    route.post("/set-up-password", isSetUpPassword)

    main.use("/api/user", route)
}