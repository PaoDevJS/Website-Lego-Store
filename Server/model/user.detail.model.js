import mongoose from "mongoose"

const userDetailSchema = new mongoose.Schema({
    phone: {
        type: String,
        max:10
    },
    image: {
        type: String,
        default: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
    },
    birthday: {
        type: String
    },
    sex: {
        type: String,
        enum: ["Nam", "Nữ", "Khác"]
    },
}, {
    timestamps: true
})

export default mongoose.model("UserDetail", userDetailSchema)