import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    totalAmount: {
        type: String,
        required: true
    },
    infoUser: {
        fullname: {type: String},
        phone: {type: String},
        address: {type: String},
    },
    products:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: String
            }
        }
    ],
    status: {
        type: String,
        enum: ["Chờ xác nhận", "Đang chuẩn bị hàng", "Đang giao hàng", "Đã hủy", "Đã giao hàng", "Đã xác nhận"],
        default: "Chờ xác nhận"
    },
    payment: {
        type: String,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    transId: { type: String },
    cartId: { type: String, required: true },
    datetime: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.model("Order", orderSchema)