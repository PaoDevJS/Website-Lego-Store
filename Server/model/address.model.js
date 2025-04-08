import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    addresses: [
        {
            username: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model("Address", AddressSchema)