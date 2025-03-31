import mongoose from "mongoose";
import { type } from "os";

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
    images: {
        type: Array,
        required: true
    },
    categories: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Product", ProductSchema)