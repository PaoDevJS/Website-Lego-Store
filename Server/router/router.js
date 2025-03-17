import express from "express"
import authRouter from "./authRouter.js";
import CategoryRouter from "./categpry.router.js";
import brandRouter from "./brandRouter.js";
import productRouter from "./product.router.js";

const route = express.Router()

const router = (main) => {
    authRouter(main, route)
    CategoryRouter(main, route)
    brandRouter(main, route)
    productRouter(main, route)
}

export default router;
