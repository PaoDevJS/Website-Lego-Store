import express from "express"
import authRouter from "./authRouter.js";

const route = express.Router()

const router = (main) => {
    authRouter(main, route)

}

export default router;
