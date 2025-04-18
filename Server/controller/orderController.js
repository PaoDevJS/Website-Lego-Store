import { isPayment } from "../service/payment.js"
import orderModel from "../model/order.model.js"


export const isOrderPayment = async (req, res) => {
    try {
        const { infoUser, amount, paymentMethod, products, cartId } = req.body
        console.log("body >> ", req.body)
        const order = await orderModel.create({
            totalAmount: amount,
            paymentMethod,
            payment: "Xử lý thanh toán",
            products,
            cartId: cartId
        })

        if( paymentMethod === "MOMO" ) {
            const result = await isPayment(res, amount, order._id, cartId)
            console.log("payURL >> ", result)
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại!" })
    }
}

export const isMoMoRefund = async (req, res) => {
    try {
        const { orderId } = req.body
    } catch (error) {
        console.log(error.message)
            return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại!" })
    }
}