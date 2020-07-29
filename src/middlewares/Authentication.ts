import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import * as MongooseValidator from "../validators/MongooseValidator"
import UserSchema from "../models/UserModel"

interface IUserToken {
  id?: string
  iat?: number
  exp?: number
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.header("x-auth-token")
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorize: no valid token in the request. Authorization denied"
    })
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing ENV: no JWT_SECRET in the server enviroment")
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as IUserToken
    req.user = decodedToken
    console.log(decodedToken)
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: Invalid token: " + err.message,
      data: { token }
    })
  }
  if (!req.user) {
    return res.status(500).json({
      success: false,
      message: "Server Error: the server could not get a token from the request"
    })
  }
  const isValidId = MongooseValidator.validateId(req.user.id)
  if (!isValidId) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the User ID in the token passed in x-auth-token request header is not valid",
      data: { userId: req.user.id }
    })
  }
  const user = await UserSchema.findById(req.user.id)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Not Found: no User found with the passed ID in the token from the request header"
    })
  }
  next()
}
