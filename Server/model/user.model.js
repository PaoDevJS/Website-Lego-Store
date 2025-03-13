import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String,
        min:8,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Customer"],
        default: "Customer"
    },
    userDetailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetail"
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)