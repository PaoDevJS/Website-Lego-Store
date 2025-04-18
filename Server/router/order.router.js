import { isOrderPayment } from "../controller/orderController.js"
import { isHandleIpn } from "../service/payment.js"

export const orderRouter = (main, route) => {
    route.post("/create-order", isOrderPayment)
    route.post("/payment/momo-ipn", isHandleIpn)

    return main.use("/api/order", route)
}