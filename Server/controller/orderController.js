import { isPayment } from "../service/payment.js"
import orderModel from "../model/order.model.js"


export const isOrderPayment = async (req, res) => {
    try {
        const { infoUser, totalAmount, products, cartId, userId, datetime } = req.body
        if(!infoUser.fullname || !infoUser.phone || !infoUser.address)
            return res.status(400).json({ message: "Vui lòng nhập đầy thủ thông tin người nhận!"})
        const order = await orderModel.create({
            totalAmount,
            paymentMethod: "MOMO",
            payment: "Xử lý thanh toán",
            products,
            cartId: cartId,
            user_id: userId,
            datetime,
            infoUser: {
                fullname: infoUser.fullname,
                phone: infoUser.phone,
                address: infoUser.address,
            }
        })

        const result = await isPayment(res, totalAmount, order._id, cartId)
        console.log("payURL >> ", result)

        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại!" })
    }
}

export const isOrderUpdateStatus = async (req, res) => {
    try {
        const id = req.params.id
        const { status } = req.body
        console.log(status)

        const order = await orderModel.findById(id) 
        if(!order) 
            return res
                .status(404)
                .json({ message: "Không tìm thấy đơn hàng!" })

        order.status = status || order.status
        await order.save()
        
        return res
            .status(200)
            .json({ message: "Cập nhật trạng thái đơn hàng thành công!" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại!" })
    }
}

export const isGetOrdersAll = async (req, res) => {
    try {
        const order = await orderModel.find({}).populate("products.product user_id")

        if(!order || order.length === 0)
            return res
                .status(400)
                .json({ message: "Không có đơn hàng nào!" })

        return res  
            .status(200)
            .json(order)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại!" })
    }
}

export const isGetOrderItem = async (req, res) => {
    try {
        const id = req.params.id
        const order = await orderModel.findById(id).populate("products.product user_id")

        if(!order) 
            return res
                .status(404)
                .json({ message: "Không tìm thấy đơn hàng!" })

        return res  
            .status(200)
            .json(order)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại!" })
    }
} 