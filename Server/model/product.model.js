import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    brands: {
        type: String,
        required: true
    },
    images: [],
    categories: [],
    status: {
        type: String,
        default: "Hiện",
        enum: ["Ẩn", "Hiện"]
    }
}, { timestamps: true })

export default mongoose.model("Product", ProductSchema)