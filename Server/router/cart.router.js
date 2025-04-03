import { isCreateCart, isDeleteItemProductInTheCart, isGetCartAll, isGetItemProductInCart, isUpdateItemProduct } from "../controller/cartController.js"
import { verifyToken } from "../middleware/verifyToken.js"

export const cartRouter = (main, route) => {
    route.post("/create-cart", isCreateCart)
    route.get("/get-carts-all", verifyToken, isGetCartAll)
    route.get("/get-item-cart/:id", verifyToken, isGetItemProductInCart)
    route.post("/delete-item-cart/:id", isDeleteItemProductInTheCart)
    route.post("/update-item-cart/:id", isUpdateItemProduct)

    main.use("/api/cart", route)
}
