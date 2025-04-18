import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    // infoUser: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Address",
    //     required: true
    // },
    totalAmount: {
        type: String,
        required: true
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    status: {
        type: String,
        enum: ["Chờ xử lý", "Đang chỉ bị hàng", "Đang giao hàng", "Đã giao"],
        default: "Chờ xử lý"
    },
    payment: {
        type: String,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    transId: { type: String },
    cartId: { type: String, required: true }
}, {
    timestamps: true
})

export default mongoose.model("Order", orderSchema)