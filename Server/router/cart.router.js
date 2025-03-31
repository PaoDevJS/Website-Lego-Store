import { isCreateCart, isDeleteItemProductInTheCart, isGetCartAll } from "../controller/cartController.js"
import { verifyToken } from "../middleware/verifyToken.js"

export const cartRouter = (main, route) => {
    route.post("/create-cart", isCreateCart)
    route.get("/get-carts-all", verifyToken, isGetCartAll)
    route.post("/delete-item-cart/:id", isDeleteItemProductInTheCart)

    main.use("/api/cart", route)
}
