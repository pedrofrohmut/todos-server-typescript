import jwt from "jsonwebtoken"

const getSignInToken = (userId: string): any => {
  try {
    const payload = { id: userId }
    if (!process.env.JWT_SECRET) {
      throw new Error("No JWT Secret in the server env")
    }
    const secret = process.env.JWT_SECRET
    const options = { expiresIn: 3600 }
    return jwt.sign(payload, secret, options)
  } catch (err) {
    throw new Error("Error to get a sign token from JsonWebToken")
  }
}

export default getSignInToken
