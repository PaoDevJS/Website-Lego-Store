import { isGetOrderItem, isGetOrdersAll, isOrderPayment, isOrderUpdateStatus } from "../controller/orderController.js"
import { isHandleIpn } from "../service/payment.js"

export const orderRouter = (main, route) => {
    route.post("/create-order", isOrderPayment)
    route.post("/payment/momo-ipn", isHandleIpn)

    route.put("/update-status-order-item/:id", isOrderUpdateStatus)

    route.get("/get-orders-all", isGetOrdersAll)
    route.get("/get-order-item/:id", isGetOrderItem)

    return main.use("/api/order", route)
}