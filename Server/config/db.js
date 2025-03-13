import mongoose from "mongoose"

const connectionDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO}`)
        console.log("Connection to database successfully!")
    } catch (err) {
        console.log(err.message)
    }
}

export default connectionDB;