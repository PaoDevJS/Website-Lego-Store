import jwt from "jsonwebtoken"

const signToken = (data) => {
    const token = jwt.sign({data}, process.env.ACCESS_TOKEN_JWT)
    return token
}

export default signToken